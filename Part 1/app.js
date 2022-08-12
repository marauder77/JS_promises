let FavNumber = 13; 
let base_url = "http://numbersapi.com/"; 


// 1 
$.getJSON(`${base_url}/${FavNumber}?json`).then(data => {
    console.log(data);
});


// 2 
let = Fav_Numbers = [13, 22, 45];
$.getJSON(`${base_url}/${Fav_Numbers}?json`).then(data => {
    console.log(data);
});


// 3
Promise.all(
    Array.from({ length: 4 }, () => {
        return $.getJSON(`${base_url}/${FavNumber}?json`);
    })
).then(facts => {
    facts.forEach(data => $("body").append(`<p>${data.text}</p>`));
});