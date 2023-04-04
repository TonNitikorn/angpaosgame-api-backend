const gameServices = require('./service');
//register with jwt token


exports.gameMatrix = async (req, res, next) => {
    try {
        const member_token = req.member;
        console.log(member_token);
        const result = await gameServices.gameMatrix(req.body);
        res.status(200).json(
            result,
        );


    } catch (error) {
        next(error);
    }
}
