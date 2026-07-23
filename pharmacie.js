const medicaments = [
  { nom: "Paracétamol / Dafalgan", utilite: "Traitement de la fièvre et des douleurs modérées (maux de tête, courbatures)", maladies: ["Paludisme", "Grippe / Infection"], precautions: "Ne pas dépasser 4g par jour chez l'adulte. Respecter un intervalle d'au moins 6 heures entre les prises." },
  { nom: "Arteméther-Luméfantrine (Coartem)", utilite: "Traitement de première ligne du paludisme simple.", maladies: ["Paludisme"], precautions: "À prendre avec un repas gras pour une bonne absorption. Déconseillé au 1er trimestre de grossesse." },
  { nom: "Amoxicilline", utilite: "Antibiotique pour les infections bactériennes (angines, infections respiratoires, dentaires)", maladies: ["Infection bactérienne", "Angine"], precautions: "Suivre le traitement jusqu'au bout même si les symptômes disparaissent rapidement." },
  { nom: "Spasfon (Phloroglucinol)", utilite: "Crises douloureuses spasmodiques (maux de ventre, douleurs intestinales ou règles douloureuses)", maladies: ["Douleurs abdominales", "Spasmes"], precautions: "Éviter l'automédication prolongée si la douleur persiste sans diagnostic." },
  { nom: "Ibuprofène", utilite: "Anti-inflammatoire et antalgique pour les douleurs intenses et l'inflammation", maladies: ["Inflammation", "Douleurs articulaires"], precautions: "À prendre impérativement au cours d'un repas. Déconseillé en cas d'ulcère à l'estomac ou de grossesse." },
  { nom: "Quinine (Comprimés)", utilite: "Traitement du paludisme simple ou grave", maladies: ["Paludisme grave"], precautions: "Respecter scrupuleusement la posologie pour éviter les bourdonnements d'oreilles et les étourdissements." },
  { nom: "Albendazole / Flubenazole", utilite: "Vermifuge pour l'élimination des parasites et vers intestinaux", maladies: ["Parasites intestinaux"], precautions: "Souvent pris en dose unique, parfois à renouveler après 2 semaines selon l'avis médical." },
  { nom: "SRO (Sels de Réhydratation Orale)", utilite: "Prévention et traitement de la déshydratation en cas de diarrhées ou gastro-entérite", maladies: ["Diarrhée", "Gastro-entérite"], precautions: "À diluer entièrement dans un litre d'eau potable. Jeter le mélange après 24 heures." },
  { nom: "Oméprazole", utilite: "Protection gastrique, traitement des brûlures d'estomac et des ulcères", maladies: ["Brûlures d'estomac", "Ulcère"], precautions: "À prendre de préférence le matin à jeun, 30 minutes avant le premier repas." },
  { nom: "Ciprofloxacine", utilite: "Antibiotique pour les infections urinaires et intestinales sévères", maladies: ["Infection urinaire"], precautions: "Éviter l'exposition directe au soleil pendant toute la durée du traitement." }
];

const pharmacies = {
  ouagadougou: [
    { nom: "Pharmacie du Centre", quartier: "Centre-ville (Avenue Kwame N'Krumah)", tel: "25 30 19 39" },
    { nom: "Pharmacie de la Paix", quartier: "Koulouba", tel: "25 31 03 67" },
    { nom: "Pharmacie Suka", quartier: "Pissy", tel: "25 43 02 86" }
  ],
  bobo: [
    { nom: "Pharmacie Ségbé", quartier: "Koko", tel: "20 97 20 54" },
    { nom: "Pharmacie de la Haute-Comoé", quartier: "Centre-ville", tel: "20 97 00 23" }
  ],
  koudougou: [
    { nom: "Pharmacie Centrale de Koudougou", quartier: "Secteur 2", tel: "40 55 00 32" },
    { nom: "Pharmacie Wend-Panga", quartier: "Secteur 4", tel: "40 55 05 12" }
  ],
  ouahigouya: [
    { nom: "Pharmacie Wemtenga", quartier: "Centre", tel: "24 55 01 44" }
  ],
  banfora: [
    { nom: "Pharmacie de la Comoé", quartier: "Centre-ville", tel: "20 91 00 11" }
  ],
  dedougou: [
    { nom: "Pharmacie du Mouhoun", quartier: "Secteur 3", tel: "20 52 01 20" }
  ],
  kaya: [
    { nom: "Pharmacie du Centre Kaya", quartier: "Secteur 1", tel: "24 45 00 15" }
  ],
  fada: [
    { nom: "Pharmacie du Gulmu", quartier: "Centre", tel: "24 77 00 40" }
  ],
  tenkodogo: [
    { nom: "Pharmacie Bulkiemdé", quartier: "Centre", tel: "24 70 00 22" }
  ],
  ziniare: [
    { nom: "Pharmacie Oubritenga", quartier: "Centre", tel: "25 35 00 10" }
  ]
};

const selectRecherche = document.getElementById('recherche');
const corpsTableau = document.getElementById('corps-tableau');
const selectVille = document.getElementById('choix-ville');
const containerPharmacies = document.getElementById('liste-pharmacies-container');

function afficherMedicaments(liste) {
  corpsTableau.innerHTML = '';
  if (liste.length === 0) {
    corpsTableau.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 15px;">Aucun médicament ne correspond à votre recherche.</td></tr>';
    return;
  }
  liste.forEach(m => {
    const tr = document.createElement('tr');
    let tagsHtml = '';
    if (m.maladies) {
      m.maladies.forEach(maladie => {
        tagsHtml += `<span class="tag-maladie">${maladie}</span> `;
      });
    }
    tr.innerHTML = `<td><strong>${m.nom}</strong></td><td>${m.utilite}</td><td>${tagsHtml}</td><td>${m.precautions}</td>`;
    corpsTableau.appendChild(tr);
  });
}

function afficherPharmacies(ville) {
  containerPharmacies.innerHTML = '';
  const liste = pharmacies[ville] || [];
  if (liste.length === 0) {
    containerPharmacies.innerHTML = '<p style="text-align: center; color: var(--text-light);">Aucune pharmacie de garde enregistrée pour cette ville.</p>';
    return;
  }
  
  const grid = document.createElement('div');
  grid.className = 'garde-grid';
  
  liste.forEach(p => {
    const card = document.createElement('div');
    card.className = 'garde-card';
    card.innerHTML = `
      <h4>${p.nom}</h4>
      <p>Quartier : ${p.quartier}</p>
      <p class="telephone">Tél : ${p.tel}</p>
    `;
    grid.appendChild(card);
  });
  containerPharmacies.appendChild(grid);
}

if (selectRecherche) {
  medicaments.forEach(m => {
    const option = document.createElement('option');
    option.value = m.nom;
    option.textContent = m.nom;
    selectRecherche.appendChild(option);
  });

  selectRecherche.addEventListener('change', (e) => {
    const val = e.target.value;
    if (val === "") {
      afficherMedicaments(medicaments);
    } else {
      const filtres = medicaments.filter(m => m.nom === val);
      afficherMedicaments(filtres);
    }
  });
}

if (selectVille) {
  selectVille.addEventListener('change', (e) => {
    afficherPharmacies(e.target.value);
  });
}

afficherMedicaments(medicaments);
afficherPharmacies(selectVille ? selectVille.value : 'ouagadougou');