function flipCard(card) {
  let cardState = 'front';

  card.addEventListener('dblclick', event => {
    const el = event.target.tagName;
    const permitted = ['DIV', 'P'];
    if (~permitted.indexOf(el)) {
      if (cardState === 'front') {
        card.style.transform = 'rotateY( 180deg )';
        cardState = 'back';
      } else {
        card.style.transform = 'rotateY( 0deg )';
        cardState = 'front';
      }
    }
  });
}
