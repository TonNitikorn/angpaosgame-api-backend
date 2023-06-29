const authServices = require('./service');
// login with jwt token 
exports.login = async (req, res, next) => {
    try {

        const result = await authServices.login(req.body);
        res.status(200).json(
            result,
        );

    } catch (error) {
        next(error);
    }
}
exports.loginGame = async (req, res, next) => {
    try {

        const result = await authServices.loginGame(req.body);
        res.status(200).json(
            result,
        );

    } catch (error) {
        // if(error.status_code === 500){
        //     console.log('sdfdsfsdfsdfdsf');
        // }
        next(error);
    }
}


exports.loginGame3x3 = async (req, res, next) => {
    try {

        const result = await authServices.loginGame3x3(req.query);
        res.status(200).json(
            result,
        );

    } catch (error) {
        // if(error.status_code === 500){
        //     console.log('sdfdsfsdfsdfdsf');
        // }
        next(error);
    }
}
