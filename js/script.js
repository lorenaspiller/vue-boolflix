/*
BOOLFLIX
Milestone 1:
Creare un layout base con una searchbar (una input e un button) in cui possiamo
scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il
bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni
film trovato:
1. Titolo
2. Titolo Originale
3. Lingua
4. Voto
*/

var app = new Vue({
  el: '#app',
  data: {
    userQuery: "",
    movies: [],
    myApiKey: "3124987f708e83e904b51eb8a20737a0",
  },
  methods: {
    moviesSearch: function() {
      axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: this.myApiKey,
          query: this.userQuery,
          page: 1,
          include_adult: false,
          language: "it-IT",
        }
      })
      .then((response)=>{
        const searchResults = response.data.results;
        this.movies = searchResults;
        this.movieRate();
      });
      this.userQuery="";
    },
    movieRate: function() {
      this.movies.forEach((item) => {
        const voteRound = (item.vote_average / 2);
        let vote = Math.ceil(voteRound);
        item.vote_average = vote;
        console.log(item.vote_average);
      });
    }
  }

})
