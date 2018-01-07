var timeoutID;

function delayedAlert() {
  timeoutID = setTimeout(slowAlert, 2000);
  setInterval(console.log("wangdejun"), 100);
}

function slowAlert() {
  alert('That was really slow!!!');
}

function clearAlert() {
    clearTimeout(timeoutID);
}