const apiKey = '3fd2be6f0c70a2a598f084ddfb75487c';
const baseUrl = 'https://api.themoviedb.org/3';
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('movie-list')) {
        fetchNowPlayingMovies();
    }

    const movieId = getMovieIdFromUrl();
    if (movieId) {
        fetchMovieDetails(movieId);
    }

    const searchButton = document.getElementById('search-button');
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            const query = document.getElementById('search-input').value;
            searchMovies(query);
        });
    }
});

function fetchNowPlayingMovies() {
    fetch(`${baseUrl}/movie/now_playing?api_key=${apiKey}&language=pt-BR`)
        .then(response => response.json())
        .then(data => {
            displayMovies(data.results);
        })
        .catch(error => console.error('Error fetching now playing movies:', error));
}

function displayMovies(movies) {
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = '';

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'mb-4');
        movieElement.innerHTML = `
            <div class="card">
                <img src="${imageBaseUrl}${movie.poster_path}" class="card-img-top" alt="${movie.title}">
                <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <p class="card-text">${movie.overview.substring(0, 100)}...</p>
                    <a href="filme.html?id=${movie.id}" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        `;
        movieList.appendChild(movieElement);
    });
}

function getMovieIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function fetchMovieDetails(movieId) {
    fetch(`${baseUrl}/movie/${movieId}?api_key=${apiKey}&language=pt-BR`)
        .then(response => response.json())
        .then(data => {
            displayMovieDetails(data);
            fetchMovieCredits(movieId);
        })
        .catch(error => console.error('Error fetching movie details:', error));
}

function displayMovieDetails(movie) {
    const movieDetails = document.getElementById('movie-details');
    movieDetails.innerHTML = `
        <div class="col-md-4 text-center text-md-left">
            <img src="${imageBaseUrl}${movie.poster_path}" class="img-fluid movie-poster" alt="${movie.title}">
        </div>
        <div class="col-md-8 text-center text-md-left">
            <h2>${movie.title}</h2>
            <p>${movie.overview}</p>
            <p><strong>Data de lançamento:</strong> ${movie.release_date}</p>
            <p><strong>Nota:</strong> ${movie.vote_average}</p>
            <p><strong>Gêneros:</strong> ${movie.genres.map(genre => genre.name).join(', ')}</p>
            <p><strong>Elenco:</strong> <span id="cast-names"></span></p>
            <a href="https://oaftadseehou.com/4/7684540" class="btn btn-success mr-2"><i class="fas fa-play"></i> Assistir</a>
            <a href="https://locked4.com/fl/k57kp" class="btn btn-warning"><i class="fas fa-download"></i> Download</a>
        </div>
    `;

    document.title = `Assistir ${movie.title} Online Gratis (Filme HD)`;
}

function fetchMovieCredits(movieId) {
    fetch(`${baseUrl}/movie/${movieId}/credits?api_key=${apiKey}&language=pt-BR`)
        .then(response => response.json())
        .then(data => {
            displayMovieCredits(data.cast);
        })
        .catch(error => console.error('Error fetching movie credits:', error));
}

function displayMovieCredits(cast) {
    const castNames = document.getElementById('cast-names');
    const castList = cast.slice(0, 4).map(actor => actor.name).join(', ');
    castNames.textContent = castList;
}

function searchMovies(query) {
    if (!query) return;

    fetch(`${baseUrl}/search/movie?api_key=${apiKey}&language=pt-BR&query=${query}`)
        .then(response => response.json())
        .then(data => {
            displayMovies(data.results);
        })
        .catch(error => console.error('Error searching movies:', error));
}