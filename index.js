let filmsDisplayPoz = document.getElementById("films");
let noFilms = document.getElementById("no-film");
let search = document.getElementById("search-input")
let totalMovieList = []


document.getElementById("btn-serch").addEventListener("click", function(){
    getSearchValue()
})

search.addEventListener("keydown",function(e){
    if (e.key === 'Enter'){
        getSearchValue()
    }
})


document.addEventListener("click", function(e){
    if(e.target.dataset.add){

        let movieId = e.target.dataset.add;
        let movieList = []
        movieList.push(movieId)
        totalMovieList.push(movieList[0])
        localStorage.setItem(`${movieId}`, JSON.stringify(movieId))

    }
})

function getSearchValue(){
    let searchValue = search.value
    getMove(searchValue)
}

function getMove(input){
    fetch(`http://www.omdbapi.com/?s=${input}&apikey=74892d35`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            filmsDisplayPoz.innerText = ""
            displayMoves(data.Search)

        }).catch(() => {
            document.getElementById("no-movie-found").style.display = "block"
        })
}


function displayMoves(movesData){
    noFilms.style.display = "none";
    let addMovieList = []

    movesData.filter((item) => {
        if(item.Type === "movie"){
            return addMovieList.push(item);
        }
    })

    addMovieList.forEach((item) => {
        filmsDisplayPoz.innerHTML += `
             <div class="moves">
                <img alt="movie poster" src=${item.Poster}>
                <div>
                    <h2>${item.Title}</h2>
                    <p>${item.Type}</p>
                    <p>${item.Year}</p>
                    <div class="add">
                        <button data-add = "${item.imdbID}">+</button>
                        <p>add to Watchlist</p>
                    </div>
                </div>
             </div>
        `
    })
}

