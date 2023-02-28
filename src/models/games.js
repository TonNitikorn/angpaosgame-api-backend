module.exports = (sequelize, DataTypes) => {
    const games = sequelize.define("games", {
      uuid: DataTypes.STRING(255),
      game_name: DataTypes.STRING(255),
      game_img: DataTypes.STRING(255),
      game_status: DataTypes.ENUM('ACTIVE','INACTIVE'),
      game_type: DataTypes.DECIMAL(10, 2),
      create_at: DataTypes.DATE,
      update_at: DataTypes.DATE,
    },
      {
        tableName: "games",
        timestamps: false,
      },
  
    );
  
    games.associate = (models) => {
      // associations can be defined here
    };
  
  
  
    return games;
  
  };