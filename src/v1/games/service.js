const { token } = require('morgan');
const model = require('../../models/index');
const { v4: uuidv4 } = require('uuid');
const { default: axios } = require('axios');


// exports.membercredit = async (req, res, next) => {
//     const token = data.token;
//    await axios.get('https://member-api.angpaos.cloud//user/profile' ,{headers:token});
       

// }


exports.gameMatrix = async (data) => {


    // const currentUrl = window.location.href;
    // const params = new URLSearchParams(currentUrl.search);
    // const sub = params.get("token");

    // const token = sub;
    
    const betAmount = data.betAmount; 
    const token = data.token;


    const getprofile = {
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
    }
    const profile = await axios.get('https://member-api.angpaos.cloud/user/profile', { headers: getprofile.headers });
    console.log(profile.data.credit);
    console.log(parseFloat(betAmount));
    if(profile.data.credit < parseFloat(betAmount)){
        const message = {
            message: "credit ไม่เพียงพอ",
        }
    
        return message;
    }
    const t0 = performance.now();
    // genarate a 3*5 matrix with random symbols 
    var matrix = [];
    for (var i = 0; i < 3; i++) {
        matrix[i] = [];
        for (var j = 0; j < 5; j++) {
            matrix[i][j] = Math.floor(Math.random() * 2);
        }
    }
    
    // set up 20 payline for 3*5 matrix (the winning combinations) as arrays of indices 5x3 matrix
    var paylines = [
        [0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1],
        [2, 2, 2, 2, 2],
        [0, 1, 2, 1, 0],
        [2, 1, 0, 1, 2],
        [0, 0, 1, 2, 2],
        [2, 2, 1, 0, 0],
        [1, 0, 0, 0, 1],
        [1, 2, 2, 2, 1],
        [1, 0, 1, 2, 1],
        [0, 1, 0, 1, 0],
        [2, 1, 2, 1, 2],
        [0, 1, 1, 1, 0],
        [2, 1, 1, 1, 2],
        [1, 0, 1, 0, 1],
        [1, 2, 1, 2, 1],
        [0, 0, 0, 1, 2],
        [2, 2, 2, 1, 0],
        [0, 1, 2, 2, 2],
        [2, 1, 0, 0, 0],
        [1, 1, 1],
    ];
    // find the paylines that match
    var paylineMatches = [];
    for (var i = 0; i < paylines.length; i++) {
        var payline = paylines[i];
        var match = true;
        for (var j = 0; j < payline.length - 1; j++) {
            if (matrix[payline[j]][j] != matrix[payline[j + 1]][j + 1]) {
                match = false;
                break;
            }
        }
        if (match) {
            paylineMatches.push(payline);
        }
    }
    // paytable 5 matching symbols and 3 matching symbols and 2 matching symbols in matrix 
    var paytable = [
        [100, 50, 20], // symbol 0
        [50, 20, 10], // symbol 1
        [20, 10, 5], // symbol 2
        [10, 5, 2], // symbol 3
        [5, 2, 0.5], // symbol 4
        [2, 1, 0.2], // symbol 5
        [1, 0.5, 0.1], // symbol 6
        [0.5, 0.2, 0.05], // symbol 7
        [0.2, 0.1, 0.02], // symbol 8
        [0.1, 0.05, 0.01], // symbol 9
        [0.05, 0.02, 0.005], // symbol 10
        [0.02, 0.01, 0.002], // symbol 11
        [0.01, 0.005, 0.001], // symbol 12
        [0.005, 0.002, 0.0005], // symbol 13
        [0.002, 0.001, 0.0002], // symbol 14
        [2000, 1000, 500], // symbol 15
    ];



    //total win and payline win 
    var totalWin = 0;
    var paylineWin = 0;
    var paylineWinArray = [];
    for (var i = 0; i < paylineMatches.length; i++) {
        var payline = paylineMatches[i];
        var match = true;
        for (var j = 0; j < payline.length - 1; j++) {
            if (matrix[payline[j]][j] != matrix[payline[j + 1]][j + 1]) {
                match = false;
                break;
            }
        }
        if (match) {

            if (payline.length == 5) {
                paylineWin = paytable[matrix[payline[0]][0]][0] * betAmount;
            } else if (payline.length == 3) {
                paylineWin = paytable[matrix[payline[0]][0]][1] * betAmount;
            } else if (payline.length == 2) {
                paylineWin = paytable[matrix[payline[0]][0]][2] * betAmount;
            }

            console.log(paylineWin);
            console.log(payline.length);

            totalWin += paylineWin;
            paylineWinArray.push(paylineWin);
            console.log(paylineWinArray);
            console.log(matrix);
            console.log(paylineMatches);
        }
    }


    const t1 = performance.now();
    console.log(`Time it takes to run the function: ${t1 - t0} ms`)


    const gamedata = {
        betAmount: betAmount,
        data: matrix,
        paylineLength: paylines.length,
        paylineMatches: paylineMatches,
        paylineMatchesLength: paylineMatches.length,
        totalWin: parseFloat(totalWin).toFixed(2),
        paylineWinArray: paylineWinArray,
        token: 'test bearer token'
    }



    const updateprofile = {
        uuid: uuidv4(),
        prefix: profile.data.prefix,
        username: profile.data.username,
        game_name: data.game_name,
        bet_detail: '',
        bet_amount: gamedata.betAmount,
        bet_type: 'nomal',
        bet_status: 'SUCCESS',
        bet_amount_before: profile.data.credit,
        bet_amount_after: (parseFloat(profile.data.credit) - parseFloat(gamedata.betAmount)) + parseFloat(gamedata.totalWin),
        bet_result: gamedata.totalWin,
        bet_currency: 'baht',
        create_at: new Date,
        update_at: new Date,
    };

    const sentProfile = {
        username: profile.data.username,
        credit: updateprofile.bet_amount_after,
    }
    // // transaction
    await model.transactions.create({
        uuid: uuidv4(),
        prefix: profile.data.prefix,
        username: profile.data.username,
        game_name: 'Data 2 Dog game 2023',
        bet_detail: '',
        bet_amount: gamedata.betAmount,
        bet_type: 'normal',
        bet_status: 'SUCCESS',
        bet_amount_before: profile.data.credit,
        bet_amount_after: (parseFloat(profile.data.credit) - parseFloat(gamedata.betAmount)) + parseFloat(gamedata.totalWin),
        bet_result: gamedata.totalWin,
        bet_currency: 'baht',
        create_at: new Date,
        update_at: new Date,
    },);
    const updateCredit = await axios.post('https://bo-api.angpaos.cloud/external/updateCredit', sentProfile, { headers: getprofile.headers });
    console.log(updateCredit);
    return { updateprofile , paylineWinArray };
}



