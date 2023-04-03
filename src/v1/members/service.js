const model = require('../../models/index');
const config = require('../../config/index');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');


//get transaction
exports.getTransaction = async (data) => {
    const transaction = await model.transactions.findAll({
        where: {
            username: data.username,
            create_at: {
                [model.Sequelize.Op.gte]: data.start_date,
                [model.Sequelize.Op.lte]: data.end_date
            },
        }
    });

    if (!transaction) {
        const error = new Error("ไม่พบข้อมูล");
        error.statusCode = 401
        throw error;
    }

    return transaction;
}





