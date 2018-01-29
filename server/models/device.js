'use strict';
const xbee = require("../lib/xbee.js");

module.exports = function(Device) {
  //Custom remote methods
  /*   Device.status = function(cb) {
      let currentDate = new Date();
      console.log("Current date is:", currentDate);
      let response = "Current date is:" + currentDate;
      cb(false, response);
    };

    Device.remoteMethod("status", {
      http: {
        path: "/status",
        verb: "get"
      },
      returns: {
        arg: "status",
        type: "string"
      }
    }); */

  Device.addDevice = function(devId, fName, cb) {
    var newDevice = {
      deviceId: devId,
      friendlyName: fName
    };
    Device.create(newDevice, function(err) {
      let response = {
        message: `New Device {deviceId: ${newDevice.deviceId}, friendlyName: ${newDevice.friendlyName}} Added`,
        success: true
      };
      console.log(newDevice);
      cb(false, response);
    });
  }

  Device.remoteMethod("addDevice", {
    http: {
      path: "/adddevice",
      verb: "get"
    },
    accepts: [{
      arg: 'devId',
      type: 'string',
      http: {
        source: 'query'
      }
    }, {
      arg: 'fName',
      type: 'string',
      http: {
        source: 'query'
      }
    }],
    returns: {
      arg: "response",
      type: "object"
    }
  });

  Device.startDiscovery = function(timeout, cb) {
    xbee.startDiscovery(timeout).then(function(discoveredDevices) {
      let response = {
        message: `Discovered devices`,
        success: true,
        devices: discoveredDevices
      };
      cb(null, response)
    }).catch(function(error) {
      console.log(error);
    });
  }

  Device.remoteMethod("startDiscovery", {
    http: {
      path: "/startdiscovery",
      verb: "post"
    },
    accepts: [{
      arg: "timeout",
      type: "number",
      http: {
        source: "query"
      }
    }],
    returns: {
      arg: "response",
      type: "object"
    }
  });

  Device.deleteDevices = function(body, cb) {
    let devices = body.devices;
    for (let i = 0; i < devices.length; i++) {
      console.log(devices[i]);
      Device.destroyById(devices[i], function(err) {
        if (!err) {
          console.log(`>> Deleted device: `, devices[i]);
          response.devices.push(devices[i]);
        } else {
          console.log(err);
          response.message = err;
        }
      });
    }
    let response = {
      message: "Devices deleted successfully",
      success: true,
      devices: devices
    };
    cb(false, response);
  }

  Device.remoteMethod("deleteDevices", {
    http: {
      path: "/deleteDevices",
      verb: "delete"
    },
    accepts: {
      arg: "devices",
      type: "object",
      http: {
        source: "body"
      }
    },
    returns: {
      arg: "response",
      type: "object"
    }
  });

}