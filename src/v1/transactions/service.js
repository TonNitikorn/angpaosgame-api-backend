const { token } = require('morgan');
const model = require('../../models/index');
const { v4: uuidv4 } = require('uuid');
const { default: axios } = require('axios');


exports.updateCredit = async (data, token) => {
    const betAmount = data.betAmount;
    const getprofile = {
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
    }
    const profile = await axios.get('https://member-api.angpaos.cloud/user/profile', { headers: getprofile.headers });
    if (profile.data.credit < parseFloat(betAmount)) {
        const message = {
            message: "credit ไม่เพียงพอ",
        }

        return message;
    }

    const sentProfile = {
        username: profile.data.username,
        credit: data.creditAfter,
    }
    console.log(profile);

    const game_transactions = await model.game_transactions.create({
        uuid: uuidv4(),
        prefix: profile.data.prefix,
        username: profile.data.username,
        game_name: data.game_name,
        winSymbols: data.winSymbols ,
        betAmount: data.betAmount,
        creditBefore: data.creditBefore,
        creditAfter: data.creditAfter,
        autoSpin: data.autoSpin,
        fastSpin: data.fastSpin,
        freeSpinAdd: data.freeSpinAdd,
        freeSpinLeft: data.freeSpinLeft,
        multiWin: data.multiWin,
        payLine: data.payLine,
        payTable: data.payTable,
        spacialSpin: data.spacialSpin,
        win: data.win,
        winTotal: data.winTotal,
        symbolsStore: data.symbolsStore, 
        bet_type: 'normal',
        bet_status: 'SUCCESS',
        bet_currency: 'baht',
        create_at: new Date,
        update_at: new Date,
    },);

    await axios.post('https://bo-api.angpaos.cloud/external/updateCredit', sentProfile);

    return game_transactions;
}


exports.createTransaction = async (data) => {
    await model.transactions.create({
        uuid: uuidv4(),
        prefix: data.prefix,
        username: data.username,
        game_name: 'Data 2 Dog game 2023',
        bet_detail: '',
        bet_amount: data.betAmount,
        bet_type: 'normal',
        bet_status: 'SUCCESS',
        bet_amount_before: data.credit,
        bet_amount_after: "",
        bet_result: data.totalWin,
        bet_currency: 'baht',
        create_at: new Date,
        update_at: new Date,
    },);

    return "create transaction success";
}
