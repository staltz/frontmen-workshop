syncButton.addEventListener('click', function(ev) {
  const num = mathRandom1();
  myresult.innerHTML = `${num}`;
});

asyncButton.addEventListener('click', async function(ev) {
  const num = await mathRandom2();
  myresult.innerHTML = `${num}`;
});

workerButton.addEventListener('click', async function(ev) {
  const num = await mathRandom3();
  myresult.innerHTML = `${num}`;
});

function mathRandom1() {
  return Math.random();
}

function mathRandom2() {
  return new Promise(resolve => {
    resolve(Math.random());
  });
}

function mathRandom3() {
  return new Promise(resolve => {
    const worker = new Worker('worker.js');
    worker.onmessage = ev => resolve(ev.data);
    worker.postMessage('');
  });
}
