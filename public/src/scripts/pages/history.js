//might not need script, just need to generate page which is done in another module
export function historyScript () {
let formatButtonElement = document.getElementById("format-button");

formatButtonElement.addEventListener('click', function() {
    if (formatButtonElement.innerHTML == 'Carousel') {
        formatButtonElement.innerHTML = 'Table'; 
    } else if (formatButtonElement.innerHTML == 'Table') {
        formatButtonElement.innerHTML = 'Carousel'; 
    }
    
}); 
 console.log('history script');

};