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

Milestone 2:
Trasformiamo la stringa statica della lingua in una vera e propria bandiera della nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della nazione ritornata dall’API (le flag non ci sono in FontAwesome).
Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricerca dovremo prendere sia i film che corrispondono alla query, sia le serie tv, stando attenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON di risposta diversi, simili ma non sempre identici)
Qui un esempio di chiamata per le serie tv:
https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query=scrubs
*/

var app = new Vue({
  el: '#app',
  data: {
    userQuery: "",
    movies: [],
    tvSeries: [],
    moviesAndTv: [],
    myApiKey: "3124987f708e83e904b51eb8a20737a0",
    apiLanguage: [ {italian: "it-IT"}, {english: "en-EN"}],
    baseUrl: "https://api.themoviedb.org/3/search/",
  },
  methods: {
    moviesSearch: function() {
      axios.all([
        axios.get(this.baseUrl + 'movie', {
          params: {
            api_key: this.myApiKey,
            query: this.userQuery,
            page: 1,
            include_adult: false,
            language: this.apiLanguage.italian,
          }
        }),
        axios.get(this.baseUrl + 'tv' , {
          params: {
            api_key: this.myApiKey,
            query: this.userQuery,
            page: 1,
            include_adult: false,
            language: this.apiLanguage.italian,
          }
        })
      ])
      .then((response) => {
        this.movies = response[0].data.results;
        this.tvSeries = response[1].data.results;
        this.moviesAndTv = [...this.movies, ...this.tvSeries];
        this.movieRate();
      });
      this.userQuery="";
    },
    movieRate: function() {
      this.moviesAndTv.forEach((item) => {
        const voteRound = (item.vote_average / 2);
        let vote = Math.ceil(voteRound);
        item.vote_average = vote;
        console.log(item.vote_average);
      });
    }
  }

})
