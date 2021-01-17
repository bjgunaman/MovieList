const API_KEY = "b306339ebb5b313ade8f867891116f10";
const RAPID_API_KEY = "8eb9b4c8fcmsh82c4ba4166e3c70p1df254jsn5d24f23d75bb";

export const requestsByGenre = {
    getAction: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    getComedy: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    getRomance: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    getDocumentary: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
    getHorror: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    getAdventure: `/discover/movie?api_key=${API_KEY}&with_genres=12`,
    getCrime: `/discover/movie?api_key=${API_KEY}&with_genres=80`,
    getAnimation: `/discover/movie?api_key=${API_KEY}&with_genres=16`,
    getFantasy: `/discover/movie?api_key=${API_KEY}&with_genres=14`,
    getHistory: `/discover/movie?api_key=${API_KEY}&with_genres=36`,
    getThriller: `/discover/movie?api_key=${API_KEY}&with_genres=53`,
    getAdventure: `/discover/movie?api_key=${API_KEY}&with_genres=12`,
    getMystery: `/discover/movie?api_key=${API_KEY}&with_genres=9648`,
    getScienceFiction: `/discover/movie?api_key=${API_KEY}&with_genres=878`
}

export const requestMovieByIdWithCred = (movieId) => {
    return `/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits`
}
    

export const generateRequestMovieInfoImdb = (imdbId) => {
    const options = {
        method: 'GET',
        url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
        params: {i: imdbId, r: 'json'},
        headers: {
          'x-rapidapi-key': RAPID_API_KEY,
          'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
        }
    };
    return options
    
}



