function* bfs(root) {
  const fifo = [root];
  while (fifo.length) {
    const elem = fifo.shift();
    for (let child of elem.children) {
      fifo.push(child);
    }
    yield elem;
  }
}

for (let elem of bfs(document.body)) {
  console.log(elem.id);
}
