const github = document.getElementById("repo");
const repoList = [];
let currentPage = 0;

fetch("https://api.github.com/users/EURedBoy/repos")
.then(result => result.json())
.then(async repos => {
    console.log(repos)
    for (let i in repos) {
        const repo = repos[i];

        const commits = await fetch(`https://api.github.com/repos/${repo.full_name}/commits`)
        .then(result => result.json())

        const languages = await fetch(repo.languages_url)
        .then(result => result.json())

        rHtml = createGitHub(repo.name, repo.description, repo.html_url, commits, languages);

        repoList.push(rHtml);
    }
    github.innerHTML = repoList[0];

})

function createGitHub(name, description, link, commits, languages) {

    languageHtml = "";

    for (let language in languages) {
        languageHtml += 
        `
        <div class="circle"></div>'
        <h1 class="text">${language}</h1>
        `
    }

    return `
    <div class="up">
        <div class="container">
            <div class="title-desc">
                <h1 class="title">${name}</h1>
                <p class="desc">${description == null ? "No Description" : description}</p>
            </div>
            <div class="icon">
                <div class="repo">
                    <div class="ball"><h1>${commits.length}</h1></div>
                    <img src="https://img.icons8.com/fluency/344/compare-git.png" alt="" class="image" onclick="window.open('${link}','mywindow');">
                </div>
                <div class="stars">
                    <div class="ball"><h1>1</h1></div>
                    <img src="https://img.icons8.com/fluency/344/filled-star.png" alt="" class="image">
                </div>
            </div>
        </div>
        <div class="languages">
            <div class="language">
                ${languageHtml}
            </div>
        </div>
    </div>
    <div class="down">
        <div class="pages small" onclick="buttonBackward()"></div> 
        <div class="pages cicon"></div> 
        <div class="pages small" onclick="buttonForward()"></div> 
    </div>
    `
}

function buttonForward() {
    if (currentPage === repoList.length-1) {
        currentPage = 0;
    } else {
        currentPage++;
    }
    github.innerHTML = repoList[currentPage];
}

function buttonBackward() {
    if (currentPage === 0) {
        currentPage = repoList.length-1;
    } else {
        currentPage--;
    }
    github.innerHTML = repoList[currentPage];
}