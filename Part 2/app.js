$(function() {
    let base_url = 'https://deckofcardsapi.com/api/deck';

// 1 
$.getJSON(`${base_url}/deck/new/draw`).then(data => {
        let { suit, value } = data.cards[0];
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    });


    // 2
    let firstCard = null;
    $.getJSON(`${base_url}/new/draw`).then(data => {
        firstCard = data.card[0];
        let deckId = data.deck_id;
        return $.getJSON(`${base_url}/${deckId}/draw`);
    }).then(data => {
        let secondCard = data.cards[0];
        [firstCard, secondCard].forEach(function (card) {
            console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`
            );
        });
    });


    // 3. 

    let deckId = null;
    let $btn = $('button');
    let $cardArea = $('#card-area');

    $.getJSON(`${base_url}/new/shuffle`).then(data => {
        deckId = data.deck_id;
        $btn.show();
    });

    $btn.on('click', function () {
        $.getJSON(`${base_url}/${deckId}/draw/`).then(data => {
            let cardSRC = data.cards[0].image;
            let angle = Math.random() * 90 - 45;
            let randomX = Math.random() * 40 - 20;
            let randomY = Math.random() * 40 - 20;
            $cardArea.append(
                $('<img>', {
                    src: cardSRC,
                    css: {
                        transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
                    }
                })
            );
            if (data.remaining === 0) $btn.remove();
        })
    })
});