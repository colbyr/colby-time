var rocky = require('rocky');

function zeroPad(number) {
  if (number >= 10) {
    return '' + number;
  }
  return '0' + number;
}

function format(hh, mm) {
  return zeroPad(hh) + zeroPad(mm);
}

var text = null;

rocky.on('minutechange', function(event) {
  var date = event.date;
  text = (
    format(date.getHours(), date.getMinutes()) +
    '\n' +
    format(date.getMonth() + 1, date.getDate())
  );
  rocky.requestDraw();
});

rocky.on('draw', function(event) {
  var ctx = event.context;
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
  ctx.fillStyle = '#FA4B00';
  ctx.font = '42px bold numbers Leco-numbers';
  ctx.textAlign = 'start';

  var t = ctx.measureText(text);
  var h = ctx.canvas.unobstructedHeight;
  var w = ctx.canvas.unobstructedWidth;
  ctx.fillText(
    text,
    (w / 2) - (t.width / 2),
    (h / 2) - (t.height / 2)
  );
});
