var tak = 0
var nie = 0
async function getData(){
    const data = await fetch(`http://localhost:3001/select`)
    const json = await data.json()
    console.log(json)

    document.getElementById('zadania').innerHTML = " "
    
    for(var i=0;i<=json.length-1;i++){

        const div = document.createElement("div")
        div.classList.add("todo")

        const nazwa = document.createElement("h1")
        nazwa.innerHTML = json[i].nazwa
        div.appendChild(nazwa)

        const termin = document.createElement("p")
        termin.innerHTML = json[i].termin
        div.appendChild(termin)
        
        const wykonanie = document.createElement("input")
        wykonanie.innerHTML = json[i].czywykonane
        wykonanie.setAttribute("type", 'checkbox')
        if(json[i].czywykonane==1){
            wykonanie.setAttribute("checked", "true")
            wykonanie.setAttribute("onchange", `zmiennafalse("${json[i].nazwa}")`)
            tak = tak + 1
        }
        if(json[i].czywykonane!=1){
            wykonanie.setAttribute("onchange", `zmiennatrue("${json[i].nazwa}")`)
            nie = nie + 1
        }
        div.appendChild(wykonanie)

        const usun = document.createElement("button")
        usun.innerHTML = "Usuń zadanie"
        usun.setAttribute("onclick", `usun("${json[i].nazwa}")`)
        div.appendChild(usun)

        document.getElementById("zadania").appendChild(div)
    }
}

getData()

async function dodaj(){
    const nazwa = document.getElementById("nazwa").value
    const czywykonane = document.getElementById("czywykonane").value
    const termin = document.getElementById("termin").value
   
    console.log(nazwa)
    console.log(termin)
    console.log(czywykonane)

    const url = `http://localhost:3001/add/${nazwa}/${czywykonane}/${termin}`

    const data = await fetch(url)

    getData()
}

async function usun(name){
    const url = `http://localhost:3001/remove/${name}`
    const data = await fetch(url)
    
    getData()
}

async function zmiennatrue(name){
    const url = `http://localhost:3001/updatetrue/${name}`
    const data = await fetch(url)
    
    getData()
}
async function zmiennafalse(name){
    const url = `http://localhost:3001/updatefalse/${name}`
    const data = await fetch(url)
    
    getData()
}