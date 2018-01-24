function manySS(cb) {
  cb(10);
}

function randomSS(cb) {
  cb(Math.random());
}

manySS(x => console.log(x));
randomSS(x => console.log(x));
