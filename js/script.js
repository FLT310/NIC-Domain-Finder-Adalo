// ===========================================
// SCRIPT.JS
// NIC Domain Finder
// ===========================================

const input = document.getElementById("domainInput");
const clearSearchBtn =
document.getElementById("clearSearchBtn");

// Afficher la croix uniquement lorsqu'il y a du texte

input.addEventListener("input",()=>{

    clearSearchBtn.style.display =
    input.value.trim() ? "block" : "none";

});

// Réinitialiser la recherche

clearSearchBtn.addEventListener("click",()=>{

    input.value = "";

    clearSearchBtn.style.display = "none";

    document.getElementById("resultSection").innerHTML = "";

    document.getElementById("resultSection")
    .classList.add("hidden");

    document.getElementById("suggestionsGrid").innerHTML = "";

    document.getElementById("suggestionsSection")
    .classList.add("hidden");

    input.focus();

});


const button = document.getElementById("searchBtn");

// -------------------------------
// Recherche
// -------------------------------

button.addEventListener("click", launchSearch);

input.addEventListener("keydown", function(e){

    if(e.key === "Enter"){

        launchSearch();

    }

});

async function launchSearch(){

    const value = input.value.trim();

    if(value === ""){

        showToast("Veuillez saisir un domaine.");

        return;

    }

    const loader = document.getElementById("loader");

    loader.classList.remove("hidden");

    document.getElementById("resultSection").classList.add("hidden");

    document.getElementById("suggestionsSection").classList.add("hidden");

    try{

        const data = await searchDomain(value);

        displayResult(data);

       updateDashboard(value, data.available);

        saveHistory(value);

    }

    catch(error){

        console.error(error);

        showToast("Erreur de connexion avec le serveur.");

    }

    finally{

        loader.classList.add("hidden");

    }

}

// -------------------------------
// Tester une suggestion
// -------------------------------

function testSuggestion(domain){

    input.value = domain.replace(".sn","");

    launchSearch();

}

// -------------------------------
// Chargement
// -------------------------------

window.addEventListener("DOMContentLoaded", function(){

    loadDashboard();

    renderHistory();

});
// ==========================================
// Réinitialisation complète
// ==========================================

const clearBtn = document.getElementById("clearHistoryBtn");

if(clearBtn){

    clearBtn.addEventListener("click", function(){

        const confirmation = confirm(
            "Voulez-vous vraiment réinitialiser toutes les recherches ?"
        );

        if(!confirmation){

            return;

        }

        // -----------------------------
        // Suppression des données
        // -----------------------------

        localStorage.removeItem("history");

        localStorage.removeItem("searchCount");

        localStorage.removeItem("lastSearch");

        localStorage.removeItem("availableCount");

        // -----------------------------
        // Remise à zéro des cartes
        // -----------------------------

        document.getElementById("searchCount").textContent = "0";

        document.getElementById("lastSearch").textContent = "-";

        const available =
        document.getElementById("availableCount");

        if(available){

            available.textContent = "0";

        }

        // -----------------------------
        // Effacement des résultats
        // -----------------------------

        document.getElementById("resultSection").innerHTML = "";

        document.getElementById("resultSection")
        .classList.add("hidden");

        document.getElementById("suggestionsGrid")
        .innerHTML = "";

        document.getElementById("suggestionsSection")
        .classList.add("hidden");

        // -----------------------------
        // Champ de recherche
        // -----------------------------

        document.getElementById("domainInput").value = "";

        // -----------------------------
        // Historique
        // -----------------------------

        renderHistory();

        showToast("Toutes les recherches ont été réinitialisées.");

    });

}


