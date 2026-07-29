// ===========================================
// UI.JS
// NIC Domain Finder
// ===========================================

function displayResult(data){

    const resultSection = document.getElementById("resultSection");
    const suggestionsSection = document.getElementById("suggestionsSection");
    const suggestionsGrid = document.getElementById("suggestionsGrid");

    resultSection.classList.remove("hidden");
    suggestionsSection.classList.add("hidden");

    resultSection.innerHTML = "";
    suggestionsGrid.innerHTML = "";

    let badgeClass = "";

    if(data.reserved){

        badgeClass = "reserved";

    }else if(data.available){

        badgeClass = "available";

    }else{

        badgeClass = "registered";

    }

    // ==========================
    // Traduction du statut
    // ==========================

    let statusText = "-";

    switch(data.status){

        case "available":
            statusText = "Disponible";
            break;

        case "registered":
            statusText = "Déjà enregistré";
            break;

        case "reserved":
            statusText = "Réservé";
            break;

        default:
            statusText = data.status ?? "-";

    }

    // ==========================
    // Texte WHOIS
    // ==========================

    const whoisText = data.available
        ? "Non applicable"
        : "Fiche WHOIS disponible";

    resultSection.innerHTML = `

<div class="result-card fade-in">

    <div class="badge ${badgeClass}">
        ${data.icon} ${data.badge}
    </div>

    <h2 class="domain-title">
        ${data.domain}
    </h2>

    <p class="message">
        ${data.displayMessage}
    </p>

    <div class="info-grid">

        <div class="info-box">
            <h4>Statut</h4>
            <p>${statusText}</p>
        </div>

        <div class="info-box">
            <h4>Source</h4>
            <p>${data.source ?? "NIC Sénégal"}</p>
        </div>

        <div class="info-box">
            <h4>Registrar</h4>
            <p>${data.registrar ?? "NIC Sénégal"}</p>
        </div>

        <div class="info-box">
            <h4>Création</h4>
            <p>${formatDate(data.created)}</p>
        </div>

        <div class="info-box">
            <h4>Expiration</h4>
            <p>${formatDate(data.expires)}</p>
        </div>

        <div class="info-box">
            <h4>WHOIS</h4>
            <p>${whoisText}</p>
        </div>

    </div>

    ${
        data.nameservers && data.nameservers.length
        ?
        `
        <div class="nameservers">

            <h3>Serveurs DNS</h3>

            <ul>

                ${data.nameservers.map(ns=>`<li>${ns}</li>`).join("")}

            </ul>

        </div>
        `
        :
        ""
    }

</div>

`;

    // ==========================
    // Suggestions IA
    // ==========================

    if(data.suggestions && data.suggestions.length){

        suggestionsSection.classList.remove("hidden");

        data.suggestions.forEach(item=>{

            const card=document.createElement("div");

            card.className="suggestion-card fade-in";

            card.innerHTML = `

<div class="suggestion-left">

    <div class="suggestion-domain">
        ${item.domain}
    </div>

    <div class="suggestion-meta">

        <span class="available-dot"></span>

        Disponible • ${
            item.length ??
            item.domain.replace(".sn","").length
        } caractères

    </div>

</div>

<div class="suggestion-actions">

    <button
        class="copy-btn"
        onclick="copy('${item.domain}')">

        📋

    </button>

    <button
        class="test-btn"
        onclick="testSuggestion('${item.domain}')">

        Tester

    </button>

</div>

`;

            suggestionsGrid.appendChild(card);

        });

    }

}