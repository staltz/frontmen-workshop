function map(transformFn, inputObservable) {
  return {
    subscribe: outputObserver => {
      inputObservable.subscribe({
        next: x => {
          outputObserver.next(transformFn(x));
        },
        error: e => {
          outputObserver.error(e);
        },
        complete: () => {
          outputObserver.complete();
        }
      });
    }
  };
}

const a$ = {
  subscribe(observer) {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.next(4);
    observer.complete();
  }
};

const b$ = map(x => x * 10, a$);

b$.subscribe({
  next: x => console.log(x),
  error: e => console.error(e),
  complete: () => console.log('done')
});
// 10
// 20
// 30
// 40
// done
