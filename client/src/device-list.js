var list = document.querySelector("#deviceList");
const form = document.querySelector("#deviceForm");
document.onload = refreshList();

function deleteDevices() {
  let devices = [];
  //Select all checked devices
  let checkboxes = document.getElementsByClassName("device-checkbox");
  for (let i = 0; checkboxes[i]; i++) {
    if (checkboxes[i].checked) {
      //Assemble array from selected devices
      devices.push(checkboxes[i].id);
    }
  }
  console.log("Selected devices: ", devices);
  //Pass array to remote deletion method
  httpDeleteDevices(devices).then(function(response) {
    console.log(response);
    //Refresh list
    refreshList()
  });
}

function refreshList() {
  httpGetDevices().then(function(response) {
    list.innerHTML = " ";
    //  console.log(response);
    let devices = JSON.parse(response);
    for (let device of devices) {
      let item = document.createElement("tr");

      let td = document.createElement("td");
      let content = document.createTextNode(device.deviceId);

      td.appendChild(content);
      item.appendChild(td);

      td = document.createElement("td");
      content = document.createTextNode(device.friendlyName);
      td.appendChild(content);
      item.appendChild(td);

      td = document.createElement("td");
      content = document.createTextNode(device.id);
      td.appendChild(content);
      item.appendChild(td);

      td = document.createElement("td");
      let div = document.createElement("div");
      div.setAttribute("class", "custom-control custom-checkbox");

      content = document.createElement("input");
      content.setAttribute("type", "checkbox");
      content.setAttribute("class", "custom-control-input device-checkbox");
      //content.setAttribute("checked", " ");
      content.setAttribute("id", device.id);
      div.appendChild(content);
      content = document.createElement("label");
      content.setAttribute("class", "custom-control-label");
      content.setAttribute("for", device.id);
      div.appendChild(content);

      td.appendChild(div);
      item.appendChild(td);

      list.appendChild(item);
    };
  });
}

function httpGetDevices() {
  return new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    let http = `http://localhost:3000/api/devices`
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

function httpDeleteDevices(devices) {
  return new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    let http = `http://localhost:3000/api/devices/deleteDevices`
    console.log(http);
    request.open('DELETE', http, true);
    request.onload = () => {
      resolve(request.response);
    };
    request.onerror = () => {
      reject(request.response);
    }
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    console.log("Deleted devices: ", devices);
    request.send(JSON.stringify({
      "devices": devices
    }));
  });

}