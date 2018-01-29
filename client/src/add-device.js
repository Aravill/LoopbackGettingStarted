const form = document.querySelector("form");
form.addEventListener("submit", submitForm);

function submitForm(e) {
  //Create device object from user given values
  let device = {
    devId: document.querySelector("#devId").value,
    fName: document.querySelector("#fName").value
  };
  //Make HTTP request
  makeRequest(device).then(function(response) {
    //Log upon resolving
    console.log("Response received", response);
    window.alert("Success! Device added.");
  })
  /* .catch(function(err) {
    console.error('Error! \n', err);
    window.alert("Error!", err);
  }); */
  //Clear the text fields
  document.querySelector("#devId").value = "";
  document.querySelector("#fName").value = "";
}

function makeRequest(device) {
  //Create new promise on returns
  return new Promise(function(resolve, reject) {
    //Create a request object
    let request = new XMLHttpRequest();
    //Request address
    let http = `http://localhost:3000/api/devices/addDevice?devId=${device.devId}&fName=${device.fName}`
    //Open HTTP connection
    request.open('POST', http, true);
    //Define what happens upon receiving data
    request.onload = () => {
      //Resolve promise and return the response
      resolve(request.response);
    };
    //Define what happens upon error
    request.onerror = () => {
      //Reject promise and return the response
      reject(request.response);
    }
    //Send HTTP request
    request.send(' ');
  });
};