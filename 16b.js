function filter(conditionFn) {
  return setXListener =>
    function setYListener(cb) {
      setXListener(x => {
        if (conditionFn(x)) {
          cb(x);
        }
      })
    }
}

function flipCard(card) {
  let cardState = 'front';

  function setDblclickListener(cb) {
    card.addEventListener('dblclick', cb);
  }

  const setDivPDblclickListener = filter(ev =>
    ~(['DIV', 'P'].indexOf(ev.target.tagName))
  )(setDblclickListener)

  setDivPDblclickListener(ev => {
    if (cardState === 'front') {
      card.style.transform = 'rotateY( 180deg )';
      cardState = 'back';
    } else {
      card.style.transform = 'rotateY( 0deg )';
      cardState = 'front';
    }
  })
}
