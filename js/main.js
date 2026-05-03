if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "/html/login.html";
}
console.log("dashboard loaded");

let focus = 0;
let bugs = 0;
let concepts = 0;
let goal = 10;
let body = document.body;

// Views
let focusView = document.getElementById("focusView");
let conceptView = document.getElementById("conceptView");
let bugView = document.getElementById("bugView");
let totalView = document.getElementById("totalView");
let statusView = document.getElementById("statusView");
let progressBar = document.getElementById("progressBar");
let goalView = document.getElementById("goalView");
let levelView = document.getElementById("levelView");
let goalInput = document.getElementById("goalInput");



// Buttons
let focusBtn = document.getElementById("focusBtn");
let bugBtn = document.getElementById("bugBtn");
let conceptBtn = document.getElementById("conceptBtn");
let resetBtn = document.getElementById("resetBtn");
let setGoalBtn = document.getElementById("setGoalBtn");
let themeBtn = document.getElementById("toggleTheme");
let settingsBtn = document.getElementById("settingsBtn");
let settingsPanel = document.getElementById("settingsPanel");
let lightBtn = document.getElementById("lightBtn");
let darkBtn = document.getElementById("darkBtn");
let glowBtn = document.getElementById("glowBtn");
let logOutBtn = document.getElementById("logOutBtn");



// LocalStorage speichern
function saveData() {
    localStorage.setItem("focus", focus);
    localStorage.setItem("bugs", bugs);
    localStorage.setItem("concepts", concepts);
    localStorage.setItem("goal", goal);
}

// localStorage laden
function loadData() {
    let savedFocus = localStorage.getItem("focus");
    let savedBugs = localStorage.getItem("bugs");
    let savedConcepts = localStorage.getItem("concepts");

    let savedGoal = localStorage.getItem("goal");

    if ( savedGoal !== null ) {
        goal = Number(savedGoal)
    }

    if (savedFocus !== null ) {
        focus = Number(savedFocus);
    }
    if ( savedBugs !== null ) {
        bugs = Number(savedBugs);
    }
    if ( savedConcepts !== null ) {
        concepts = Number(savedConcepts);
    }
}

// renderstats funktion
function renderstats() {
    let total = focus + bugs + concepts;

    focusView.textContent = "Focus: " + focus;
    bugView.textContent = "Bugs: " + bugs;
    conceptView.textContent = "Concepts: " + concepts;
    totalView.textContent = "Total : " + total;
    goalView.textContent = "ziel:" + total + " / " + goal;
    
    
    // Status check
    if ( total === 0 ) {
        statusView.textContent = " Session Bereit ";
    } else if (total < 5 ) {
        statusView.textContent = "Warm Up läuft! ";
    } else if (total < 10 ) {
        statusView.textContent = " Stabile Session ";
    } else {
        statusView.textContent = " Maschine ";
    }

    let progress = ( total / goal ) * 100;
    if (progress >= 100 ) {
        progress = 100
        statusView.textContent = "Ziel erreicht!";
    }
    progressBar.style.width = progress + "%";

    // Farbe der statusBar ändern 
    if (progress < 30) {
        progressBar.style.background = "red";
    } else if ( progress < 70 ) {
        progressBar.style.background = "yellow";
    } else {
        progressBar.style.background = "limegreen";
    }

    // Level check

    if (total < 5 ) {
        levelView.textContent = " Beginner ";
    } else if (total < 10 ) {
        levelView.textContent = " Learner ";
    } else if (total < 20 ) {
        levelView.textContent = " Advanced";
    } else {
        levelView.textContent = " Maschine ";
    }

    // Buttons deaktivieren/Aktivieren

    if ( total >= goal ) {
        focusBtn.disabled = true;
        bugBtn.disabled = true;
        conceptBtn.disabled = true;
    } else {
        focusBtn.disabled = false;
        bugBtn.disabled = false;
        conceptBtn.disabled = false;
    }

    // Ziel erreicht check
    if( total >= goal ) {
        levelView.textContent = "Ziel erreicht brudi🔥"
    }
} 

// FocusBtn Event
focusBtn.addEventListener("click", function(e) {
    console.log(e.target);
    focus = focus +1;
    saveData();
    renderstats();
})

// bugBtn event
bugBtn.addEventListener("click", function(e) {
    console.log(e.target);
    bugs = bugs +1;
    saveData();
    renderstats();
})

// concepts Event
conceptBtn.addEventListener("click", function(e) {
    console.log(e.target);
    concepts = concepts + 1;
    saveData();
    renderstats();
})

// resetBtn event
resetBtn.addEventListener("click", function(e) {
    console.log(e.target);
    concepts = 0;
    bugs = 0;
    focus = 0;
    
    saveData();
    renderstats();
})

// Goal eingabe event
setGoalBtn.addEventListener("click", function() {
    let newGoal = Number(goalInput.value);
    if ( newGoal <= 0 || isNaN(newGoal) ) {
        return;
    } else {
        goal = newGoal
    }
    saveData();
    renderstats();
    
});

// Toogle zum verstecken des settings panel
settingsBtn.addEventListener("click", function() {
    settingsPanel.classList.toggle("hidden");
})

// events für die Buttons innerhalb des Setting panels
lightBtn.addEventListener("click", function() {
    body.classList.add("light");
})
darkBtn.addEventListener("click", function() {
    body.classList.remove("light");
})
 
glowBtn.addEventListener("click", function() {
    body.classList.toggle("no-glow");
})


// Event für logOut button
logOutBtn.addEventListener("click", function() {
    localStorage.removeItem("loggedIn", "true");
    window.location.href = "/html/login.html";
})

loadData();
renderstats();
