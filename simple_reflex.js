function reflex_agent(location, stateA, stateB) {
    if (location === "A") {
        if (stateA === "DIRTY") return "CLEAN";
        else return "RIGHT";
    } else if (location === "B") {
        if (stateB === "DIRTY") return "CLEAN";
        else return "LEFT";
    }
}

function randomizeDirty(states) {
    if (Math.random() < 0.5) {
        states[1] = "DIRTY"; // A se ensucia
    } 
    if (Math.random() < 0.5) {
        states[2] = "DIRTY"; // B se ensucia
    }
}

function addUniqueState(states, uniqueStates) {
    const stateStr = states.join(',');
    if (!uniqueStates.includes(stateStr)) {
        uniqueStates.push(stateStr);
        document.getElementById("log").innerHTML += "<br>Se agregó un estado único: " + stateStr;
    }
}

function test(states, uniqueStates) {
    if (uniqueStates.length >= 8) {
        document.getElementById("log").innerHTML += "<br><br>¡Todos los 8 estados únicos han sido alcanzados!";
        return;
    }

    var location = states[0];
    var stateA = states[1];
    var stateB = states[2];
    var action_result = reflex_agent(location, stateA, stateB);
    document.getElementById("log").innerHTML += "<br>Location: ".concat(location).concat(" | Action: ").concat(action_result);
    
    if (action_result === "CLEAN") {
        if (location === "A") states[1] = "CLEAN";
        else if (location === "B") states[2] = "CLEAN";
    } else if (action_result === "RIGHT") {
        states[0] = "B";
    } else if (action_result === "LEFT") {
        states[0] = "A";
    }

    randomizeDirty(states);  // Ensucia aleatoriamente
    addUniqueState(states, uniqueStates);  // Agrega el estado a la lista de estados únicos

    setTimeout(function() { test(states, uniqueStates); }, 2000);
}

var uniqueStates = [];
var states = ["A", "DIRTY", "DIRTY"];
test(states, uniqueStates);
