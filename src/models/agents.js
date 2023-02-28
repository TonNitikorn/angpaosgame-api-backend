module.exports = (sequelize, DataTypes) => {
    const agents = sequelize.define("agents", {
      uuid: DataTypes.STRING(255),
      prefix: DataTypes.STRING(255),
      secret_key: DataTypes.STRING(255),
      ip: DataTypes.STRING(255),
      status: DataTypes.ENUM('ACTIVE','INACTIVE'),
      currency: DataTypes.DECIMAL(10, 2),
      create_at: DataTypes.DATE,
      update_at: DataTypes.DATE,
    },
      {
        tableName: "agents",
        timestamps: false,
      },
  
    );
  
    agents.associate = (models) => {
      // associations can be defined here
    };
  
  
  
    return agents;
  
  };