const membermanageService = require('./service');

exports.getMemberTransaction = async (req, res, next) => {
    try {
        const result = await membermanageService.getTransaction(req.body);
        res.status(200).json(
            result,
        );

    } catch (error) {
        next(error);
    }
}
