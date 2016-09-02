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

rocky.on('minutechange', function() {
  rocky.requestDraw();
});

rocky.on('draw', function(event) {
  var ctx = event.context;
  var date = new Date();
  var text = (
    format(date.getHours(), date.getMinutes()) +
    '\n' +
    format(date.getMonth() + 1, date.getDate()) +
    '\n' +
    date.getFullYear()
  );

  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
  ctx.fillStyle = '#88cc00';
  ctx.font = '42px bold numbers Leco-numbers';
  ctx.textAlign = 'center';

  var t = ctx.measureText(text);
  var h = ctx.canvas.unobstructedHeight;
  var w = ctx.canvas.unobstructedWidth;

  ctx.fillText(
    text,
    (w / 2),
    (h / 2) - (t.height / 2)
  );
});
