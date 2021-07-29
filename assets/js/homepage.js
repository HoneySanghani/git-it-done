var userFormEl=document.querySelector("#user-form");
var nameInputEl=document.querySelector("#username");
var repoSearchTerm=document.querySelector("#repo-search-term");
var repoContainerEl=document.querySelector("#repos-container");
var formSubmitHandler=function(event){
    event.preventDefault();
    var username=nameInputEl.value.trim();
    if(username){
        getUserRepos(username);
        nameInputEl.value=" ";
    }
    else{
        alert("Please enter User Name");
    }
}
var getUserRepos=function(user){
    //format gitHub url
    var apiUrl="https://api.github.com/users/" + user + "/repos";
    //fetch data from api
   fetch(apiUrl).then(function(response) {
        if(response.ok){
            response.json().then(function(data) {
                displayRepos(data,user);
              });
        }
        else{
            alert("Error: GitHub user not found!");
        }
    })
    .catch(function(error) {
        // Notice this `.catch()` getting chained onto the end of the `.then()` method
        alert("Unable to connect to GitHub");
      })
};
var displayRepos=function(repos,searchTerm){
    if(repos.length===0){
        repoContainerEl.textContent="No Repositories Found!";
        return;
    }
    console.log(repos);
    console.log(searchTerm);
    for(var i=0;i<repos.length;i++){
        //format repos name
        var  repoName=repos[i].owner.login + "/" +repos[i].name;
        //create container for each repo
        var repoEl=document.createElement("a");
        repoEl.classList="list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo="+repoName);
        //span element to store repo name
        var titleSpanEl=document.createElement("span");
        titleSpanEl.textContent=repoName;

        var statusSpanEl=document.createElement("span");
        statusSpanEl.classList="flex-row align-center";
        //check for open issues in repo
        if(repos[i].open_issues_count>0){
            statusSpanEl.innerHTML =
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        }
        else{
            statusSpanEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }
        repoEl.append(titleSpanEl);
        repoEl.append(statusSpanEl);
        repoContainerEl.append(repoEl);
    }
    // repoContainerEl.textContent = "";
    repoSearchTerm.textContent=searchTerm;
}
userFormEl.addEventListener("submit",formSubmitHandler);