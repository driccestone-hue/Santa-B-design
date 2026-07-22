const STORAGE_KEY = 'santab_patients';

// Charger les patients
function getPatients() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function savePatients(patients) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
}

// Ajouter un patient
document.getElementById('formPatient').addEventListener('submit', function(e) {
    e.preventDefault();
    const patients = getPatients();
    const newPatient = {
        id: Date.now().toString(),
        nom: document.getElementById('nom').value,
        prenom: document.getElementById('prenom').value,
        age: parseInt(document.getElementById('age').value),
        poids: parseInt(document.getElementById('poids').value),
        antecedents: document.getElementById('antecedents').value,
        allergies: document.getElementById('allergies').value,
        dateEnregistrement: document.getElementById('dateEnregistrement').value,
        enregistrePar: document.getElementById('enregistrePar').value,
        historiqueConsultations: []
    };
    patients.push(newPatient);
    savePatients(patients);
    afficherPatients();
    this.reset();
});

// Afficher les patients
function afficherPatients(filtre = '') {
    const patients = getPatients();
    const liste = document.getElementById('listePatients');
    liste.innerHTML = '';
    const filtered = patients.filter(p => 
        p.nom.toLowerCase().includes(filtre.toLowerCase()) ||
        p.prenom.toLowerCase().includes(filtre.toLowerCase())
    );
    filtered.forEach(p => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
            <h3>${p.prenom} ${p.nom}</h3>
            <p>Âge : ${p.age} ans - Poids : ${p.poids} kg</p>
            <p>Antécédents : ${p.antecedents || 'Aucun'}</p>
            <p>Allergies : ${p.allergies || 'Aucune'}</p>
            <p>Enregistré le : ${p.dateEnregistrement} par ${p.enregistrePar}</p>
            <button onclick="voirHistorique('${p.id}')">Voir historique</button>
        `;
        liste.appendChild(div);
    });
}

// Recherche
document.getElementById('recherche').addEventListener('input', function() {
    afficherPatients(this.value);
});

// Voir historique
function voirHistorique(id) {
    const patients = getPatients();
    const patient = patients.find(p => p.id === id);
    if (!patient) return;
    alert('Historique des consultations :\n' + 
          (patient.historiqueConsultations.length ? 
           patient.historiqueConsultations.join('\n') : 
           'Aucune consultation'));
}

// Initialisation
afficherPatients();