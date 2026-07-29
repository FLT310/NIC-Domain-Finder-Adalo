// ===========================================
// API.JS
// NIC Domain Finder
// ===========================================

async function searchDomain(domain){

    // Nettoyage de la saisie
    domain = domain.trim().toLowerCase();

    // Retire .sn si l'utilisateur le tape
    domain = domain.replace(/\.sn$/i,"");

    // URL finale
    const url =
        CONFIG.API_URL +
        "?domain=" +
        encodeURIComponent(domain);

    console.log("📡 Requête :", url);

    const response = await fetch(url,{
        method:"GET",
        headers:{
            "Accept":"application/json"
        }
    });

    if(!response.ok){

        throw new Error("Erreur HTTP " + response.status);

    }

    const data = await response.json();

    console.log("📦 Réponse API :", data);

    if(!data.success){

        throw new Error(data.error || data.message);

    }

    return data;

}

