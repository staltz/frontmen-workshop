// https://github.com/jneidel/project-manager/blob/021ca104fd37ad05008203ea612a232782da4193/src/scripts/app.js
/* globals Vue url axios */
/* eslint-disable no-alert */

// Listening for item/title changes
const setListener = {
  item( item ) {
    let originalItem = item.value;

    item.addEventListener( "keydown", async () => {
      if ( event.which === 13 ) {
        const parentNode = item.parentNode.parentNode.parentNode;
        const titleNode = parentNode.children;
        let cardSide;

        if ( parentNode.className.match( /back/ ) === null ) {
          cardSide = "front";
        } else {
          cardSide = "back";
        }

        if ( titleNode.length == 3 ) {
          var title = titleNode[1].value;
          var lastItem = parentNode
            .children[2]
            .children[parentNode.children[2].children.length - 1]
            .children[1];
        } else {
          var title = titleNode[0].value;
          var lastItem = titleNode[1]
            .children[titleNode[1].children.length - 1]
            .children[1];
        }

        if ( lastItem === item ) {
          axios.post( "/api/add-new-item", { cardSide, title } );

          if ( titleNode.length == 3 ) {
            var newItemWrapper = parentNode.children[2].appendChild( document.createElement( "li" ) );
          } else {
            var newItemWrapper = parentNode.children[1].appendChild( document.createElement( "li" ) );
          }
          const span = newItemWrapper.appendChild( document.createElement( "span" ) );
          const input = newItemWrapper.appendChild( document.createElement( "input" ) );
          span.classes = "bullet";
          span.innerHTML = "&#9679; &nbsp;&nbsp;";
          span.style = "font-size: 0.8rem;";
          input.type = "text";
          input.classes = "item";

          setListener.item( input );
          setListener.bullet( span );
        }

        await axios.post( "/api/update", {
          updatedItem: item.value,
          oldItem    : originalItem,
          cardSide,
          title,
        } );

        originalItem = item.value;
       }
    } );
  },
  title( title ) {
    let originalTitle = title.value;

    title.addEventListener( "keydown", async () => {
      if ( event.which === 13 ) {
        if ( title.value.length >= 20 ) {
          alert( `The title "${title.value}" will probably be cut off as its too long.
              ${title.value.length}` );
        }

        const parent = title.parentNode.parentNode.children;
        if ( !title.parentNode.className.match( /back/ ) ) {
          parent[1].children[1].value = title.value;
        } else {
          parent[0].children[0].value = title.value;
        }

        await axios.post( "/api/update", { updatedTitle: title.value, title: originalTitle } );

        originalTitle = title.value;
      }
    } );
  },
  bullet( bullet ) {
    async function removeItem() {
      const item = bullet.parentNode.children[1].value;
      const title = bullet.parentNode.parentNode.parentNode.children[0].value;
      let side = bullet.parentNode.parentNode.parentNode.className;
      if ( side.match( /front/ ) ) {
        side = "front";
      } else {
        side = "back";
      }

      bullet.parentNode.remove();

      const response = await axios.post( "/api/remove-item", { title, item, side } );
      checkResponse( response.data, "app", true );
    }

    bullet.addEventListener( "mouseenter", () => {
      bullet.style = "color: #333;";

      bullet.addEventListener( "click", removeItem );
    } );
    bullet.addEventListener( "mouseleave", () => {
      bullet.style = "color: #F5F7FA";

      bullet.removeEventListener( "click", removeItem );
    } );
  },
};

function setEventListeners() {
  const items = document.getElementsByClassName( "item" );
  const titles = document.getElementsByClassName( "title" );
  const bullets = document.getElementsByClassName( "bullet" );

  for ( const item of items ) {
    setListener.item( item );
  }
  for ( const title of titles ) {
    setListener.title( title );
  }
  for ( const bullet of bullets ) {
    setListener.bullet( bullet );
  }

  const cards = document.getElementsByClassName( "card" );

  // flip cards
  function flipCard( card ) {
    let cardState = "front";

    card.addEventListener( "dblclick", ( event ) => {
      const el = event.target.tagName;
      const permitted = [ "DIV", "P" ];
      if ( ~permitted.indexOf( el ) ) {
        if ( cardState === "front" ) {
          card.style.transform = "rotateY( 180deg )";
          cardState = "back";
        } else {
          card.style.transform = "rotateY( 0deg )";
          cardState = "front";
        }
      }
    } );
  }

  // Add new card
  const cardListenerCallback = function cardListenerCallbackWrapper() {
    setNewCardToInput( this, cardListenerCallback );
  };

  async function setNewCardToInput( cardToBeSet, callingFunction ) {
    cardToBeSet.removeEventListener( "dblclick", callingFunction );
    cardToBeSet.className = "card";
    cardToBeSet.innerHTML = `
      <div class="front inner">
        <input class="title" type="text" placeholder="Add title">
        <ul>
          <li>
            <span class="bullet">&#9679; &nbsp;&nbsp;</span>
            <input class="item" type="text" placeholder="Add items">
          </li>
        </ul>
      </div>
      <div class="back inner">
        <p class="future">Future</p>
        <input class="title" type="text" placeholder="Add title">
        <ul>
          <li>
            <span class="bullet">&#9679; &nbsp;&nbsp;</span>
            <input class="item" type="text" placeholder="Add items">
          </li>
        </ul>
      </div>
     `;

    for ( const item of cardToBeSet.children ) {
      const side = item.children.length == 3 ? 2 : 1;
      setListener.item( item.children[ side ].children[0].children[0] );
    }
    for ( const title of cardToBeSet.children ) {
      const side = title.children.length == 3 ? 1 : 0;
      setListener.title( title.children[ side ] );
    }
    for ( const bullet of cardToBeSet.children ) {
      const side = bullet.children.length == 3 ? 2 : 1;
      setListener.bullet( bullet.children[ side ].children[0].children[0] );
    }

    flipCard( cardToBeSet );

    const content = document.getElementById( "inner" );
    const newCard = content.appendChild( document.createElement( "span" ) );

    newCard.innerHTML += `<img class="addCard" src="img/add.png">`;
    newCard.className = "card addCardContainer";
    newCard.addEventListener( "dblclick", cardListenerCallback );

    const cardIdRequest = await axios.post( "/api/generate-cardId" );
    const cardId = cardIdRequest.data._id;

    axios.post( "/api/add-new-card", { _id: cardId } );
  }

  for ( const card of cards ) {
    const classes = card.className;
    if ( !classes.match( /.addCardContainer/ ) ) {
      flipCard( card );
    } else {
      card.addEventListener( "dblclick", cardListenerCallback );
    }
  }
}

setEventListeners();