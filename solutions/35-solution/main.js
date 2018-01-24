const click$ = {
  subscribe(observer) {
    document.addEventListener('click', observer.next);
    return () => {
      document.removeEventListener('click', observer.next);
    };
  }
};

click$.subscribe({
  next: ev => {
    console.log(ev.clientX, ev.clientY);
  }
});
