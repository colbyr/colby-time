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

function get12Hours(date) {
  var hours = date.getHours() % 12;
  if (hours === 0) {
    return 12;
  }
  return hours;
}

rocky.on('minutechange', function() {
  rocky.requestDraw();
});

rocky.on('draw', function(event) {
  var ctx = event.context;
  var date = new Date();
  var text = (
    format(get12Hours(date), date.getMinutes()) +
    '\n' +
    format(date.getMonth() + 1, date.getDate()) +
    '\n' +
    date.getFullYear()
  );

  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
  ctx.fillStyle = '#77b300';
  ctx.font = '42px bold numbers Leco-numbers';
  ctx.textAlign = 'center';

  var t = ctx.measureText(text);
  var h = ctx.canvas.unobstructedHeight;
  var w = ctx.canvas.unobstructedWidth;

  ctx.fillText(
    text,
    Math.floor(w / 2),
    Math.floor(h / 2) - (Math.floor(t.height / 2) + 7)
  );
});
