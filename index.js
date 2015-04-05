var ss = require("sdk/simple-storage");
ss.storage.textColour = ss.storage.textColour || "black";

var colours = ["black", "white", "red", "blue", "green", "yellow"];

var { ActionButton } = require("sdk/ui/button/action");

var button2 = ActionButton({
    id: "my-button",
    label: "my button",
    icon: "data:image/png;base64,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",
    onClick: function(state) {
      var currentIndex = colours.indexOf(ss.storage.textColour);
      var newIndex = (currentIndex + 1) % colours.length;
      ss.storage.textColour = colours[newIndex];
      update();
    }
  });

var pageWorkers = require("sdk/page-worker");

var pageWorker = pageWorkers.Page({
  contentURL: "./canvas.html",
  contentScriptFile: "./content-script.js",
  contentScriptWhen: "ready"
});

pageWorker.port.on("image", function(message) {
  button2.icon = message;
});

var { setTimeout } = require("sdk/timers");

function update(){
  var date = new Date();
  button2.label = date.toString();
  var message = {
    "hours": date.getHours(), 
    "minutes": date.getMinutes(),
    "textColour" : ss.storage.textColour
  };
  pageWorker.port.emit("get-image", message);
  setTimeout(update, (60-date.getSeconds())*1000);
}

update();