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
