
function buyItem(item){
    // CHECK IF player has the item
    if(playerInventory[item]){
        // if so, add 1 to qty
        playerInventory[item] += 1;
    } else {
        // if not, add the item to the iventory
        playerInventory[item] = 1;
    }
    shopInventory[item] - 1;
    var message = `Thanks for the ${item}!!`;
    shopMessage.innerHTML = message;
    playerCurrentTacos.textContent = playerTacos;
};

function sellItem(item){
    // CHECK IF player has the item
    if(playerInventory[item]){
        // if so, subtract 1 from qty
        playerInventory[item] -= 1;
    } else {

    }
    shopInventory[item] + 1;
    var message = `Thanks for the ${item}!!`;
    shopMessage.innerHTML = message;
    playerCurrentTacos.textContent = playerTacos;
};

// function shopUpdate(){
//     var message = `Thanks for the ${item}!!`;
//     shopMessage.innerHTML = message;
//     playerCurrentTacos.textContent = playerTacos;
// }

//abstraction