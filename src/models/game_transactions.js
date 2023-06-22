module.exports = (sequelize, DataTypes) => {
    const game_transactions = sequelize.define("game_transactions", {
        uuid: DataTypes.STRING(255),
        prefix: DataTypes.STRING(255),
        username: DataTypes.STRING(255),
        game_name: DataTypes.STRING(255),
        winSymbols: DataTypes.STRING(255),
        betAmount: DataTypes.DECIMAL(10, 2),
        creditBefore:DataTypes.DECIMAL(10, 2),
        creditAfter: DataTypes.DECIMAL(10, 2),
        autoSpin: DataTypes.STRING(255),
        fastSpin: DataTypes.STRING(255),
        freeSpinAdd: DataTypes.STRING(255),
        freeSpinLeft: DataTypes.STRING(255),
        multiWin: DataTypes.STRING(255),
        payLine: DataTypes.STRING(255),
        payTable: DataTypes.STRING(255),
        spacialSpin: DataTypes.STRING(255),
        win: DataTypes.STRING(255),
        winTotal: DataTypes.STRING(255),
        symbolsStore:DataTypes.STRING(255),
        bet_type: DataTypes.ENUM('normal', 'jackpot', 'bonus', 'free_spin', 'demo'),
        bet_status: DataTypes.ENUM('SUCCESS', 'CANCEL', 'PENDING'),
        bet_currency: DataTypes.STRING(255),
        create_at: DataTypes.DATE,
        update_at: DataTypes.DATE,
    },
        {
            tableName: "game_transactions",
            timestamps: false,
        },

    );

    game_transactions.associate = (models) => {
        // associations can be defined here
    };



    return game_transactions;

};