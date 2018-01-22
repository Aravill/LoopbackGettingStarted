'use strict';

module.exports = function(Device) {
  //Custom remote method
  Device.status = function(cb) {
    let currentDate = new Date();
    console.log("Current date is:", currentDate);
    let response = "Current date is:" + currentDate;
    cb(null, response);
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
  });
};