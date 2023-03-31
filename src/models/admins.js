module.exports = (sequelize, DataTypes) => {
    const admins = sequelize.define("admins", {
        uuid: DataTypes.STRING(255),
        prefix: DataTypes.STRING(255),
        username: DataTypes.STRING(255),
        password: DataTypes.STRING(255),
        update_at: DataTypes.DATE,
        create_at: DataTypes.DATE,
      },
      {
        tableName: "admins",
        timestamps: false,
      },
  
    );
  
    admins.associate = (models) => {
      // associations can be defined here
    };
  

    
    return admins;
  
  };


  //create transactiongame in model transactiongame
