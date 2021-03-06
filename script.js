const repo = document.getElementById("repo");
const gitArray = [];
let currentRepo = 0;

fetch("https://api.github.com/users/EURedBoy/repos")
    .then(result => result.json())
    .then(async repos => {
        let resultHtml = "";
        let rHtml = "";

        for (let i = 0; i < repos.length; i++) {
            const r = repos[i];

            rHtml = await fetch(repos[i].languages_url)
            .then(result => result.json())
            .then(async languages => {
                return await getRepoHtml(r.name, 
                    r.description,
                    r.html_url,
                    r.stargazers_count,
                    0,
                    languages,
                    repos
                    )
            })
        }

        repo.innerHTML = gitArray[0];
        console.log(gitArray[0]);
    })


function getRepoHtml(title, description, link, stars, commits, languages, rep) {
    languagesHtml = "";
    pageHtml = "";
    let nRepo = 0;

    for (let i = 0; i < Object.keys(languages).length; i++) {
        languagesHtml += `
            <div class="language">
                <div class="circle"></div>
                <h1 class="text">${Object.keys(languages)[i]}</h1>
            </div>
        `
    }

    for (let i = 0; i < rep.length; i++) {
        if (i === nRepo) {
            pageHtml += `<div class="pages cicon" onclick="avanti()"></div>`
            continue;
        }
        pageHtml += `<div class="pages"></div>`
    }


    gitArray.push(
        `
        <div class="up">
            <div class="container">
                <div class="title-desc">
                    <h1 class="title">${title}</h1>
                    <p class="desc">${description}</p>
                </div>
                <div class="icon">
                    <div class="repo">
                        <div class="ball"><h1>${commits}</h1></div>
                        <img src="https://img.icons8.com/fluency/344/compare-git.png" alt="" class="image">
                    </div>
                    <div class="stars">
                        <div class="ball"><h1>${stars}</h1></div>
                        <img src="https://img.icons8.com/fluency/344/filled-star.png" alt="" class="image">
                    </div>
                </div>
            </div>
            <div class="languages">
                ${languagesHtml}
            </div>
        </div>
        <div class="down">
            ${pageHtml}
        </div>
    `
    )
    nRepo++;
}

function avanti(){
    if (currentRepo === gitArray.length-1) {
        currentRepo = 0;
    } else {
        currentRepo++;
    }
    repo.innerHTML = gitArray[currentRepo];
}