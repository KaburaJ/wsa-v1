const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  const User = sequelize.define("User", {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    AccountName: { type: DataTypes.STRING(255), allowNull: false },
    AccountPassword: { type: DataTypes.STRING(255), allowNull: false },
    CustomerName: { type: DataTypes.STRING(255), allowNull: false },
    Phone1: { type: DataTypes.STRING(20), allowNull: false },
    Phone2: { type: DataTypes.STRING(20), allowNull: true },
    Email1: { type: DataTypes.STRING(255), allowNull: false },
    Email2: { type: DataTypes.STRING(255), allowNull: true },
    Email3: { type: DataTypes.STRING(255), allowNull: true },
    Email4: { type: DataTypes.STRING(255), allowNull: true },
    Notes: { type: DataTypes.TEXT, allowNull: true },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
  });

  

  const wifiDetails = sequelize.define("wifiDetails", {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    connectedDeviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
    SSID: { type: DataTypes.STRING(100), allowNull: false },
    KEY: { type: DataTypes.STRING(100), allowNull: false },
  });

  const Device = sequelize.define("Devices", {
    deviceUUID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    deviceName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CustomerName: {
      type: DataTypes.STRING(255), 
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
    Notes: { type: DataTypes.TEXT, allowNull: true },
  });

  const ConnectedDeviceSodiumHypochlorite = sequelize.define(
    "ConnectedDeviceSodiumHypochlorite",
    {
      Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      AccountName: { type: DataTypes.STRING(255), allowNull: false },
      deviceId: { type: DataTypes.INTEGER, allowNull: false },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "created_at",
      },
      SodiumHypochloriteActualValue: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      SodiumHypochloriteTargetValue: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      SodiumHypochloriteLitres: { type: DataTypes.FLOAT, allowNull: false },
      SodiumHypochloriteCycles: { type: DataTypes.INTEGER, allowNull: false },
      SodiumHypochloriteStatusData: { type: DataTypes.FLOAT, allowNull: false },
      SodiumHypochlorite_DIS_L: { type: DataTypes.FLOAT, allowNull: false },
      SodiumHypochlorite_DPD_mL: { type: DataTypes.FLOAT, allowNull: false },
      SoftwareVersion: { type: DataTypes.STRING(20), allowNull: false },
    }
  );

  const ConnectedDeviceHCL = sequelize.define("ConnectedDeviceHCL", {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    AccountName: { type: DataTypes.STRING(255), allowNull: false },
    deviceId: { type: DataTypes.INTEGER, allowNull: false },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
    HCLActualValue: { type: DataTypes.FLOAT, allowNull: false },
    HCLTargetValue: { type: DataTypes.FLOAT, allowNull: true },
    HCLLitres: { type: DataTypes.FLOAT, allowNull: false },
    HCLCycles: { type: DataTypes.INTEGER, allowNull: false },
    HCLStatusData: { type: DataTypes.FLOAT, allowNull: false },
    HCL_PH_L: { type: DataTypes.FLOAT, allowNull: false },
    HCL_PH_mL: { type: DataTypes.FLOAT, allowNull: false },
    SoftwareVersion: { type: DataTypes.STRING(20), allowNull: false },
  });

  const UserDeviceSchedule = sequelize.define("UserDeviceSchedule", {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    AccountName: { type: DataTypes.STRING(255), allowNull: false },
    deviceId: { type: DataTypes.INTEGER, allowNull: false }, 
    wakeTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    sleepTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  });

  User.hasMany(Device);
  Device.belongsTo(User);

  Device.hasMany(ConnectedDeviceSodiumHypochlorite);
  ConnectedDeviceSodiumHypochlorite.belongsTo(Device);

  Device.hasMany(ConnectedDeviceHCL);
  ConnectedDeviceHCL.belongsTo(Device);

  ConnectedDeviceSodiumHypochlorite.hasOne(wifiDetails);
  wifiDetails.belongsTo(ConnectedDeviceSodiumHypochlorite);

  User.hasMany(UserDeviceSchedule);
  UserDeviceSchedule.belongsTo(User);

  // Define foreign key constraints
  sequelize.models.ConnectedDeviceSodiumHypochlorite.belongsTo(Device, {
    foreignKey: {
      name: 'deviceId',
      allowNull: false,
      onDelete: 'NO ACTION', 
      onUpdate: 'CASCADE',
    }
  });

  sequelize.models.ConnectedDeviceHCL.belongsTo(Device, {
    foreignKey: {
      name: 'deviceId',
      allowNull: false,
      onDelete: 'NO ACTION', 
      onUpdate: 'CASCADE',
    }
  });

  return {
    User,
    Device,
    ConnectedDeviceSodiumHypochlorite,
    ConnectedDeviceHCL,
    wifiDetails,
    UserDeviceSchedule
  };
};