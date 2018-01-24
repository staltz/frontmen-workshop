function manySS(cb) {
  cb(1);
  cb(2);
  cb(3);
  cb(4);
}

function randomSS(cb) {
  cb(Math.random());
}

manySS(x => console.log(x));
randomSS(x => console.log(x));
