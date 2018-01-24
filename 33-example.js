function manySS(callbacks) {
  callbacks.next(1);
  callbacks.next(2);
  callbacks.next(3);
  callbacks.next(4);
  callbacks.complete();
}

function randomSS(callbacks) {
  callbacks.next(Math.random());
  callbacks.complete();
}

manySS({
  next: x => console.log(x),
  complete: () => console.log('done')
});
randomSS({
  next: x => console.log(x),
  complete: () => console.log('done')
});
