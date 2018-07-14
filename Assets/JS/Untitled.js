 // alert("Connected!")

const player = document.querySelector("#player");
const town = document.querySelector("#town");
const tLayer = document.querySelector("#townLayer");
const checker = document.querySelector("#checker");
const world = document.querySelector("#world");
const wLayer = document.querySelector("#worldLayer");
const gameWorld = document.querySelector("#gameWorld");
const viewport = document.querySelector("#viewport");
const shopKeep = document.querySelector("#shopKeep");
const shopInterface = document.querySelector("#shopInterface");
const shopHeader = document.querySelector("#shopHeader");
const shopList = document.querySelector("#shopList");
const shopPricing = document.querySelector("#shopPricing");
const shopOptions = document.querySelector("#shopOptions");
const shopMessage = document.querySelector("#shopbees");
let buySell = document.querySelectorAll("h2 + ul li");
let enterCancel = document.querySelectorAll("h3 + ul li");
let shopItemName = document.querySelector("#shopItemName")
let shopItemPrice = document.querySelector("#shopItemPrice")
let playerCurrentTacos = document.querySelector("#playerCurrentTacos")
//Don't remove this guy
let keys = {};


tLayer.style.display = "none";
wLayer.style.display = "none";

player.posX = 100;
player.posY = 525;
player.playfield = "world";
player.chatBoxOpen = false;
player.choiceBoxOpen = false;

checker.posX = 400;
checker.posY = 460;

var shopInventory = {
    bomb: {price: 85, qty: 10},
    potion: {price: 35, qty: 5},
    arrow: {price: 5, qty: 50}
}

var playerTacos = 250

var playerInventory = {
    
}

getDistance = function( objA, objB ) {
    var xs = objA.posX - objB.posX,
        ys = objA.posY - objB.posY;
    xs *= xs;
    ys *= ys;    
    return Math.floor(Math.sqrt( xs + ys ));
};

function enterTown() {
    player.playfield = "town";
    checker.posX = 72;
    checker.posY = 424;
    checker.style.left = checker.posX + "px";
    checker.style.top = checker.posY + "px";
    player.posX = 316;
    player.posY = 426;
    player.style.left = player.posX + "px";
    player.style.top = player.posY + "px";
    world.classList.add("hide");
    town.classList.remove("hide");
    wLayer.classList.add("hide");
    tLayer.classList.remove("hide");
    shopKeep.classList.remove("hide")
    shopKeep.posX = 855;
    shopKeep.posY = 285;
    shopKeep.style.left = shopKeep.posX + "px";
    shopKeep.style.top = shopKeep.posY + "px";
};

function enterWorld() {
    player.playfield = "world"
    checker.posX = 387;
    checker.posY = 448;
    checker.style.left = checker.posX + "px";
    checker.style.top = checker.posY + "px";
    player.posX = 253;
    player.posY = 279;
    player.style.left = player.posX + "px";
    player.style.top = player.posY + "px";
    town.classList.add("hide");
    world.classList.remove("hide");
    wLayer.classList.remove("hide");
    tLayer.classList.add("hide");
    shopKeep.classList.add("hide")    
}

document.body.addEventListener("keydown", function(event){
    if(event.code.match(/Arrow/)){
        event.preventDefault();
        keys[event.code] = true;
    } else if(event.key.toLowerCase() == "e") {
        if(player.chatBoxOpen) {
            chatBox.classList.add("hide");
            player.chatBoxOpen = false;
        } else if(getDistance(player, shopKeep) <= 55) {
            chatBox.classList.remove("hide")
            choiceBox.classList.remove("hide")
            buySellLoop()
            chatBox.textContent = "Hey there! What can I help with?";
            player.chatBoxOpen = true;
        }
    }
});

document.body.addEventListener("keyup", function(event){
    if(event.code.match(/Arrow/)){
        keys[event.code] = false;
    };
});

setInterval(function(){
    var deltaX = 0, deltaY = 0;
    if(keys.ArrowLeft){ deltaX -= 3;}
    if(keys.ArrowUp){ deltaY -= 3;}
    if(keys.ArrowDown){ deltaY += 3;}
    if(keys.ArrowRight){ deltaX += 3;}

    // This is the map that the player is currently on
    var map = world;
    if (player.playfield == "town") {map = town;}

    if ((deltaX != 0) || (deltaY != 0)) {
        player.posX += deltaX;
        player.posY += deltaY;

        player.posX = Math.max(0, player.posX);
        player.posX = Math.min(map.offsetWidth, player.posX);
        player.posY = Math.max(0, player.posY);
        player.posY = Math.min(map.offsetHeight, player.posY);

        if (player.playfield == "world") {
            var dist = Math.floor(getDistance(player, checker));
            if (dist <= 70) {
                enterTown();
                map = town;
            }
        }
        if (player.playfield == "town") {
            var dist = Math.floor(getDistance(player, checker));
            if (dist <= 70) {
                enterWorld();
                map = world;
            }
        }
    }
    player.style.left = px(player.posX);
    player.style.top = px(player.posY);

    if (map.offsetWidth < viewport.offsetWidth){
        gameWorld.style.left = px((map.offsetWidth - viewport.offsetWidth)/-2);
    } else {
        var x = viewport.offsetWidth/2 - player.posX;
        x = Math.min(0, x);
        x = Math.max(viewport.offsetWidth - map.offsetWidth, x);
        gameWorld.style.left = px(x);
    }

    if (map.offsetHeight < viewport.offsetHeight){
        gameWorld.style.top = px((map.offsetHeight - viewport.offsetHeight)/-2);
    } else {
        var y = viewport.offsetHeight/2 - player.posY;
        y = Math.min(0, y);
        y = Math.max(viewport.offsetHeight - map.offsetHeight, y);
        gameWorld.style.top = px(y);
    }

    if (getDistance(player, shopKeep) <= 55) {
        
    }


}, 1000/60)

function px(num) {
    return Math.round(num) + "px";
}

function hideBoxes(){
    chatBox.classList.add("hide")
    choiceBox.classList.add("hide")
}

function buySellLoop(){
    for(var i = 0; i < buySell.length; i++){
        buySell[i].addEventListener("click", function(){
            if(this == buySell[0]){
                //open shop
                hideBoxes();
                enterCancelLoop();
                // shopInterface.classList.add("flex")
                // shopHeader.classList.add("flex")
                // shopPricing.classList.add("flex")
                shopInterface.classList.remove("hide");
                playerCurrentTacos.textContent = playerTacos
                shopHeader.textContent = "Buying!";
                shopList.innerHTML = "";
                for(var item in shopInventory) {
                    // create an element for each item, and instert that into the list 
                    var li = document.createElement("li");
                    li.innerHTML = item;
                    li.itemtype = item;
                    shopList.appendChild(li);
                    li.addEventListener("click", function(event){
                        selectShopItem(event.target)
                    })
                }
                var firstli = document.querySelector("ol#shopList li")
                // firstli.classList.add("selected")
                selectShopItem(firstli)
                
            } else if(this == buySell[1]) {
                //open player inventory
                hideBoxes();
                enterCancelLoop();
                playerCurrentTacos.textContent = playerTacos
                shopInterface.classList.remove("hide");
                shopHeader.textContent = "Selling!";
            } else {
                // close the chatbox
                hideBoxes();
            }
        })
    }
}

function enterCancelLoop(){
    for(var i = 0; i < enterCancel.length; i++){
        enterCancel[i].addEventListener("click", function(){
            if(this == enterCancel[0]){
                // run logic to process transaction
                console.log("Order processing!");
                // when enter is selected, run price of selected item against playertacos,
                // if player has enough tacos, let them purchase the item
                // else give an error message
            } else {
                shopInterface.classList.add("hide");
            }
        })
    }
}

function selectShopItem(li){
    var multiLis = document.querySelectorAll("ol#shopList li")
    multiLis.forEach(function(foo){
        foo.classList.remove("selected");
    })
    li.classList.add("selected");
    shopItemName.innerHTML = li.itemtype;
    shopItemPrice.innerHTML = shopInventory[li.itemtype].price;
}
