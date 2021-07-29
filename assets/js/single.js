var issuesContainer=document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");
var getRepoIssues=function(repo){
    console.log(repo);
    var apiUrl="https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                console.log(data);
                displayIssues(data);
                if (response.headers.get("Link")) {
                    displayWarning(repo);
                  }
            })
        }
        else{
            alert("There was a error regarding your request");
        }
    });
};
var displayIssues=function(issues){
    if (issues.length === 0) {
        issueContainer.textContent = "This repo has no open issues!";
        return;
      }
    for(var i=0;i<issues.length;i++){
        var issuesLinkEl=document.createElement("a");
        issuesLinkEl.classList="list-item flex-row justify-space-between align-center";
        issuesLinkEl.setAttribute("href",issues[i].html_url);
        issuesLinkEl.setAttribute("target","_blank");

        var titleSpanEl=document.createElement("span");
        titleSpanEl.textContent=issues[i].title;
        issuesLinkEl.appendChild(titleSpanEl);

        var typeEl=document.createElement("span");
        if(issues[i].pull_request){
            typeEl.textContent = "(Pull request)";
        }
        else {
            typeEl.textContent = "(Issue)";
        }
        issuesLinkEl.appendChild(typeEl);
        issuesContainer.appendChild(issuesLinkEl);
    }
};
var displayWarning = function(repo) {
    
    // add text to warning container
    limitWarningEl.textContent = "To see more than 30 issues, visit ";
    
    var linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");
  
    // append to warning container
    limitWarningEl.appendChild(linkEl);
  };
getRepoIssues("facebook/react");
