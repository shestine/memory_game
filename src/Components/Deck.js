
//used to rearrange items in the array
function shuffle(array) {

    //variable holding a copy of the array
    const cardArray = array.slice(0);
    for (
        //iterating through the array of cards
        var i = 0; i < cardArray.length; i ++) {
        //creating a random value for the array index, using Math.random() * iteration number through array + 1. Math.floor rounds the value so 
        //that it isn't a decimal value
        var randomIndex = Math.floor(Math.random() * (i + 1));
        var temp = cardArray[i];
        //giving each item in the array a random index
        cardArray[i] = cardArray[randomIndex];
        cardArray[randomIndex] = temp;
    }

    //returns the array of cards after the items have been rearranged
    return cardArray;
}

export default function initializeDeck() {
    
    let id = 0;
    //creating the items in the card array, references the names of the images in the img folder
    //using reduce to only output one item from the array
    const cards= ['chewy', 'darthvader', 'hansolo', 'jabba', 
    'leia', 'palpatine', 'r2d2', 'yoda'].reduce((acc, type) => {
        //displays the array twice so that the cards can be matched
        acc.push({
            //id allows for only the one card selected to be flipped
            id: id++,
            //type refers to the image on the front of the card
            type
        })
        acc.push({
            id: id++,
            type
        })
        //the selected card is returned
        return acc
    }, [])

    //shuffle method used on the array of cards created
    return shuffle(cards);
}