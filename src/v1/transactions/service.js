const { token } = require('morgan');
const model = require('../../models/index');
const { v4: uuidv4 } = require('uuid');
const { default: axios } = require('axios');


exports.updateCredit = async (data) => {
    const betAmount = data.betAmount;
    const token = data.token;
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
    

    console.log(profile);
    const sentProfile = {
        username: profile.data.username,  
        credit: data.credit,
    }


    const updateCredit = await axios.post('https://bo-api.angpaos.cloud/external/updateCredit', sentProfile);
    console.log(updateCredit);
    return sentProfile;
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
}

exports.gamelist = async (data) => {

}
exports.newGame = async (data) => {
    
}
    