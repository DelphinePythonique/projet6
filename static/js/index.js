//---------------------------CATEGORIES----------------------------------------
let imageIndex = 0;
class Category {
    constructor(name, elementToPopulateId, criteria, isCategorySection = true) {
        this.name = name;
        this.activePage = 1;
        this.elementToPopulateId = elementToPopulateId;
        this.criteria = criteria;
        this.isCategorySection = isCategorySection;
        this.allPagesIsLoaded = false;
    };

    getUrl() {
        return `${domain_uri}?page=${this.activePage}&${this.criteria.join("&")}`;
    }
}

const categories = [
    new Category("Best Movie", "bestmovie_id", ["sort_by=-imdb_score"], false),
    new Category("Top rated movies", "category__toprated", ["sort_by=-imdb_score"]),
    new Category("Action movies", "category__categoryone", ["genre=Action", "sort_by=-imdb_score"]),
    new Category("Drama movies", "category__categorytwo", ["genre=Drama", "sort_by=-imdb_score"]),
    new Category("Romance movies", "category__categorythree", ["genre=Romance", "sort_by=-imdb_score"])
]
const domain_uri = "http://localhost:8000/api/v1/titles/";
const scrollIndent = 200;

//---------------------------CREATE DOM and LINK EVENT----------------------------------------
function innerCategorySection(category){
        return `<h2>${category.name}</h2><div class="category  ${category.elementToPopulateId}"> \
                    <img src=\"./static/images/previous.png\" alt=\"Display previous ${category.name}\" 
                    id=\"${category.elementToPopulateId}__previous\" class=\"previous\"  />  \
                <ul id=\"${category.elementToPopulateId}\" > </ul> \
                <img src=\"./static/images/next.png\" alt=\"Display next ${category.name}\" 
                    id=\"${category.elementToPopulateId}__next\" class=\"next\"  > </div>`;
}
//-----Category section -------
function createSection(category) {
    const main = document.getElementById("main");


    const categorySection = document.createElement("section");

    categorySection.classList.add("section");
    categorySection.innerHTML = innerCategorySection(category);

    main.appendChild(categorySection);
    //main.insertBefore(title, categorySection);

    return categorySection;
}

let scrollToPrevious = category => function () {
    const elementToScroll = document.getElementById(category.elementToPopulateId);
    elementToScroll.scrollLeft -= scrollIndent;
};

let scrollToNext = category => function () {
    if (!category.allPagesIsLoaded) {
        category.activePage++;
        fetchCategoryMovies(category);
    }
    const elementToScroll = document.getElementById(category.elementToPopulateId);
    elementToScroll.scrollLeft += scrollIndent;
};

function attachEventToScrollButton(category) {
    let previousButton = document.getElementById(category.elementToPopulateId + "__previous");
    previousButton.addEventListener('click',
        scrollToPrevious(category));
    let NextButton = document.getElementById(category.elementToPopulateId + "__next");
    NextButton.addEventListener('click',
        scrollToNext(category));
}

//-----Categorie section movies
function populateCategories(movies, category) {
    const ulCategory = document.getElementById(category.elementToPopulateId);
    for (let i in movies) {
        imageIndex++;
        let imageMovie = document.createElement("img");
        imageMovie.setAttribute("id", `img_${imageIndex}`)
        imageMovie.setAttribute("alt", `${movies[i].title} Poster`)
        imageMovie.setAttribute("src", `${movies[i].image_url}`)
        imageMovie.setAttribute("onerror", "this.src=\"./static/images/camera.png\"");

        imageMovie.classList.add("movie");

        let inputMovie = document.createElement('input');
        inputMovie.setAttribute("type", "hidden");
        inputMovie.setAttribute("id", `input_${imageIndex}`);
        inputMovie.setAttribute("name", `input_${imageIndex}`);
        inputMovie.setAttribute("value", `${movies[i].id}`);

        let liMovie = document.createElement("li");
        liMovie.appendChild(imageMovie);
        liMovie.appendChild(inputMovie);
        ulCategory.appendChild(liMovie);
        imageMovie.addEventListener('click', openDetailMovieModal())
    }
}

function movieDetailModalContentParagraph(movie) {
    return `<div> \
               <img src=\"${movie.image_url}\" onerror=\"this.src='./static/images/camera.png'\" \
                  alt=\"Poster ${movie.title}\"  /> \
               <h1>${movie.title}</h1> \
             </div> \
             <div> \
                <p> \
                    <b>Genres: </b>${movie.genres.join(', ')} <br>\
                    <b>Date Published: </b>${movie.date_published}<br> \
                    <b>Rated: </b>${movie.rated} <br>\
                    <b>Imdb score: </b>${movie.imdb_score} \  <br>\
                    <b>Directors: </b>${movie.directors.join(', ')} <br>\
                    <b>Actors: </b>${movie.actors.join(', ')} <br>\
                    <b>Duration: </b>${movie.duration}<br> \
                    <b>Countries: </b>${movie.countries.join(', ')}<br> \
                    <b>Average vote: </b>${movie.avg_vote}<br> \
                    <b>Long description: </b>${movie.long_description}<br> \
                  </p> \
            </div>`;
}

let openDetailMovieModal = () => function () {
    let input_containing_movie_id = this.nextElementSibling;
    let url = `${domain_uri}${input_containing_movie_id.value}`;

    fetchMovieApi(url).then(movie => {
        let movieDetailmodal = document.getElementById('movieDetailModalId');
        movieDetailmodal.style.display = "block";
        document.getElementById('movieDetailModal__content__paragraph').innerHTML =
            movieDetailModalContentParagraph(movie);
    });

}

function innerBestMovie(movie, image_id) {

    return `<div  class="bestmovie__text"> \
                <h2>${movie.title}</h2> \
                <p>${movie.description}</p> \
            </div> \
           <div class="bestmovie__img"> \
                <img  id=\"img_${image_id}\"  class="movie" \
                src="${movie.image_url}" onerror="this.src='./static/images/camera.png'" alt="Poster best movie" /> \
                <input type=\"hidden\" id=\"input_${image_id}\" name=\"input_${image_id}\" value=\"${movie.id}\"> \
           </div>`;
}

//-------- Best Movie section
function populateBestMovie(movie, category) {
    const bestMovieSection = document.getElementById(category.elementToPopulateId);
    imageIndex++;
    bestMovieSection.innerHTML = innerBestMovie(movie, imageIndex);
    const imageMovie = document.getElementById(`img_${imageIndex}`)
    imageMovie.addEventListener('click', openDetailMovieModal())
}

//---------------------------FETCH MOVIES----------------------------------------
async function fetchMoviesApi(url, category) {
    let movies = {};
    const response = await fetch(url);
    if (response.ok) {
        const results = await response.json();
        movies = results.results;
    } else {
        category.allPagesIsLoaded = true;
    }
    return movies
}

async function fetchMovieApi(url) {
    const response = await fetch(url);
    return await response.json()
}

function fetchCategoryMovies(category) {
    let url = category.getUrl();
    fetchMoviesApi(url, category).then(movies => {
        if (category.activePage === 1) {
        createSection(category);
        attachEventToScrollButton(category);
    }
        populateCategories(movies, category)
    }).catch(e =>{
        document.getElementById('bestmovie_id').innerHTML = "API IS UNAVAILABLE. " +
            "TRY START API SERVICE AND REFRESH THIS PAGE ";  });
}

function fetchBestMovie(category) {
    let url = category.getUrl();
    fetchMoviesApi(url).then(movies => {
        let movieId = movies[0].id;
        url = `${domain_uri}${movieId}`;
        //fetchMovieApi sans s
        fetchMovieApi(url).then(movie => {
            populateBestMovie(movie, category)
        });

    });
}

function populateHomePage() {
    for (let i in categories) {
        if (categories[i].isCategorySection) {
            fetchCategoryMovies(categories[i]);
        } else {
            fetchBestMovie(categories[i])
        }
    }
}

populateHomePage();
attachEventOpenModalDetailMovieToImageMovie();

function attachEventOpenModalDetailMovieToImageMovie() {

    let movieDetailmodal = document.getElementById("movieDetailModalId");
    let span = document.getElementsByClassName("movieDetailModal__close")[0];
    span.onclick = function () {
        movieDetailmodal.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target === movieDetailmodal) {
            movieDetailmodal.style.display = "none";
        }
    }
}
