const game = document.getElementById("word-container");

const fruits = [
    "Acerola",
    "Banana",
    "Laranja",
    "Morango",
    "Uva",
    "Abacaxi",
    "Melancia",
    "Abacate",
    "Caju",
    "Kiwi",
    "Pera"
];


const usedLetters = []
const player = {
    life: 5,
    points: 0
}


const fruit = randomFruit().toUpperCase()
wordTemplateGenerate(fruit);

function addLetter(letter){
    if ( usedLetters.includes(letter)){
        console.log('usou')
        return
    }

    if ( fruit.includes(letter)) {
        usedLetters.push(letter)
        fruit.split('').forEach( (letterFruit, index) => {
            if (letterFruit === letter) {
                let newLetter = document.createElement("div");
                let keyboardLetter = document.getElementById(letter)
                keyboardLetter.classList.add("chosen")
                newLetter.classList.add("letter")
                newLetter.innerHTML = letter;
                console.log(index)
                console.log(game.children[index])
                game.children[index+1].innerHTML = letter
                player.points++
                if (player.points === fruit.length) {
                    gameOver("win")
                }
            }
        })
    }
    else {
        let keyboardLetter = document.getElementById(letter);
        if (hasLife(player.life)) {
            removeLife()
            keyboardLetter.classList.add("wrong")
            usedLetters.push(letter)
            if ( player.life === 0) {
                gameOver("lose")
            }
        }

    }
}

//Gerar um espaço de letra
function addLetterBox(){
    let newLetter = document.createElement("div");
    newLetter.classList.add("letter");
    game.appendChild(newLetter);
}

//Escolher uma fruta aleatória
function randomFruit(){
    const fruitIndex = Math.floor(Math.random() * fruits.length);
    return fruits[fruitIndex];
}

//Gerar o template da palavra
function wordTemplateGenerate(word){
    const length = word.length;
    for(let i = 0; i < length; i++){
        addLetterBox();
    }
}

//Verificar vida
function hasLife(value){
    return value > 0
}

//Remover coração
function removeLife(){
    const lifeIcon = document.getElementById("heart-container");
    lifeIcon.removeChild(document.getElementById("heart-container").lastElementChild)
    player.life--
}


//Fim de jogo
function gameOver(resul){
    openDialog(resul)
}

// Função para abrir o diálogo
function openDialog(result) {
    const dialog = document.getElementById('myDialog');
    if (result === "win") {
        dialog.children[1].innerHTML = `Você venceu!`;
    }
    else {
        dialog.children[1].innerHTML = `Você perdeu! A palavra era ${fruit}`;
    }
    dialog.showModal(); // Abrir o diálogo
}

// Função para fechar o diálogo
function closeDialog() {
    console.log('oi')
    const dialog = document.getElementById('myDialog');
    dialog.close();
    location.reload() // Fechar o diálogo
}