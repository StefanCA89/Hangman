let word
let triedLetters = ""
let lives = 6
let missingLetters = 0

function setWord() {
    if (document.getElementById("inputField").value == "")
        return
    word = document.getElementById("inputField").value
    splitWord(word)
    document.getElementById("field").innerHTML = ""
    document.getElementById("guessField").innerHTML = '\
    <br>\
    <input type="text" maxlength="1" id="charField" placeholder="Player 2 try letter here">\
    <Button type="submit" id="input2" onclick="tryLetter()">Submit</Button>\
    <div id="lives">Attempts remaining : 6</div>\
    <div id="triedLetters"></div>\
    '
}

function splitWord(word) {
    for (let i = 0; i < word.length; ++i) {
        ++missingLetters
        document.getElementById("btnField").innerHTML += '\
        <button class="btn btn-light" id="'+ i +'">\
        _\
        </button>\
        '
    }
}

function tryLetter() {
    letter = document.getElementById("charField").value
    if (letter == "" || triedLetters.match(letter)) {
        document.getElementById("charField").value = ""
        return
    }
    console.log("made it")
    document.getElementById("charField").value = ""
    let found = false
    for (let i = 0; i < word.length; ++i) {
        if(letter == word[i]) {
            revealBtn(i)
            found = true
            --missingLetters
        }
    }
    if (missingLetters == 0) {
        player2win()
    }
    if (!found) {
        updateLives()
    }
    triedLetters += letter
    document.getElementById("triedLetters").innerHTML = "\
    Letters already tried : "+ triedLetters.split("").join(", ") +"" 
}

function revealBtn(idNr) {
    document.getElementById(idNr).innerHTML = "<u>" +word[idNr]+"</u>"
}

function revealAll() {
    for (let i = 0; i < word.length; ++i) {
        if (document.getElementById(i).innerText == "_") {
            document.getElementById(i).className = "btn btn-danger"
            revealBtn(i)
        }
    }
}

function updateLives() {
    if (lives > 0) {
        --lives
        document.getElementById("hangmanPng").innerHTML = '\
        <img id="hangmanPng" src="images/hangmanlives' + lives + '.png" class="img-fluid"></img>'
        document.getElementById("lives").innerHTML = "Attempts remaining : " + lives + ""
    }
    if (lives == 0) {
        player1win()
    }
}

function player1win() {
    document.getElementById("charField").value = "Player 1 Won"
    document.getElementById("charField").disabled = true
    document.getElementById("input2").disabled = true
    revealAll()
}

function player2win() {
    document.getElementById("hangmanPng").innerHTML = '\
    <img id="hangmanPng" src="images/hangmanwinplayer2.png" class="img-fluid"></img>'
    document.getElementById("charField").value = "Player 2 Won"
    document.getElementById("charField").disabled = true
    document.getElementById("input2").disabled = true
}