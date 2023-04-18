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
exports.getGame = async (req, res, next) => {
    try {
        const result = await membermanageService.getGame(req.body);
        res.status(200).json(
            result,
        );
    } catch (error) {
        next(error)
    }
}

exports.getGameChart = async (req, res, next) => {
    try {
        const result = await membermanageService.getGameChart(req.body);
        res.status(200).json(
            result,
        );
    } catch (error) {
        next(error)
    }
}
