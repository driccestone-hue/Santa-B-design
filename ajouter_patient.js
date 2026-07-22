document.addEventListener('DOMContentLoaded', function() {
  verifierSession(['stagiaire', 'admin', 'medecin']);
  afficherHistoriqueStagiaire();
});

document.getElementById('formPatient').addEventListener('submit', function(e) {
  e.preventDefault();

  const nom = document.getElementById('nom').value.trim();
  const prenom = document.getElementById('prenom').value.trim();
  const age = parseFloat(document.getElementById('age').value);
  const poids = parseFloat(document.getElementById('poids').value);
  const temperature = parseFloat(document.getElementById('temperature').value);
  const tension = document.getElementById('tension').value.trim();
  const glycemieInput = document.getElementById('glycemie').value;
  const glycemie = glycemieInput !== '' ? parseFloat(glycemieInput) : null;
  const allergies = document.getElementById('allergies').value.trim();
  const symptomes = document.getElementById('symptomes').value.trim();
  const antecedents = document.getElementById('antecedents').value.trim();

  if (isNaN(age) || age < 0 || age > 130) {
    alert("Erreur : âge invalide (0 à 130 ans).");
    return;
  }
  if (isNaN(poids) || poids < 0.05 || poids > 600) {
    alert("Erreur : poids invalide (0.05 à 600 kg).");
    return;
  }
  if (isNaN(temperature) || temperature < 15 || temperature > 47) {
    alert("Erreur : température hors limites vitales mesurables (15 à 47 °C).");
    return;
  }
  if (glycemie !== null && (isNaN(glycemie) || glycemie < 0 || glycemie > 15)) {
    alert("Erreur : valeur de glycémie invalide (0 à 15 g/L).");
    return;
  }

  let auteur = "Accueil";
  const sessionData = localStorage.getItem('santab_session');
  if (sessionData) {
    try {
      const session = JSON.parse(sessionData);
      if (session && session.nom) auteur = session.nom;
    } catch (err) {}
  }

  const maintenant = new Date();
  const heureFormatee = maintenant.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  const dateFormatee = maintenant.toLocaleDateString('fr-FR');

  const nouveauPatient = {
    id: Date.now(),
    nom: nom,
    prenom: prenom,
    age: age,
    poidsValeur: poids,
    poidsUnite: poids < 1 ? 'g' : 'kg',
    temperatureValeur: temperature,
    tension: tension,
    glycemie: glycemie !== null ? glycemie + ' g/L' : 'Non renseigné',
    allergies: allergies || 'Aucune',
    symptomes: symptomes,
    antecedents: antecedents || 'Aucun',
    enregistrePar: auteur,
    dateEnregistrement: maintenant.toISOString(),
    heureAffichage: heureFormatee,
    dateAffichage: dateFormatee,
    statut: 'En attente',
    historiqueConsultations: []
  };

  if (nouveauPatient.poidsUnite === 'g') {
    nouveauPatient.poidsValeur = Math.round(poids * 1000);
  }

  const patients = getPatients();
  patients.push(nouveauPatient);
  savePatients(patients);

  document.getElementById('formPatient').reset();
  alert("✅ Patient enregistré et transmis au médecin !");
  afficherHistoriqueStagiaire();
});

function afficherHistoriqueStagiaire() {
  const tbody = document.getElementById('historiqueStagiaireBody');
  if (!tbody) return;

  const patients = getPatients();

  if (patients.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color: var(--text-light); padding:15px;">Aucun patient enregistré pour le moment.</td></tr>`;
    return;
  }

  tbody.innerHTML = '';
  patients.slice().reverse().forEach((p, i) => {
    const numero = patients.length - i;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${numero}</td>
      <td><strong>${p.nom} ${p.prenom}</strong></td>
      <td>${p.heureAffichage || ''}</td>
      <td><span class="badge ${p.statut === 'Traité' ? 'badge-leger' : 'badge-modere'}">${p.statut}</span></td>
    `;
    tbody.appendChild(tr);
  });
}