module.exports = (sequelize, DataTypes) => {
  const transactions = sequelize.define("transactions", {
    uuid: DataTypes.STRING(255),
    prefix: DataTypes.STRING(255),
    username: DataTypes.STRING(255),
    game_name: DataTypes.STRING(255),
    bet_detail: DataTypes.STRING(255),
    bet_amount: DataTypes.DECIMAL(10, 2),
    bet_type: DataTypes.ENUM('normal', 'jackpot', 'bonus', 'free_spin', 'demo'),
    bet_status: DataTypes.ENUM('SUCCESS', 'CANCEL', 'PENDING'),
    bet_amount_before: DataTypes.DECIMAL(10, 2),
    bet_amount_after: DataTypes.DECIMAL(10, 2),
    bet_result: DataTypes.STRING(255),
    bet_currency: DataTypes.STRING(255),
    create_at: DataTypes.DATE,
    update_at: DataTypes.DATE,
  },
    {
      tableName: "transactions",
      timestamps: false,
    },

  );

  transactions.associate = (models) => {
    // associations can be defined here
  };



  return transactions;

};