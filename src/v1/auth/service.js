const model = require('../../models/index');
const config = require('../../config/index');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const axios = require('axios');
const transaction = require('../../models/transaction');
const { or } = require('sequelize');



// loginOTP

    exports.login = async (data) => {
        //check username and password is null
        if (!data.username || !data.password || !data.prefix) {
            const error = new Error("ข้อมูลไม่ถูกต้อง");
            error.statusCode = 401
            throw error;
        }

        const admin = await model.admins.findOne({
            where: {
                username: data.username
            }
        });

        if (!admin) {
            const error = new Error("Username หรือ Password ไม่ถูกต้อง");
            error.statusCode = 401
            throw error;
        }

        // check password by bcryptjs
        const isMatch = await bcrypt.compare(data.password, admin.password);
        if (!isMatch) {
            const error = new Error("รหัสผ่านไม่ถูกต้อง");
            error.statusCode = 401
            throw error;
        }

        // await model.log_actions.create({
        //     uuid: uuidv4(),
        //     admins_uuid: admin.uuid,
        //     actions: 'login',
        //     description: data,
        //     create_at: new Date(),
        // });

        const token = jwt.sign({ uuid: admin.uuid, }, config.JWT_KEY, { expiresIn: config.JWT_EXP });
        // const expiresin = jwt.decode(token).exp;

        return {
            access_token: token,
            token_type: "Bearer"
        }
    };

exports.loginGame = async (data) => {
    console.log(data);
    let jwtkey = 'eyJhbGciOiJIUzI1NiJ9.eyJJc3N1ZXIiOiJza19hZG1pbiIsIlVzZXJuYW1lIjoic29mdGtpbmdkb20ifQ.7uHUzTIGGhetySt1C6RHXd_bqZorOk1kw8CxfaluzjY'
    //verify the token
    // const token = req.headers.authorization.split(' ')[1];
    const  token = data.token;
    const decoded = jwt.verify(token, jwtkey);

    const profile = await axios.get('https://member-api.angpaos.cloud/user/profile',{headers : {Authorization: `Bearer ${token}`}});
    data = {
        message:" successful",
        userUUID: decoded.uuid,
        credit: profile.data.credit,
        username: profile.data.username,
    }    
     const game_transactions = await model.game_transactions.findAll({

        where: {
            username: profile.data.username,
        },
        order: [
            ['create_at', 'DESC'],
        ]
    });
   

if(game_transactions.length == 0){
   
    return {data};
}

    const game_symbols = JSON.parse(game_transactions[0].dataValues.symbolsStore);

    return {data ,game_symbols , game_transactions};
}


exports.loginGame3x3 = async (data) => {
    let jwtkey = 'eyJhbGciOiJIUzI1NiJ9.eyJJc3N1ZXIiOiJza19hZG1pbiIsIlVzZXJuYW1lIjoic29mdGtpbmdkb20ifQ.7uHUzTIGGhetySt1C6RHXd_bqZorOk1kw8CxfaluzjY'
    //verify the token
    // const token = req.headers.authorization.split(' ')[1];
    const  token = data.token;
    const decoded = jwt.verify(token, jwtkey);

    const profile = await axios.get('https://member-api.angpaos.cloud/user/profile',{headers : {Authorization: `Bearer ${token}`}});
    data = {
        message:" successful",
        userUUID: decoded.uuid,
        credit: profile.data.credit,
        username: profile.data.username,
    }    
     const game_transactions = await model.game_transactions.findAll({

        where: {
            username: profile.data.username,
        },
        order: [
            ['create_at', 'DESC'],
        ]
    });
    console.log(game_transactions);
    return {data , game_transactions};
}


