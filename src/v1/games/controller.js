const gameServices = require('./service');
const multer = require('multer');
const config = require('../../config/index');
const multerS3 = require('multer-s3');
const { S3Client, paginateListObjectsV2 } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
    forcePathStyle: false, // Configures to use subdomain/virtual calling format.
    endpoint: "https://sgp1.digitaloceanspaces.com",
    region: "sgp1",
    credentials: {
        accessKeyId: 'DO00JH8GAEMF94ZKTTWM',
        secretAccessKey: 'ZVW8XXfuyMsldau2olroF/zJ7padKgQTRkF2oL6FlIs'
    },
    sslEnabled: true,

});
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'cdn.softkingdoms',
        acl: 'public-read',
        key: function (request, file, cb) {
            console.log(file);
            cb(null, `${Date.now().toString()}-${file.originalname}`);
        }
    })
}).array('upload', 10);

exports.upload = async (req, res, next) => {
    let image_upload = await upload(req, res, function (error) {
        if (error) {
            console.log(error);
            // return res.status(400).json({message: error.message});
            const error = new Error(error.message);
            error.statusCode = 400
            throw error;
        }
        res.status(200).json({
            message: 'File uploaded successfully',
            url: req.files[0].location
        });
    });
    return image_upload
}

//create web_setting img_url and type
exports.createGamesImgUrl = async(req, res, next) => {
    try {
        upload(req, res,async function(error) {
            if (error) {
                //throw error;
                console.log(error);
                // return res.status(400).json({message: error.message});
                const error = new Error(error.message);
                error.statusCode = 400
                throw error;
    
            }
            let data = req.body;
            let admin = req.admin;
            let img_url = req.files[0].location;
            //create game_type on service
            const createGamesImgUrl = await gameServices.createGamesImgUrl(data,admin,img_url);
            res.status(201).json({
                message: 'success',
                status: true,
                data: createGamesImgUrl
            })
        });
      
        
    }
    catch (error) {
        next(error);
     }
}

// exports.gameMatrix = async (req, res, next) => {
//     try {
//         const member_token = req.member;
//         console.log(member_token);
//         const result = await gameServices.gameMatrix(req.body);
//         res.status(200).json(
//             result,
//         );
//     } catch (error) {
//         next(error);
//     }
// }

//get game_list
exports.getGameList = async (req, res, next) => {
    try {
        const result = await gameServices.getGameList(req.body);
        res.status(200).json(
            result,
        );
    } catch (error) {
        next(error);
    }
}
