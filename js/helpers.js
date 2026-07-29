// ===========================================
// HELPERS.JS
// NIC Domain Finder
// ===========================================

// ---------------------------
// Format de date
// ---------------------------

function formatDate(date){

    if(!date) return "-";

    try{

        return new Date(date).toLocaleDateString("fr-FR",{

            day:"2-digit",
            month:"long",
            year:"numeric"

        });

    }

    catch{

        return "-";

    }

}

// ---------------------------
// Copier dans le presse-papiers
// ---------------------------

async function copy(text){

    try{

        await navigator.clipboard.writeText(text);

        showToast("✔ Domaine copié");

    }

    catch{

        showToast("Impossible de copier");

    }

}

// ---------------------------
// Toast
// ---------------------------

function showToast(message){

    const toast=document.createElement("div");

    toast.className="toast";

    toast.textContent=message;

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.classList.add("toast-show");

    },30);

    setTimeout(()=>{

        toast.remove();

    },2500);

}

// ---------------------------
// Historique
// ---------------------------

function saveHistory(domain){

    let history=JSON.parse(localStorage.getItem("history")||"[]");

    history=history.filter(item=>item!==domain);

    history.unshift(domain);

    if(history.length>10){

        history=history.slice(0,10);

    }

    localStorage.setItem("history",JSON.stringify(history));

    renderHistory();

}

function renderHistory(){

    const container=document.getElementById("historyContainer");

    if(!container) return;

    const history=JSON.parse(localStorage.getItem("history")||"[]");

    if(history.length===0){

        container.innerHTML="<p>Aucune recherche.</p>";

        return;

    }

    container.innerHTML="";

    history.forEach(domain=>{

        const div=document.createElement("div");

        div.className="history-item";

        div.innerHTML=`

            <span>${domain}</span>

            <button onclick="testSuggestion('${domain}')">

                Rechercher

            </button>

        `;

        container.appendChild(div);

    });

}