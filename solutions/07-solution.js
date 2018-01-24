#!/usr/bin/env node

/**
 * Exercise: add a comment `// get` or `// set` or `// set & get`
 * at the end of each line of code you think does one of those three cases.
 *
 * Not every line needs to be commented.
 */

if (process.getuid()) { // get
  console.error('Run as root'); // set
  process.exit(1); // set
}

var diff = require('ansi-diff-stream')(); // set & get, then get
var input = require('neat-input')(); // set & get, then get
var fs = require('fs'); // set & get
var path = require('path'); // set & get

var FOLDER = '/sys/class/backlight/intel_backlight';
var BRIGHTNESS_FILE = path.join(FOLDER, 'brightness'); // set & get
var MAX_BRIGHTNESS_FILE = path.join(FOLDER, 'max_brightness'); // set & get
var MAX = readInt(MAX_BRIGHTNESS_FILE); // set & get

var pct = Math.floor(100 * readInt(BRIGHTNESS_FILE) / MAX); // set & get
var inc = 5;

var ws = fs.createWriteStream(BRIGHTNESS_FILE); // set & get

input.on('right', function() { // set
  pct += inc;
  if (pct > 100) pct = 100;
  update(); // set
});

input.on('left', function() { // set
  pct -= inc;
  if (pct < 0) pct = 0;
  update(); // set
});

diff.pipe(process.stdout); // set
render(); // set

process.on('SIGWINCH', noop); // set
process.stdout.on('resize', onresize); // set

function readInt(file) {
  return parseInt(fs.readFileSync(file, 'ascii'), 10); // set & get, then set & get
}

function update() {
  ws.write('' + Math.max(1, Math.floor(pct / 100 * MAX)) + '\n'); // set
  render(); // set
}

function onresize() {
  diff.clear(); // set
  render(); // set
}

function times(str, n) {
  var res = '';
  while (n--) res += str;
  return res;
}

function render() {
  var wid = Math.max(0, process.stdout.columns - 8); // set & get
  var widPct = Math.floor(wid * pct / 100); // set & get
  var slider = '[' + times('#', widPct) + times(' ', wid - widPct) + ']';

  diff.write( // set
    'Use <left> and <right> to adjust brightness\n' +
      slider +
      ' ' +
      (pct < 10 ? '  ' : pct < 100 ? ' ' : '') +
      pct +
      '%'
  );
}

function noop() {}
