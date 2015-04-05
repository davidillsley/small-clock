self.port.on("get-image", function(time) {
  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');
  context.fillStyle = time.textColour;
  context.font = "80px sans-serif";
  context.fillText(time.hours, 1, 58);
  context.font = "62px sans-serif";
  context.fillText((time.minutes<10? "0": "") + time.minutes, 60, 110);
  var dataURL = canvas.toDataURL();

  context.fillStyle = "rgb(0, 0,0 )";
  context.clearRect(0, 0, canvas.width, canvas.height);
  self.port.emit("image", dataURL);
});

