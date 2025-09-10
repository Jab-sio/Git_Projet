function sendPrompt() {
    const prompt = document.getElementById('userPrompt').value;
    if (!prompt) return; // Ne rien faire si le champ est vide

    const storyZone = document.getElementById('storyZone');
    storyZone.innerText = "Génération en cours...";

    fetch('/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt })
    })
    .then(response => response.json())
    .then(data => {
        storyZone.innerText = data.story;
    });
}

function sendPreset(presetText) {
    const storyZone = document.getElementById('storyZone');
    storyZone.innerText = "Génération en cours...";

    fetch('/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: presetText })
    })
    .then(response => response.json())
    .then(data => {
        storyZone.innerText = data.story;
    });
}
// Fonction pour créer et ajouter un bouton de prompt à la page
function addPresetToDOM(title, promptText) {
    const presetButtons = document.querySelector('.preset-buttons');
    const newPreset = document.createElement('div');
    newPreset.className = 'preset custom-preset';
    newPreset.setAttribute('onclick', `sendPreset('${promptText.replace(/'/g, "\\'")}')`);
    
    // Ajout d'une icône pour les prompts personnalisés (ici, un simple cercle)
    const icon = document.createElement('div');
    icon.className = 'custom-preset-icon';
    newPreset.appendChild(icon);

    const p = document.createElement('p');
    p.innerText = title;
    newPreset.appendChild(p);

    presetButtons.appendChild(newPreset);
}

// Gestion du clic sur le bouton "Ajouter"
document.getElementById('addPreset').addEventListener('click', () => {
    // Demande à l'utilisateur un titre et un prompt via des boîtes de dialogue
    const title = prompt("Veuillez entrer un titre pour votre nouveau prompt :");
    if (!title) return; // Annule si l'utilisateur ne rentre pas de titre

    const promptText = prompt("Veuillez entrer le texte de votre prompt :");
    if (!promptText) return; // Annule si le prompt est vide

    // Sauvegarde le nouveau prompt dans le stockage local
    const userPresets = JSON.parse(localStorage.getItem('userPresets') || '[]');
    userPresets.push({ title: title, prompt: promptText });
    localStorage.setItem('userPresets', JSON.stringify(userPresets));

    // Ajoute le nouveau bouton à la page
    addPresetToDOM(title, promptText);
});

// Charge les prompts au chargement de la page
window.onload = loadUserPresets;

document.getElementById('addPreset').addEventListener('click', () => {
    alert("Fonction d'ajout personnalisée à implémenter !");
});