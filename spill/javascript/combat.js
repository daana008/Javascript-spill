// Definer initielle health verdier. 

/* Her er spilleren og fienden direkte definert i koden, 
et tips er å lage en side for oppretting av spiller objektet der du lagrer 
spilleren i localstorage og en json fil der du lagrer mange ulike fiender */



let player = {
    name: "Player",
    items: [{type: "Sword", damage: 15}, {type: "Armor", health: 50}],
    abilities: [
        { name: "slash", damage: 10},
        { name: "pierce", damage: 20},
        { name: "barrage", damage: 30}
    ],
   // health: setPlayerHealth(),
    //maxHealth: health,
    //gold: 0, gull som spilleren kan bruke til å kjøpe gjenstander i en butikk
    health: 0,
    maxHealth: 0,
};

let enemy = {
    name: "Enemy",
    abilities: [
        { name: "fire ball", damage: 20 },
        { name: "chilling grasp", damage: 30 },
        { name: "hellraise", damage: 40},
        {name: "black magic", damage: 50}
        
    ],
    health: 100,
    maxHealth: 100,
    //treasure: 100, antall gull du får for å slå fienden
};

function setPlayerHealth(){
    let baseHealth = 100;

    player.items.forEach((item) => {
        if(item.health){
            baseHealth += item.health
        }
    })
    player.maxHealth = baseHealth;
    player.health = baseHealth
}

function getRandomAbility() {
    let randomIndex = Math.floor(Math.random() * enemy.abilities.length);

    return enemy.abilities[randomIndex];
}

function changePlayerSprite(newSpriteSrc) {
    const playerImg = document.querySelector('.player img');
    const healthBar = document.getElementById('player-health');

    healthBar.style.display = 'none';

    playerImg.src = newSpriteSrc;

    playerImg.style.width = '150%'; 
    playerImg.style.height = 'auto'; 
}


function playerAttack(ability) {

    changePlayerSprite('../images/player slash.gif');  

    enemy.health -= ability.damage;

    updateHealthBars();

    if (enemy.health <= 0) {
        endGame('player');
    } else {
        enemyAttack();
    }

    setTimeout(() => {
        changePlayerSprite('../images/player copy.gif');  
        const playerImg = document.querySelector('.player img');
        playerImg.style.width = '100%';  
        playerImg.style.height = 'auto';  

        const healthBar = document.getElementById('player-health');
        healthBar.style.display = 'block';  
    }, 500);  
}


// Funksjon for fiendens angrep
function enemyAttack() {
    // Definer fiendens angrep, her kan du også legge til mer logikk for å gi fienden flere tilfeldige angrep.
    let attack = getRandomAbility();
    let damage = attack.damage
    
    player.health -= damage;
    
    // oppdater health bar
    updateHealthBars();

    // sjekk om spilleren er slått
    
    if (player.health <= 0) {
        endGame('enemy'); //Fienden vinner
    }
}

// funksjon for å oppdatere health bars
function updateHealthBars() {
    // Oppdater din healthbar
    let playerHealthBarWidth = (player.health <= 0) ? 0 : (player.health * 100 / player.maxHealth); // det her er berre en forenkla syntax på if/else
    document.getElementById('player-health').style.width = playerHealthBarWidth + '%';

    // Oppdater fiendens healthbar
    let enemyHealthBarWidth = (enemy.health <= 0) ? 0 : (enemy.health * 100 / enemy.maxHealth); // det her er berre en forenkla syntax på if/else
    document.getElementById('enemy-health').style.width = enemyHealthBarWidth + '%';
}

// Funksjon som viser vinner
function endGame(winner) {
    if (winner === 'player') {
        window.location.href = "../html/winner.html";
    } else {
        window.location.href = "../html/loser.html";
    }
}

/* Denne funksjonen legger alle tilgjengelige angrepene til spilleren inn i 
containeren slik at spilleren kan bruke angrepene */
function addAttacks(character) {
    let attackContainer = document.getElementById("attack-container");
    attackContainer.innerHTML = "";

    
    character.abilities.forEach(ability => {
        let button = document.createElement("button");
        button.textContent = ability.name;
        button.setAttribute("data-ability", JSON.stringify(ability));
        button.addEventListener("click", function() {
            let abilityData = JSON.parse(this.getAttribute("data-ability"));
            playerAttack(abilityData);
        });
        attackContainer.appendChild(button);
    });
}
// Legg til fleire event listeners for fleire knapper

window.onload = function() {
    setPlayerHealth();
    updateHealthBars();
    addAttacks(player);}

