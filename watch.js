let moviesArr = []
let noMoviesDisplay = document.getElementById("main-display")
let displayMovise = document.getElementById("films")

function getMovieId(movie) {
    for ( let i = 0; i < localStorage.length; ++i ) {
        movie.push(localStorage.getItem(localStorage.key(i)).slice(1,-1))
    }
}


document.addEventListener("click", function (e) {
    if(e.target.dataset.remove){

        let dataSetTarget = e.target.dataset.remove;

        noMoviesDisplay.style.display = "block"

        localStorage.removeItem(dataSetTarget)

        moviesArr = []
        getMovieId(moviesArr)

        displayMovise.innerHTML = ''

        getMovies(moviesArr)
    }
    if(moviesArr.length <= 0){
        noMoviesDisplay.style.display = "block"
    }
})


function getMovies(movie){

    for(let currentMovie of movie){
        fetch(`http://www.omdbapi.com/?i=${currentMovie}&apikey=74892d35&`)
            .then(res => res.json())
            .then(data => {
                if (moviesArr.length > 0){


                    noMoviesDisplay.style.display = "none"
                    displayMovise.style.display = "block"

                    displayMovise.innerHTML += `
                    <div class="moves">
                        <img alt="movie poster" src=${data.Poster}>
                        <div>
                       <h2>${data.Title}</h2>
                       <p>${data.Type}</p>
                       <p>${data.Year}</p>
                         <div class="add">
                           <button data-remove = "${data.imdbID}">-</button>
                           <p>remove</p>
                         </div>
                     </div>
                 </div>
                `
                }else {
                    noMoviesDisplay.style.display = "block"
                    displayMovise.style.display = "none"
                }

            })
    }
}

getMovieId(moviesArr)

getMovies(moviesArr)
