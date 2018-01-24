const many$ = {
  subscribe(observer) {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.next(4);
    observer.complete();
  }
};

const random$ = {
  subscribe(observer) {
    observer.next(Math.random());
    observer.complete();
  }
};

many$.subscribe({
  next: x => console.log(x),
  complete: () => console.log('done')
});
random$.subscribe({
  next: x => console.log(x),
  complete: () => console.log('done')
});
