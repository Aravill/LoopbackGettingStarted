'use strict';
const xbee = require("../lib/xbee.js");

module.exports = function(Device) {
  //Custom remote methods
  Device.status = function(cb) {
    let currentDate = new Date();
    console.log("Current date is:", currentDate);
    let response = "Current date is:" + currentDate;
    cb(false, response);
  };

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

  Device.startDiscovery = function(timeout, cb) {
    xbee.startDiscovery(timeout).then(function(discoveredDevices) {
      let response = {
        message: `Discovered devices`,
        success: true,
        devices: discoveredDevices
      };
      cb(null, response)
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

  Device.remoteMethod("status", {
    http: {
      path: "/status",
      verb: "get"
    },
    returns: {
      arg: "status",
      type: "string"
    }
  });
};