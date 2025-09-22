// const er en variabel jeg bruker mye og det betyr verdien jeg har valgt ikke kan bli tidelt på nytt  
const canvas = document.querySelector("canvas") //henter canvas elementen fra html koden  
const context = canvas.getContext("2d") //setter opp en 2d konekst for canvasen 
console.log(ingangtall)

canvas.width = 1224 //forandrer bredden på canvasen 
canvas.height = 776 //forandrer høyden på canvasen

const barrier = [] //denne setter opp en tom array som skal inneholde en barrier 
for (let i = 0; i < collission.length; i += 70) {
    barrier.push(collission.slice(i, 70 + i))
// denne koden tar collision arraye og deler den op i flere under arrays, de arrayene har 70 elementer, i + 70 gjør sånn at koden hopper over 70 elemnter hver iterasjon. 
// jeg lagde den på denne måten fordi det gjør det lettere å dele sen stor mengde med data, det er bra fordi kolisonsblokkene kommer til å bli vist rad på rad
}

const inganger = []  
for (let i = 0; i < ingangtall.length; i += 70) {
    inganger.push(ingangtall.slice(i, 70 + i))
}

const inganger2 = []  
for (let i = 0; i < ingangtall2.length; i += 70) {
    inganger2.push(ingangtall2.slice(i, 70 + i))
}

console.log(inganger);

class Stopblock {
    static width = 47.2 //determinerer bredden på barrieren 
    static height = 48 //determinerer høyden på på barrieren 
    constructor({position}) {
        this.position = position //setter positonen til den 
        this.width = 5 //gjør bredden på objekte 5 pixeler
        this.height = 5 //gjør høyden på objekte 5 pixeler
    } //hele denne denne representerer kolisjonsblokkene og barrieren og styrer størelsen på den

    draw() {
        context.fillStyle = "rgba(255, 0, 0, 0)" //denne gjør sånn at rektangelet blir gjennomsiktig 
        context.fillRect(this.position.x, this.position.y, this.width, this.height) //denne tegner rektangelen
    } //denne delen stiler koden og gjør sånn at den har riktig form og farge 
}

const boundry = [] //lager en tom array 
const offset = { //lager en offset som jeg kan bruke til å plassere barrierene i specefic positjon 
    x: -200,
    y: -750
}

barrier.forEach((row, i) => {
    row.forEach((Symbol, j) => {
        if (Symbol === 1332) //disse kodenene gjør sånn at hvis collission arrayen er 2658 blir det til en barriere 
        boundry.push(new Stopblock({position: {
            x: j * Stopblock.width + offset.x, y: i * Stopblock.height + offset.y
        }}))
    })
})

const ingang = []

inganger.forEach((row, i) => {
    row.forEach((Symbol, j) => {
        if (Symbol === 1332) 
        ingang.push(new Stopblock({position: {
            x: j * Stopblock.width + offset.x, y: i * Stopblock.height + offset.y
        }}))
    })
})

console.log(ingang)

const ingang2 = []

inganger2.forEach((row, i) => {
    row.forEach((Symbol, j) => {
        if (Symbol === 1332) 
        ingang2.push(new Stopblock({position: {
            x: j * Stopblock.width + offset.x, y: i * Stopblock.height + offset.y
        }}))
    })
})

const image = new Image() //new Image" er en promt som sender bilder gjennom html til javascript  
image.src = "../images/dark fantasy map.png" //denne koden refererer bildet i images foldern og setter den i canvasen

const playerdownImage = new Image() //denne promten er for når karakteren går nedover 
playerdownImage.src = "../images/character sprite - down.png"

const playerupImage = new Image() //denne promten er for karakteren når den går oppover 
playerupImage.src = "../images/character sprite - up.png"

const playerleftImage = new Image() //denne promten er for karakteren når den går mot venstre 
playerleftImage.src = "../images/character sprite – left.png"

const playerrightImage = new Image() //denne promten er for karakteren når den går mot høyre 
playerrightImage.src = "../images/character sprite – right.png"

class Sprite{
    constructor({ position, image, frames = {max: 1}, spriters}) { 
        this.position = position
        this.image = image
        this.frames = {...frames, val: 0, elapsed: 0 }

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
        this.bevegelse = false
        this.spriters = spriters
    }//sprite klassen representerer karakteren og bakgrunnen det gjør det lettere å animere karakteren når bakgrunnen beveger seg 

    draw() {
        context.drawImage( 
            this.image, 
            this.frames.val * this.width,
            0, 
            this.image.width /this.frames.max, this.image.height, 
            this.position.x,
            this.position.y,
            this.image.width /this.frames.max, this.image.height
        )//
        
        if (!this.bevegelse) return 
        if (this.frames.max > 1){this.frames.elapsed++}

        if (this.frames.elapsed % 10 == 0) {
        if (this.frames.val < this.frames.max - 1) this.frames.val++
        else this.frames.val = 0
     }
    } 
}

const player = new Sprite({
    position: {
        x: canvas.width /2 - 384 / 4 / 2, //flytter spilleren til høyere langs x axsen 
        y: canvas.height / 2 - 112 /2 //flytter spilleren ned y axsen 
    },
    image: playerdownImage, //setter ned et bilde av spilleren 
    frames: { 
        max: 4 //setter antall rammer for animasjonen 
    }, //denne gjør sånn at spiller spriten blir croppa og viser bare en av dem
    spriters:{
        up: playerupImage,
        left: playerleftImage,
        right: playerrightImage,
        down: playerdownImage
    }
})
const background = new Sprite ({
    position: {
        x: offset.x,
        y: offset.y //dette flytter bakgrunnen
    },
    image: image
})

const keys = {
    w: {
        pressed: false
    },

    a: {
        pressed: false
    },

    s: {
        pressed: false
    },

    d: {
        pressed: false
    },
}

const fullScreenImage = new Image(); 
fullScreenImage.src = "../images/loading screen.png"; 
let showFullScreenImage = false; 

const nonMovers = [background, ...boundry, ...ingang, ...ingang2]

function threepointedcollision({rectangle, rectangling}) {
    return (
        rectangle.position.x + rectangle.width >= rectangling.position.x && rectangle.position.x <= 
        rectangling.position.x + rectangling.width && rectangle.position.y <= rectangling.position.y + 
        rectangling.height && rectangle.position.y + rectangle.height >= rectangling.position.y
    )//denne gjør sånn at spilleren ikke kan gå på collision boksene 
}

function animation() {
    window.requestAnimationFrame(animation) //denne setter opp animasjonen 
    background.draw() //lager backgrunnen till spille 
    boundry.forEach(Stopblock => { //lager alle barrierene 
        Stopblock.draw()
    })
    ingang.forEach(ingangg => {
        ingangg.draw ()
    })
    ingang2.forEach(ingangg2 => {
        ingangg2.draw ()
    })
 player.draw() //lager karakteren
 
 if (showFullScreenImage) {
    context.drawImage(fullScreenImage, 0, 0, canvas.width, canvas.height);
}

    let moving = true
    player.bevegelse = false
    if (keys.w.pressed && lastKey === "w") { //hvis w tasten var den siste tasten som var trykket beveger karakteren seg fremove
        player.bevegelse = true
        player.image = player.spriters.up
        for (let i = 0; i < boundry.length; i++){ //skjekker kollisjoner som spillerne gjør mot barrierene 
            const Stopblock = boundry[i]
            if (
                threepointedcollision({
                    rectangle: player,
                    rectangling: {...Stopblock, position: { 
                        x: Stopblock.position.x,
                        y: Stopblock.position.y + 3
                    }
                }
                
            })
        ) { 
            moving = false //hvis spilleren treffer collision blokkene stopper den opp
            break
        }
        }

        for (let i = 0; i < ingang.length; i++){ //skjekker kollisjoner som spillerne gjør mot barrierene 
            const ingangg = ingang[i]
            if (
                threepointedcollision({
                    rectangle: player,
                    rectangling: ingangg   
            })
        ) { 
            console.log("ingang colisjon") 
            showFullScreenImage = true; 
            window.location.href = "../html/combatscreen.html";
            break
        }
        }

        for (let i = 0; i < ingang2.length; i++){ //skjekker kollisjoner som spillerne gjør mot barrierene 
            const ingangg2 = ingang2[i]
            if (
                threepointedcollision({
                    rectangle: player,
                    rectangling: ingangg2   
            })
        ) { 
            console.log("ingang colisjon") 
            showFullScreenImage = true; 
            window.location.href = "../html/tavern.html";
            break
        }
        }

        if (moving) //hvis det ikke skjer noe kolisjon fortsetter bevegelsen din 
        nonMovers.forEach((nonMovers) => {
            nonMovers.position.y += 6 //flytter bakgrunnen og barrieren opp 
        })
    }// alt dette i koden gjentas også med S, A og D tastene 
    else if (keys.a.pressed && lastKey === "a") {
        player.bevegelse = true
        player.image = player.spriters.left
        for (let i = 0; i < boundry.length; i++){
            const Stopblock = boundry[i]
            if (
                threepointedcollision({
                    rectangle: player,
                    rectangling: {...Stopblock, position: {
                        x: Stopblock.position.x + 3,
                        y: Stopblock.position.y
                    }
                }
                
            })
        ) { 
            console.log("coliding")
            moving = false
            break
        }
        }
        if (moving)
        nonMovers.forEach((nonMovers) => {
            nonMovers.position.x += 6
        })
    }
    else if (keys.s.pressed && lastKey === "s") {
        player.bevegelse = true
        player.image = player.spriters.down
        for (let i = 0; i < boundry.length; i++){
            const Stopblock = boundry[i]
            if (
                threepointedcollision({
                    rectangle: player,
                    rectangling: {...Stopblock, position: {
                        x: Stopblock.position.x,
                        y: Stopblock.position.y - 3
                    }
                }
                
            })
        ) { 
            console.log("coliding")
            moving = false
            break
        }
        }
        if (moving)
        nonMovers.forEach((nonMovers) => {
            nonMovers.position.y -= 6
        })
    }
    else if (keys.d.pressed && lastKey === "d") {
        player.bevegelse = true
        player.image = player.spriters.right
        for (let i = 0; i < boundry.length; i++){
            const Stopblock = boundry[i]
            if (
                threepointedcollision({
                    rectangle: player,
                    rectangling: {...Stopblock, position: {
                        x: Stopblock.position.x - 3,
                        y: Stopblock.position.y 
                    }
                }
                
            })
        ) { 
            console.log("coliding")
            moving = false
            break
        }
        }
        if (moving)
        nonMovers.forEach((nonMovers) => {
            nonMovers.position.x -= 6
        })
    }
    
}
animation()

let lastKey = ""
window.addEventListener("keydown", (e) => {
    switch (e.key){
        case "w":
            keys.w.pressed = true
            lastKey = "w"
            break
    
        case "a":
            keys.a.pressed = true
            lastKey = "a"
            break
        
        case "s":
            keys.s.pressed = true
            lastKey = "s"
            break

        case "d":
            keys.d.pressed = true
            lastKey = "d"
            break
    }

})

window.addEventListener("keyup", (e) => {
    switch (e.key){
        case "w":
            keys.w.pressed = false
            break
    
        case "a":
            keys.a.pressed = false
            break
        
        case "s":
            keys.s.pressed = false
            break

        case "d":
            keys.d.pressed = false
            break
    }

})


