// Global variables
let reminder = 2;
let attempts = document.getElementById("attempts");
let match = 0;
let cardsContainer = document.getElementsByClassName("cards")[0];

// create cards
let icons = [
    "fa-solid fa-heart", "fa-solid fa-heart",
    "fa-solid fa-star", "fa-solid fa-star",
    "fa-solid fa-music", "fa-solid fa-music",
    "fa-solid fa-camera", "fa-solid fa-camera",
    "fa-solid fa-car", "fa-solid fa-car",
    "fa-solid fa-bicycle", "fa-solid fa-bicycle",
    "fa-solid fa-tree", "fa-solid fa-tree",
    "fa-solid fa-bell", "fa-solid fa-bell",
    "fa-solid fa-sun", "fa-solid fa-sun",
    "fa-solid fa-moon", "fa-solid fa-moon"
];
for (let i = 0; i < 20; i++) {
    let randomIndex = Math.floor(Math.random() * icons.length);
    let card = createCard(icons[randomIndex]);
    cardsContainer.appendChild(card);
    icons.splice(randomIndex, 1);
}
showCards();

// Card component
function createCard(icon) {

    let div = document.createElement("div");
    div.classList.add("card");
    div.addEventListener("click",function(){
        if (!this.disabled && !this.classList.contains("show")){
            this.classList.add("show");
            reminder--;
            if (reminder === 0){
                reminder = 2;
                let cards = Array.from(document.getElementsByClassName("show"));
                let icons = Array.from(document.querySelectorAll(".show .back i"));
                setTimeout(()=>{
                    cards[0].classList.remove("show")
                    cards[1].classList.remove("show")
                    if(Array.from(icons[0].classList)[1] === Array.from(icons[1].classList)[1]){ 
                        console.log(match)
                        cards[0].classList.add("match")
                        cards[1].classList.add("match")
                        cards[0].disabled = true;
                        cards[1].disabled = true;
                        match++;
                        (match == 10) ?endGame():null;
                    }
                    else{
                        attempts.innerHTML++;
                    }

                },400)
            }
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

// endGame function 
function endGame(){

}