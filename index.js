import {gamertag} from "./src/gamertag.js"

const all = 178


const reload = function(search = "*") {
    document.body.querySelector("main").innerHTML = ""
    for (const player of gamertag) {
        if (search !== "*") {
            const matchs = player.name.toLocaleLowerCase().match(search.toLocaleLowerCase()) ?? player.gamertag.toLocaleLowerCase().match(search.toLocaleLowerCase()) 
            console.log(matchs)
            if (!matchs) {
                continue
            }
        }
        const div = document.createElement("div")
        const h1 = document.createElement("h1")
        const p = document.createElement("p")
        h1.textContent = player.name
        p.textContent = player.gamertag
        div.appendChild(h1)
        div.appendChild(p)

        div.addEventListener("click",(ev)=>popup(ev))

        document.body.querySelector("main").appendChild(div)
    }
}

const popup = function(ev) {
    const element = ev.currentTarget
   // const element = document.body.querySelector("main").querySelector("div")
    const name = element.querySelector("h1").textContent
    const gametag = element.querySelector("p").textContent
    const overlay = document.getElementById("overlay")
    
    const h1 = overlay.querySelector("h1")
    const h2 = overlay.querySelector("h2")
    const p = overlay.querySelector("p")
    const a = overlay.querySelector("a")
    h1.textContent = name
    h2.textContent = gametag
    gamertag.forEach((player,index) => {
        if (player.name == name && player.gamertag == gametag) {
            p.textContent = index
            a.onclick = function() {
                navigator.share({
                title: 'ゲーマータグ',
                text: `${name}(${gamertag})`,
                url: `${location.origin}${location.pathname}?id=${index}`
            })
            }
        }
    });
    overlay.style.display = "block"
    
    overlay.querySelector("button").addEventListener("click",(event)=>{ 
        overlay.style.display = "none"
    })
    
}



document.addEventListener("DOMContentLoaded",()=>{
    reload("*")
    document.getElementById("Search").querySelector("input").addEventListener("input",(ev)=>{
        if (ev.target.value) {
            reload(ev.target.value)
        } else {
            reload("*")
        }
    })
    document.getElementById("added").textContent = gamertag.length
    document.getElementById("all").textContent = all
    document.getElementById("nokori").textContent = all - gamertag.length

    const params = new URLSearchParams(window.location.search);

    let obj = {};
    for (const [key, value] of params.entries()) {
    obj[key] = value;
    }
    if (obj.id ?? NaN) {
        gamertag.forEach((player,index) => {
                    if (index == obj.id) {
                    const element = document.createElement("div")
                    const h1 = document.createElement("h1")
                    const p = document.createElement("p")
                    h1.textContent = player.name
                    p.textContent = player.gamertag
                    element.appendChild(h1)
                    element.appendChild(p)
                    document.title = `Gamertags | ${player.name}`
                   popup({"currentTarget":element}) 
                }
        });

}
})
