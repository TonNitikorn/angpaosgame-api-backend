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

exports.getGame = async (data) => {

    const whereData = {
        game_name: data.game_name,
        
    }

    const game = await model.games.findAll({
        where: {
            game_name: data.game_name,
        }
    });

    if (!game) {
        const error = new Error("ไม่พบข้อมูล");
        error.statusCode = 401
        throw error;
    }

    const sum_amount_bet = await model.transactions.sum('bet_amount', { where: whereData, })

    const sumResult = await model.transactions.sum('bet_result', { where: whereData })

    const count_game = await model.transactions.findAll({ 
        where: whereData 
    })


    const count = count_game.length
    const sumAmountGame = Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', }).format(sum_amount_bet)
    const sumResultGame = Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', }).format(sumResult)
    const sum = Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', }).format(sum_amount_bet - sumResult)
    
    const dataSum = {
        game,
        sumAmountGame,
        sumResultGame,
        count,
        sum
    }

    return dataSum
}


exports.getGameChart = async (data) => {

    const gameChart = await model.transactions.findAll({
        where: {
            // username: data.username,
            game_name: data.game_name,
            bet_status: {
                [model.Sequelize.Op.in]: ['SUCCESS']
            },
            update_at: {
                [model.Sequelize.Op.gte]: data.start_date,
                [model.Sequelize.Op.lte]: data.end_date
            }
        },
        attributes: { exclude: ['id'] },
    })

    const chart_game = [];
    for (let i = 1; i <= 24; i++) {
        let count = 0;
        let total = 0;
        for (let j = 0; j < gameChart.length; j++) {
            if (gameChart[j].update_at.getHours() == i) {
                total += parseFloat(gameChart[j].bet_amount),
                    count++
            }
        }

        chart_game.push({
            hour: i - 1 + ':00' + '-' + i + ':00',
            game_count: count,
            game_total: parseFloat(total)
        })

    }
    return chart_game
}




