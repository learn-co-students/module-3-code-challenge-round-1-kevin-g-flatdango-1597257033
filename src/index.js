const url = "http://localhost:3000/films"

let filmPoster = document.querySelector("img#poster")
let filmTitle = document.querySelector("div#title.title")
let filmRuntime = document.querySelector("div#runtime.meta")
let filmDescription = document.querySelector("div#film-info")
let filmShowtime = document.querySelector("span#showtime.ui.label")
let filmAvailableTickets = document.querySelector("span#ticket-num")
let buyTicketButton = document.querySelector("div.ui.orange.button")

fetch("http://localhost:3000/films")
    .then(res => res.json())
    .then((filmsArr) => {

        filmsArr.forEach((singleFilm) => {
            // console.log(singleFilm)
            renderFilm(singleFilm)
        })
        renderFilm(filmsArr[0])
    })

let renderFilm = (filmObj) => {
    //console.log(filmObj)
    filmPoster.src = filmObj.poster
    filmTitle.innerText = filmObj.title
    filmRuntime.innerText = filmObj.runtime
    filmDescription.innerText = filmObj.description
    filmShowtime.innerText = filmObj.showtime
    filmAvailableTickets.innerText = `${filmObj.capacity - filmObj.tickets_sold}`

    buyTicketButton.addEventListener("click", (evt) => {
        filmObj.tickets_sold += 1 
        evt.preventDefault()
        fetch(`http://localhost:3000/films/${filmObj.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                capacity: filmObj.capacity,
                tickets_sold: filmObj.tickets_sold
            })
         })
         .then(res => res.json())
         .then((updatedFilm) => {
             filmAvailableTickets.innerText = `${updatedFilm.capacity - updatedFilm.tickets_sold}`
             debugger
         })
    })
}
