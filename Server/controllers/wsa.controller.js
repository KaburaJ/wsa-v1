const express = require("express");
const router = express.Router();
const wsaService = require("../services/wsa.service");
const bcrypt = require("bcrypt")

router.post("/user/login", async(req, res) => {
  try {
    console.log("login body", req.body);
    const loginDetails = await wsaService.loginUser(req.body)
    console.log("login details", loginDetails);
    res.status(201).json(loginDetails)

  } catch (error) {
    console.error(error)
    res.status(500).json({error: "Failed to login user"})
  }
})

router.post("/user/register", async (req, res) => {
  try {

    console.log(req.body);
    const hashedPassword = await bcrypt.hash(req.body.AccountPassword, 10)

    req.body.AccountPassword = hashedPassword;
    const newUser = await wsaService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

router.post("/sodium-hypochlorite", async (req, res) => {
  try {
    const newEntry = await wsaService.createSodiumHypochloriteValues(req.body);
    res.status(201).json(newEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Failed post sodium hypochlorite value"})
  }
})

router.post("/hcl", async (req, res) => {
  try {
    const newEntry = await wsaService.createHCLValues(req.body);
    res.status(201).json(newEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Failed post HCL value"})
  }
})

router.post("/device", async(req, res) => {
  try {
    const newDevice = await wsaService.createDevice(req.body);
    res.status(201).json(newDevice)
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Failed to create new device"})
  }
})

router.post("/hcl-target", async(req, res) => {
  try {
    const newTarget = await wsaService.updateHCLTargetValue(req.body);
    res.status(201).json(newTarget)
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Failed to update HCL target value"})
  }
})

router.post("/sodium-target", async(req, res) => {
  try {
    const newTarget = await wsaService.updateSodiumHypochloriteTargetValue(req.body);
    res.status(201).json(newTarget)
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Failed to update Sodium Hypochlorite value"})
  }
})

router.get("/sodium-hypochlorite/:name", async (req, res) => {
  try {
    const sodiumHypochloriteName = req.params.name;
    const sodiumHypochloriteValue = await wsaService.getSodiumHypochloriteValue(sodiumHypochloriteName);
    
    if (!sodiumHypochloriteValue) {
      return res.status(404).json({ error: "Sodium hypochlorite value not found" });
    }
    
    res.status(200).json(sodiumHypochloriteValue);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get sodium hypochlorite value" });
  }
});

router.get("/hcl/:name", async (req, res) => {
  try {
    const HCL_name = req.params.name;
    const HCLValue = await wsaService.getHCLValue(HCL_name);
    
    if (!HCLValue) {
      return res.status(404).json({ error: "HCL value not found" });
    }
    
    res.status(200).json(HCLValue);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get HCL value" });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await wsaService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get users" });
  }
});

router.get("/all-users", async (req, res) => {
  try {
    const users = await wsaService.getAllUserDetails();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get all details of users" });
  }
});

router.get("/devices", async (req, res) => {
  try {
    const devices = await wsaService.getDevices();
    res.status(200).json(devices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get devices" });
  }
});

router.get("/devices-count", async(req, res)=> {
  try {
    const devices_count = await wsaService.getDevicesCount();
    res.status(200).json(devices_count);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get devices count" });
  }
})

router.get("/user-count", async(req, res)=> {
  try {
    const user_count = await wsaService.getUsersCount();
    res.status(200).json(user_count);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get devices count" });
  }
})

router.get("/user/:accountName", async (req, res) => {
  try {
    const name = req.params.accountName;
    const user = await wsaService.getUserDetailsByAccountName(name);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get user details by account name" });
  }
});

router.post("/wifi-details", async (req, res) => {
  try {
    const details = req.body;
    const wifiDetails = await wsaService.createWifiDetails(details);
    res.status(200).json(wifiDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to POST WIFI details" });
  }
});

// create a new device schedule
router.post('/users/:userId/schedule', async (req, res) => {
  try {
    const { userId } = req.params;
    const { AccountName, wakeTime, sleepTime } = req.body;

    const schedule = await wsaService.UserDeviceScheduler({
      userId,
      AccountName,
      wakeTime,
      sleepTime,
    });

    res.status(201).json(schedule);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// update an existing device schedule
router.put('/users/:userId/schedule/:scheduleId', async (req, res) => {
  try {
    const { userId, scheduleId } = req.params;
    const { wakeTime, sleepTime } = req.body;

    // Find the schedule record
    const schedule = await wsaService.UserDeviceScheduler.findOne({
      where: { userId, id: scheduleId },
    });

    // Update the schedule record
    schedule.wakeTime = wakeTime;
    schedule.sleepTime = sleepTime;
    await schedule.save();

    res.json(schedule);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/user/:accountId", async (req, res) => {
  try {
    const accountId = req.params.accountId;
    await wsaService.deleteUser(accountId);
    res.sendStatus(204); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});




module.exports = router;
