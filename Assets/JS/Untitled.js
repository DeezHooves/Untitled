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
let lis = document.querySelectorAll("li");
//Don't remove this guy
let keys = {};

// shopInterface.classList.remove("hide")    

tLayer.style.display = "none";
wLayer.style.display = "none";

player.posX = 100;
player.posY = 525;
player.playfield = "world";
player.chatBoxOpen = false;
player.choiceBoxOpen = false;

checker.posX = 400;
checker.posY = 460;
    
// Create inventory for shopkeeper with names, prices, quantity
// create inventory for player


var shopInventory = {
    bomb: {price: 3, qty: 10},
    potion: {price: 35, qty: 5},
    arrow: {price: 5, qty: 50}
}

var playerTacos = 250


var playerInventory = {
    
}


for(var i = 0; i < lis.length; i++){
    lis[i].addEventListener("click", function(){
        if(this == lis[0]){
            //open shop
            shopInterface.classList.remove("hide");
            shopHeader.textContent = "Buying!";
        } else if(this == lis[1]) {
            //open player inventory
            shopInterface.classList.remove("hide");
            shopHeader.textContent = "Selling!";
        } else {
            // close the chatbox
            chatBox.classList.add("hide")
            choiceBox.classList.add("hide")
        }
    })
}


getDistance = function( objA, objB ) {
    var xs = objA.posX - objB.posX,
        ys = objA.posY - objB.posY;
    xs *= xs;
    ys *= ys;    
    return Math.floor(Math.sqrt( xs + ys ));
};

// if player.distance(Ask pythagoras)
// function(player,npc) == distance between two
// if function(1,2) < *** {
//      if key down, e = true, add dialogue box
//}
// create function, taking 2 objects as arguments to find distance (Ask Pythagoras) 

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

// Write a function that checks if the player's distance from the town checker is <= 55
// if(town.style.display == "none"){
//     setInterval(enterTown(), 1000);
// };

// if(world.style.display == "none"){
//     setInterval(function enterWorld(){
//         if(getDistance(player.posX, player.posY,
//             checker.posX, checker.posY) <= 70){
//             checker.posX = 387;
//             checker.posY = 448;
//             checker.style.left = checker.posX + "px";
//             checker.style.top = checker.posY + "px";
//             player.posX = 253;
//             player.posY = 279;
//             player.style.left = player.posX + "px";
//             player.style.top = player.posY + "px";
//             town.classList.add("hide");
//             world.classList.remove("hide");
//             wLayer.classList.remove("hide");
//             tLayer.classList.add("hide");
//         };
//     }, 1000);
// };

// if so, changes the classes on the world map and town maps
// change player location, add npc

// check = function(jeff){
//     keys[event.code] = jeff;
// };

// function(char, num){
//     char.posX = num
// }


document.body.addEventListener("keydown", function(event){
    if(event.code.match(/Arrow/)){
        event.preventDefault();
        keys[event.code] = true;
        // console.log("Key Down!" + event.code);
        // console.log(keys); 
    } else if(event.key.toLowerCase() == "e") {
        if(player.chatBoxOpen) {
            chatBox.classList.add("hide");
            player.chatBoxOpen = false;
        } else if(getDistance(player, shopKeep) <= 55) {
            chatBox.classList.remove("hide")
            choiceBox.classList.remove("hide")
            // if player.chatboxOpen = true
            // 
            chatBox.textContent = "Hey there! What can I help with?";
            player.chatBoxOpen = true;
        }
    }
});

document.body.addEventListener("keyup", function(event){
    if(event.code.match(/Arrow/)){
        keys[event.code] = false;
        // console.log("Key Up!" + event.code)
        // console.log(keys)
    };
});
// Track when pressed and released
    // Have an object, that keeps track of current key status (if one or more is up or down)

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
            //console.log(dist);
            if (dist <= 70) {
                enterTown();
                map = town;
            }
        }
        if (player.playfield == "town") {
            var dist = Math.floor(getDistance(player, checker));
            //console.log(dist);
            if (dist <= 70) {
                enterWorld();
                map = world;
            }
        }
    }
    player.style.left = px(player.posX);
    player.style.top = px(player.posY);

    // scrolling the gameworld within the viewport

    // For each axis (x and y)...
    
    // if the gameworld axis is not as long as the viewport axis, center the gameworld within

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

    // Otherwise:
    //   Set position so that player is centered on axis
    //   BUT constrain so that we don't scroll above where gameworld starts or beyond where gameworld ends


}, 1000/60)

function px(num) {
    return Math.round(num) + "px";
}

// setInterval(function(){
//     if(keys.ArrowLeft){ checker.posX -= 3;}
//     if(keys.ArrowUp){ checker.posY -= 3;}
//     if(keys.ArrowDown){ checker.posY += 3;}
//     if(keys.ArrowRight){ checker.posX += 3;}

//     checker.style.left = checker.posX + "px";
//     checker.style.top = checker.posY + "px";
// }, 1000/60)

// this.addEventListener("keyup", function(event){
//     if(this.event.code === "KeyE"){
//         //initiate dialogue box
//     }
// })

// to interact with npc


