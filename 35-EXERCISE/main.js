/**
 * Exercise: implement click$ as an observable that
 * emits click events.
 */

click$.subscribe({
  next: ev => {
    console.log(ev.clientX, ev.clientY);
  }
});
