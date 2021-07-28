var getUserRepos=function(user){
    //format gitHub url
    var apiUrl="https://api.github.com/users/" + user + "/repos";
    //fetch data from api
   fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
          console.log(data);
        });
      });
};
getUserRepos("facebook");