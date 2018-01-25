const form = document.querySelector("form");
form.addEventListener("submit", submitForm);

function submitForm(e) {
  let device = {
    devId: document.querySelector("#devId").value,
    fName: document.querySelector("#fName").value
  };
  makeRequest(device).then(function(response) {
    console.log("Response received", response);
    window.alert("Success! Device added.");
  }).catch(function(err) {
    console.error('Error! \n', err);
    window.alert("Error!", err);
  });
  document.querySelector("#devId").value = "";
  document.querySelector("#fName").value = "";
}

function makeRequest(device) {
  return new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    let http = `http://localhost:3000/api/devices/adddevice?devId=${device.devId}&fName=${device.fName}`
    console.log(http);
    request.open('GET', http, true);
    request.onload = () => {
      resolve(request.response);
    };
    request.onerror = () => {
      reject(request.response);
    }
    request.send(``);
  });
};