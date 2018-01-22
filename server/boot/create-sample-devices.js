//Add sample devices to the database
/* module.exports = function(app) {
  app.dataSources.mongodb.automigrate("device", function(err) {
    if (err) throw err;
    app.models.device.create([{
      deviceId: "zigbee01100110101110101",
      friendlyName: "Hello"
    }, {
      deviceId: "zigbee02200220202220202",
      friendlyName: "World"
    }, {
      deviceId: "zigbee0330003303330303",
      friendlyName: "Sup"
    }], function(err, devices) {
      if (err) throw err;
      console.log("Models created: \n", devices);
    });
  });
}; */
