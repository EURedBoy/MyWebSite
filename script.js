fetch("https://api.github.com/users/EURedBoy/repos")
    .then(result => result.json())
    .then(result => {
        console.log(result);
    })

//"https://api.github.com/repos/EURedBoy/CoolParkour/languages"