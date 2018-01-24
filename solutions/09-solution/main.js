const worker = new Worker('worker.js');

mybutton.addEventListener('click', ev => {
  worker.postMessage('');
});

worker.onmessage = ev => {
  myresult.innerHTML = `${ev.data}`;
};
