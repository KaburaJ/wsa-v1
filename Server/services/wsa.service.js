const { Sequelize } = require("sequelize");
const db = require("../config/db.js");
const bcrypt = require("bcrypt");
const op = Sequelize.Op;
const operatorsAliases = {
    $eq: op.eq,
    $or: op.or,
};



const getAllUserDetails = async (userId) => {
  try {
    // Fetch user details
    const user = await db.User.findByPk(userId, {
      include: [
        { model: db.Device }, // Include devices associated with the user
        { model: db.ConnectedDeviceSodiumHypochlorite }, // Include sodium hypochlorite metrics
        { model: db.ConnectedDeviceHCL }, // Include HCL metrics
        { model: db.UserDeviceSchedule }, // Include user device schedules
        { model: db.wifiDetails } // Include WIFI details
      ]
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    throw new Error('Failed to get user details: ' + error.message);
  }
};


const loginUser = async ({ UserEmail, UserPassword }) => {
  try {
    const user = await db.User.findOne({
      where: {
        [op.or]: [
          { Email1: UserEmail },
          { Email2: UserEmail },
          { Email3: UserEmail },
          { Email4: UserEmail }
        ],
      }
    });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(UserPassword, user.AccountPassword);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    return user;
  } catch (error) {
    throw new Error("Failed to login user: " + error.message);
  }
};



const createUser = async ({
  AccountName,
  AccountPassword,
  CustomerName,
  Phone1,
  Phone2,
  Email1,
  Email2,
  Email3,
  Email4,
  Notes,
}) => {
  try {
    const newUser = await db.User.create({
      AccountName,
      AccountPassword,
      CustomerName,
      Phone1,
      Phone2,
      Email1,
      Email2,
      Email3,
      Email4,
      Notes,
    });
    return newUser;
  } catch (error) {
    throw new Error("Error occurred while creating user: " + error.message);
  }
};

const createSodiumHypochloriteValues = async ({
  AccountName,
  SodiumHypochloriteActualValue,
  // SodiumHypochloriteTargetValue,
  SodiumHypochloriteLitres,
  SodiumHypochloriteCycles,
  SodiumHypochloriteStatusData,
  SodiumHypochlorite_DIS_L,
  SodiumHypochlorite_DPD_mL,
  SoftwareVersion
}) => {
  try {
    const newEntry = await db.ConnectedDeviceSodiumHypochlorite.create({
      AccountName,
      SodiumHypochloriteActualValue,
      // SodiumHypochloriteTargetValue,
      SodiumHypochloriteLitres,
      SodiumHypochloriteCycles,
      SodiumHypochloriteStatusData,
      SodiumHypochlorite_DIS_L,
      SodiumHypochlorite_DPD_mL,
      SoftwareVersion
    });
    return newEntry;
  } catch (error) {
    throw new Error(
      "Error occurred while creating sodium hypochlorite entry: " +
        error.message
    );
  }
};

const createHCLValues = async ({
  AccountName,
  HCLActualValue,
  // HCLTargetValue,
  HCLLitres,
  HCLCycles,
  HCLStatusData,
  HCL_PH_L,
  HCL_PH_mL,
  SoftwareVersion
}) => {
  try {
    const newEntry = await db.ConnectedDeviceHCL.create({
      AccountName,
      HCLActualValue,
      // HCLTargetValue,
      HCLLitres,
      HCLCycles,
      HCLStatusData,
      HCL_PH_L,
      HCL_PH_mL,
      SoftwareVersion
    });
    return newEntry;
  } catch (error) {
    throw new Error(
      "Error occurred while creating sodium hypochlorite entry: " +
        error.message
    );
  }
};

const createDevice = async({  
  deviceName,
  Notes
}) => {
    try {
      const device = await db.Device.create({
        deviceName,
        Notes
      })
      return device;
    } catch (error) {
      throw new Error(
        "Error occurred while creating new device entry: " +
          error.message
      );
    }

}

const createWifiDetails = async ({
  connectedDeviceId,
  SSID,
  KEY
}) => {
  try {
    const newWifiEntry = await db.wifiDetails.create({
      connectedDeviceId,
      SSID,
      KEY
    });
    return newWifiEntry;
  } catch (error) {
    throw new Error("Error occurred while creating WIFI details: " + error.message);
  }
};

const updateSodiumHypochloriteTargetValue = async ({
  AccountName,
  SodiumHypochloriteTargetValue,
}) => {
  try {
    const { ConnectedDeviceSodiumHypochlorite } = db;
    const [updatedRows] = await ConnectedDeviceSodiumHypochlorite.update(
      { SodiumHypochloriteTargetValue },
      { where: { AccountName } }
    );
    return updatedRows;
  } catch (error) {
    throw new Error("Failed to update sodium hypochlorite target value: " + error.message);
  }
};

const updateHCLTargetValue = async ({
  AccountName,
  HCLTargetValue,
}) => {
  try {
    const { ConnectedDeviceHCL } = db;
    const [updatedRows] = await ConnectedDeviceHCL.update(
      { HCLTargetValue },
      { where: { AccountName } }
    );
    return updatedRows;
  } catch (error) {
    throw new Error("Failed to update HCL target value: " + error.message);
  }
};

const getUsers = async () => {
  try {
    const { User } = db;
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw new Error("Failed to fetch users: " + error.message);
  }
};

const getDevices = async () => {
  try {
    const { Device } = db;
    const devices = await Device.findAll();
    return devices;
  } catch (error) {
    throw new Error("Failed to fetch devices: " + error.message);
  }
};

const getUsersCount = async () => {
  try {
    const { User } = db;
    const count = await User.count();
    return count;
  } catch (error) {
    throw new Error("Failed to fetch users count: " + error.message);
  }
};

const getDevicesCount = async () => {
  try {
    const { Device } = db;
    const count = await Device.count();
    return count;
  } catch (error) {
    throw new Error("Failed to fetch devices count: " + error.message);
  }
};


const getUserDetailsByAccountName = async (accountName) => {
  try {
    const { User } = db;
    const user = await User.findOne({
      where: { AccountName: accountName }
    });
    return user;
  } catch (error) {
    throw new Error("Failed to fetch user details: " + error.message);
  }
};

const getSodiumHypochloriteValue = async (accountName) => {
  try {
    const { ConnectedDeviceSodiumHypochlorite } = db;
    const sodiumHypochloriteValue = await ConnectedDeviceSodiumHypochlorite.findOne({
      where: { AccountName: accountName }
    });
    return sodiumHypochloriteValue;
  } catch (error) {
    throw new Error(
      "Error occurred while getting sodium hypochlorite value for specified device: " +
        error.message
    );
  }
};

const getHCLValue = async (accountName) => {
  try {
    const { ConnectedDeviceHCL } = db;
    const HCLValue = await ConnectedDeviceHCL.findOne({
      where: { AccountName: accountName }
    });
    return HCLValue;
  } catch (error) {
    throw new Error(
      "Error occurred while getting HCL value: " +
        error.message
    );
  }
};

const UserDeviceScheduler = async ({userId, AccountName, wakeTime, sleepTime}) => {
  try {
    const schedule = await db.UserDeviceSchedule.create({userId, AccountName, wakeTime, sleepTime});
    return schedule;
  } catch (error) {
    throw new Error(
      "Error occurred while setting the device schedule: " +
        error.message
    );
  }
};

const deleteUser = async (accountId) => {
  try {
    const { User } = db;
    await User.destroy({
      where: { Id: accountId }
    });
  } catch (error) {
    throw new Error("Failed to delete user: " + error.message);
  }
};

module.exports = {
  loginUser,
  createUser,
  getUsers,
  createSodiumHypochloriteValues,
  createHCLValues,
  getSodiumHypochloriteValue, 
  getHCLValue,
  getUserDetailsByAccountName,
  createWifiDetails,
  UserDeviceScheduler,
  deleteUser,
  createDevice,
  getDevices,
  getUsersCount,
  getDevicesCount,
  updateHCLTargetValue,
  updateSodiumHypochloriteTargetValue,
  getAllUserDetails
};
