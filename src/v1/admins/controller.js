const adminServices = require('./service');

//register with jwt token
exports.register = async (req, res, next) => {
    try {

        const result = await adminServices.register(req.body);
        res.status(200).json(
            result,
        );

    } catch (error) {
        next(error);
    }
}

//get admin list
exports.getAdminList = async (req, res, next) => {
    try {

        const result = await adminServices.getAdminList(req.body);
        res.status(200).json(
            result,
        );

    } catch (error) {
        next(error);
    }
}

//edit admin by uuid
exports.editAdmin = async (req, res, next) => {
    try {

        const result = await adminServices.editAdmin(req.body);
        res.status(200).json(
            result,
        );

    } catch (error) {
        next(error);
    }
}


//change status admin by uuid
exports.changeStatus = async (req, res, next) => {
    try {

        const result = await adminServices.changeStatus(req.body);
        res.status(200).json(
            result,
        );

    } catch (error) {
        next(error);
    }
}
