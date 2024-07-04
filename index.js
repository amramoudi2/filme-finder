let filmsDisplayPoz = document.getElementById("films");
let noFilms = document.getElementById("no-film");

document.getElementById("search-btn").addEventListener("click", function(){
    let s = document.getElementById("search-input").value
    getMove(s)
})

document.addEventListener("click", function(e){
    if(e.target.dataset.add){
        let movieArr = []
        let newMovieONClick = e.target.dataset.add

        movieArr.push(newMovieONClick)

        console.log(movieArr)
    }
})


function getMove(input){
    fetch(`http://www.omdbapi.com/?s=${input}&apikey=74892d35`)
        .then(res => res.json())
        .then(data => {
            filmsDisplayPoz.innerText = ""
            displayMoves(data.Search)
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
                <img src=${item.Poster}>
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

