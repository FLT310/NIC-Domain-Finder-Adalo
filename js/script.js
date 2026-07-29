// ===========================================
// SCRIPT.JS
// NIC Domain Finder
// Version Adalo
// ===========================================

const input = document.getElementById("domainInput");
const button = document.getElementById("searchBtn");
const clearSearchBtn = document.getElementById("clearSearchBtn");

// ===========================================
// Afficher / masquer la croix
// ===========================================

input.addEventListener("input", () => {

    clearSearchBtn.style.display =
        input.value.trim() ? "block" : "none";

});

// ===========================================
// Réinitialiser la recherche actuelle
// ===========================================

clearSearchBtn.addEventListener("click", () => {

    input.value = "";

    clearSearchBtn.style.display = "none";

    document.getElementById("resultSection").innerHTML = "";
    document.getElementById("resultSection").classList.add("hidden");

    document.getElementById("suggestionsGrid").innerHTML = "";
    document.getElementById("suggestionsSection").classList.add("hidden");

    input.focus();

});

// ===========================================
// Lancer la recherche
// ===========================================

button.addEventListener("click", launchSearch);

input.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {

        launchSearch();

    }

});

async function launchSearch() {

    const value = input.value.trim();

    if (value === "") {

        showToast("Veuillez saisir un domaine.");

        return;

    }

    const loader = document.getElementById("loader");

    loader.classList.remove("hidden");

    document.getElementById("resultSection").classList.add("hidden");
    document.getElementById("suggestionsSection").classList.add("hidden");

    try {

        const data = await searchDomain(value);

        displayResult(data);

        saveHistory(value);

    }

    catch (error) {

        console.error(error);

        showToast("Erreur de connexion avec le serveur.");

    }

    finally {

        loader.classList.add("hidden");

    }

}

// ===========================================
// Tester une suggestion
// ===========================================

function testSuggestion(domain) {

    input.value = domain.replace(".sn", "");

    launchSearch();

}

// ===========================================
// Chargement
// ===========================================

window.addEventListener("DOMContentLoaded", function () {

    renderHistory();

});

// ===========================================
// Réinitialiser tout l'historique
// ===========================================

const clearBtn = document.getElementById("clearHistoryBtn");

if (clearBtn) {

    clearBtn.addEventListener("click", function () {

        const confirmation = confirm(
            "Voulez-vous vraiment supprimer tout l'historique ?"
        );

        if (!confirmation) {

            return;

        }

        // Historique

        localStorage.removeItem("history");

        // Résultats

        document.getElementById("resultSection").innerHTML = "";
        document.getElementById("resultSection").classList.add("hidden");

        // Suggestions

        document.getElementById("suggestionsGrid").innerHTML = "";
        document.getElementById("suggestionsSection").classList.add("hidden");

        // Champ

        input.value = "";

        clearSearchBtn.style.display = "none";

        // Historique

        renderHistory();

        showToast("Historique supprimé.");

    });

}