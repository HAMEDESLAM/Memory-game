// Global variables
let reminder = 2;
let attempts = document.getElementById("attempts");
let username = document.getElementById("username");
let cardsNumber;
let nameInput ;
let match = 0;
let cardsContainer = document.getElementsByClassName("cards")[0];

// create cards
let icons = [
  "fa-solid fa-heart", "fa-solid fa-star", "fa-solid fa-music", "fa-solid fa-camera",
  "fa-solid fa-car", "fa-solid fa-bicycle", "fa-solid fa-tree", "fa-solid fa-bell",
  "fa-solid fa-sun", "fa-solid fa-moon", "fa-solid fa-cloud", "fa-solid fa-gamepad",
  "fa-solid fa-gift", "fa-solid fa-key", "fa-solid fa-lock", "fa-solid fa-map",
  "fa-solid fa-rocket", "fa-solid fa-user", "fa-solid fa-wifi", "fa-solid fa-phone",
  "fa-solid fa-envelope", "fa-solid fa-lightbulb", "fa-solid fa-flag", "fa-solid fa-book",
  "fa-solid fa-globe", "fa-solid fa-thumbs-up", "fa-solid fa-thumbs-down", "fa-solid fa-home",
  "fa-solid fa-fire", "fa-solid fa-shopping-cart", "fa-solid fa-trash", "fa-solid fa-pen",
  "fa-solid fa-edit", "fa-solid fa-check", "fa-solid fa-times", "fa-solid fa-battery-full",
  "fa-solid fa-battery-half", "fa-solid fa-battery-empty", "fa-solid fa-download",
  "fa-solid fa-upload", "fa-solid fa-search", "fa-solid fa-cog", "fa-solid fa-paperclip",
  "fa-solid fa-play", "fa-solid fa-pause", "fa-solid fa-stop", "fa-solid fa-forward",
  "fa-solid fa-backward", "fa-solid fa-fast-forward", "fa-solid fa-fast-backward",
  "fa-solid fa-volume-up", "fa-solid fa-volume-down", "fa-solid fa-volume-mute",
  "fa-solid fa-microphone", "fa-solid fa-headphones", "fa-solid fa-tv", "fa-solid fa-laptop",
  "fa-solid fa-tablet", "fa-solid fa-mobile", "fa-solid fa-print", "fa-solid fa-calendar",
  "fa-solid fa-clock", "fa-solid fa-hourglass", "fa-solid fa-clipboard", "fa-solid fa-list",
  "fa-solid fa-bars", "fa-solid fa-ellipsis-h", "fa-solid fa-ellipsis-v", "fa-solid fa-exclamation",
  "fa-solid fa-question", "fa-solid fa-info", "fa-solid fa-bug", "fa-solid fa-database",
  "fa-solid fa-server", "fa-solid fa-code", "fa-solid fa-terminal", "fa-solid fa-glasses",
  "fa-solid fa-hat-cowboy", "fa-solid fa-ring", "fa-solid fa-apple-alt", "fa-solid fa-pizza-slice",
  "fa-solid fa-ice-cream", "fa-solid fa-hamburger", "fa-solid fa-hotdog", "fa-solid fa-bacon",
  "fa-solid fa-egg", "fa-solid fa-fish", "fa-solid fa-bread-slice", "fa-solid fa-carrot",
  "fa-solid fa-cheese", "fa-solid fa-pepper-hot", "fa-solid fa-cookie", "fa-solid fa-lemon",
  "fa-solid fa-seedling", "fa-solid fa-tree-palm", "fa-solid fa-cactus", "fa-solid fa-flask",
  "fa-solid fa-stethoscope", "fa-solid fa-syringe", "fa-solid fa-pills", "fa-solid fa-heartbeat",
  "fa-solid fa-dna", "fa-solid fa-user-md", "fa-solid fa-hospital", "fa-solid fa-ambulance"
];
document.querySelector("form").onsubmit = function (e){
    e.preventDefault();
    nameInput = document.getElementById("name").value || "unKnown";
    cardsNumber = parseInt((document.getElementById("cardsNumber").value || 20) / 2);
    username.innerHTML = nameInput;
    let myicons = [];

    for (let i = 0; i < cardsNumber; i++) {
        let randomIndex = Math.floor(Math.random() * icons.length);
        myicons.push(icons[randomIndex]) 
        myicons.push(icons[randomIndex]) 
        icons.splice(randomIndex, 1);
    }

    renderCards(myicons)
    
    this.parentElement.remove()
    showCards();
    
}




// Render Cards
function renderCards(icons){
    let length = icons.length;
    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * icons.length);
        let card = createCard(icons[randomIndex]);
        cardsContainer.appendChild(card);   
        icons.splice(randomIndex, 1);
    }
    
}
// Card component
function createCard(icon) {

    let div = document.createElement("div");
    div.classList.add("card");
    div.addEventListener("click",function(){
        this.classList.add("show");
        let cards = Array.from(document.getElementsByClassName("show"));
        if (cards.length == 2){
            stopClick();

            isMatched(cards)

            clickNormally();
        }

    })
    // face
    let face = document.createElement("div");
    face.classList.add("face");
    let faceIcon = document.createElement("i");
    faceIcon.classList.add("fa-solid","fa-question");
    face.appendChild(faceIcon);

    // back
    let back = document.createElement("div");
    back.classList.add("back");
    let backIcon = document.createElement("i");
    backIcon.classList.add(...icon.split(" "));
    back.appendChild(backIcon);
    
    div.appendChild(face);
    div.appendChild(back);
    return div;
}
// stopClicking
function stopClick(){
    Array.from(document.getElementsByClassName("card")).forEach((card)=>{ 
        card.classList.add("stopClick")
    })
}
// clickNormally
function clickNormally(){
    Array.from(document.getElementsByClassName("card")).forEach((card)=>{
        card.classList.remove("stopClick")
    })
}
// isMatched
function isMatched(cards){
    let icons = Array.from(document.querySelectorAll(".show .back i"));

    if(Array.from(icons[0].classList)[1] === Array.from(icons[1].classList)[1]){ 
        cards[0].classList.remove("show")
        cards[1].classList.remove("show")
        cards[0].classList.add("match")
        cards[1].classList.add("match")
        document.getElementById("success").play()
        match++;
        (match == cardsNumber) ?endGame():null;
    }
    else{
        document.getElementById("fail").play()
        setTimeout(()=>{
            cards[0].classList.remove("show")
            cards[1].classList.remove("show")
        },400)
        attempts.innerHTML++;
    }
}
// show Cards
function showCards(){
    let cards = Array.from(document.getElementsByClassName("card"));
    let promis = new Promise((resolve,reject)=>{
        setTimeout(()=>{
            cards.forEach((card)=>{
                card.classList.add("show")
            })
            resolve()
        },500)
    }).then(()=>{
        setTimeout(()=>{
            cards.forEach((card)=>{
                card.classList.remove("show")
            })
        },700)
    })

    
}

function leaderBoardRender(){
    let dataObject = JSON.parse(localStorage.getItem("data"));
    if(dataObject){
        let keys = Array.from(Object.entries(dataObject).sort((a,b)=> b[1] - a[1]).reverse());
        let leaderBoardRows = document.getElementsByClassName("leaderBoard-rows")[0];
        keys.forEach(
            (el)=>{
                let li = document.createElement("li");
                let span1 = document.createElement("span")
                el[0] = el[0].toLowerCase();
                el[0] = el[0].charAt(0).toUpperCase() + el[0].slice(1)
                span1.innerHTML = `${el[0]}`;

                let span2 = document.createElement("span")
                span2.innerHTML = `Attempts: `;
                let span3 = document.createElement("span")
                span3.innerHTML = `${el[1]}`;
                span2.appendChild(span3)

                li.appendChild(span1)
                li.appendChild(span2)
                leaderBoardRows.appendChild(li) 
            }
        )
        document.getElementsByClassName("leaderBoard")[0].classList.add("show")
    }
}
// endGame function 
function endGame(){
    document.getElementsByClassName("endGame")[0].classList.add("show");
    document.getElementById("attemptsShow").innerHTML = attempts.innerHTML;
    document.querySelector(".endGame button").onclick = function(){
        location.reload();
    }
    saveData(nameInput,+attempts.innerText)

}
// saveData
function saveData(name,attempts){
    let dataObject = JSON.parse(localStorage.getItem("data"));
    name = name.toUpperCase();
    
    if(dataObject){
        let preattempts = dataObject[`${name}`] || 0;
        attempts = Math.min(attempts,preattempts);
        dataObject[`${name}`] = attempts;
        localStorage.setItem("data",JSON.stringify(dataObject));
    }
    else{
        dataObject = {}
        dataObject[`${name}`] = attempts;
        localStorage.setItem("data",JSON.stringify(dataObject));
    }
}
