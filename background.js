var colours = ["black", "white", "red", "blue", "green", "yellow"];
var colour = "black";
var format24 = true;

browser.storage.sync.get('colour').then((res) => {
  colour = res.colour || 'black';
  update();
});

browser.storage.sync.get('format24').then((res) => {
  var stringFormat = res.format24 || "twentyfour";
  format24 = (stringFormat == "twentyfour");
  update();
});

function update() {
  var date = new Date();
  var hours = date.getHours();

  if(format24 != true) {
    hours = hours % 12
    if(hours == 0){
      hours = 12;
    }
  }

  var minutes=  date.getMinutes();

  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  context.fillStyle = colour;
  context.font = "80px sans-serif";
  context.fillText(hours, 1, 58);
  context.font = "62px sans-serif";
  context.fillText((minutes<10? "0": "") + minutes, 60, 110);

  var imageData = context.getImageData(0, 0, 128, 128);

  browser.browserAction.setIcon({imageData: imageData});
  browser.browserAction.setTitle({title: date.toString()});

  setTimeout(update, (60-date.getSeconds())*1000);
}

browser.browserAction.onClicked.addListener(() => {
  var currentIndex = colours.indexOf(colour);
  var newIndex = (currentIndex + 1) % colours.length;
  if(newIndex == 0) {
    format24 = !format24;
  }
  browser.storage.sync.set({
    colour: colours[newIndex],
    format24: (format24 ? "twentyfour" : "twelve")
  });
});

function logStorageChange(changes, area) {
  if(changes['colour']) {
    colour = changes['colour'].newValue
  }
  if(changes['format24']) {
    format24 = (changes['format24'].newValue == "twentyfour");
  }
  update();
}

browser.storage.onChanged.addListener(logStorageChange);
