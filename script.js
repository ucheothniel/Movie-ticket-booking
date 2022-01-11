const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value; 

//Save selected movie index and price
function setMovieData (movieIndex, moviePrice) {
    localStorage.setItem('movieSelectedIndex', movieIndex);
    localStorage.setItem('moviePrice', moviePrice);
}

/*function setMovieData() {
    const selectedSeats1 = document.querySelectorAll('.row .seat.selected');
    const selectedSeats1Count = selectedSeats1.length;
    mainTotal = selectedSeats1Count * ticketPrice;

    localStorage.setItem('movieSelected', movieSelect.selectedIndex);
    localStorage.setItem('Price', mainTotal);
} MY OWN FUNCTION WORKS FINE BUT IT IS LONG*/


//update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map((seat) => 
         [...seats].indexOf(seat)
    );

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    //console.log(seatsIndex);

    const selectedSeatsCount = selectedSeats.length;

    //console.log(selectedSeatsCount);
    //console.log(selectedSeats);

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice; //count of selcted seats times
    //ticketPrice to give total price
}
/* we need to add an event in this case 'click' event to enable seat selection, change event 
helps us select different movies in order to get the approprtiate total value for number of
seats selected per movie
*/

// Get data from localstorage and populate UI

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')
    );

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('movieSelectedIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;      
    }
}

// Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});


//Seat click event
container.addEventListener('click', e => {
    if (
      e.target.classList.contains('seat') && 
      !e.target.classList.contains('occupied')
    )  {
       e.target.classList.toggle('selected');
       
       updateSelectedCount();
         
    }

}); 

//initial count and total. This will help us store and reload the price count of seats/tickets and price
//even after reloading the page.

updateSelectedCount();