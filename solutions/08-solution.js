#!/usr/bin/env node

/**
 * Exercise: add a comment `// read` or `// write` or `// write & read`
 * at the end of each line of code you think does one of those three cases.
 *
 * Not every line needs to be commented.
 */

if (process.getuid()) { // read
  console.error('Run as root'); // write
  process.exit(1); // write
}

var diff = require('ansi-diff-stream')(); // read
var input = require('neat-input')(); // read
var fs = require('fs'); // read
var path = require('path'); // read

var FOLDER = '/sys/class/backlight/intel_backlight';
var BRIGHTNESS_FILE = path.join(FOLDER, 'brightness');
var MAX_BRIGHTNESS_FILE = path.join(FOLDER, 'max_brightness');
var MAX = readInt(MAX_BRIGHTNESS_FILE);

var pct = Math.floor(100 * readInt(BRIGHTNESS_FILE) / MAX);
var inc = 5;

var ws = fs.createWriteStream(BRIGHTNESS_FILE); // write

input.on('right', function() { // write
  pct += inc;
  if (pct > 100) pct = 100;
  update(); // write
});

input.on('left', function() { // write
  pct -= inc;
  if (pct < 0) pct = 0;
  update(); // write
});

diff.pipe(process.stdout); // write
render(); // write

process.on('SIGWINCH', noop); // write
process.stdout.on('resize', onresize); // write

function readInt(file) {
  return parseInt(fs.readFileSync(file, 'ascii'), 10); // read
}

function update() {
  ws.write('' + Math.max(1, Math.floor(pct / 100 * MAX)) + '\n'); // write
  render(); // write
}

function onresize() {
  diff.clear(); // write
  render(); // write
}

function times(str, n) {
  var res = '';
  while (n--) res += str;
  return res;
}

function render() {
  var wid = Math.max(0, process.stdout.columns - 8);
  var widPct = Math.floor(wid * pct / 100);
  var slider = '[' + times('#', widPct) + times(' ', wid - widPct) + ']';

  diff.write( // write
    'Use <left> and <right> to adjust brightness\n' +
      slider +
      ' ' +
      (pct < 10 ? '  ' : pct < 100 ? ' ' : '') +
      pct +
      '%'
  );
}

function noop() {}
