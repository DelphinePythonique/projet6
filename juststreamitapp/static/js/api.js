export function fetch_movies(message){

      fetch("http://localhost:8000/api/v1/titles/")
      .then(function(res) {
        if (res.ok) {
            return res.json();
        }
        })
        .then(function(value){
        console.log(value['results']);
         })
        .catch(function(err) {
      console.log(err)
             });
}