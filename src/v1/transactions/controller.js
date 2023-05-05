const transactionService = require('./service');

exports.updateCredit = async (req, res, next) => {
    try {
        const member_token = req.member;
        console.log(member_token);
        const result = await transactionService.updateCredit(req.body);
        res.status(200).json(
            result,
        );
    } catch (error) {
        next(error);
    }
}

exports.createTransaction = async (req, res, next) => {
    try {
        const result = await transactionService.createTransaction(req.body);
        res.status(200).json(
            result,
        );
    } catch (error) {
        next(error);
    }
}
