document.addEventListener('DOMContentLoaded', function() {
  verifierSession(['medecin', 'admin']);
  chargerPatientActif();

  document.getElementById('maladie').addEventListener('change', function() {
    const autreGroup = document.getElementById('autreMaladieGroup');
    autreGroup.style.display = this.value === 'autre' ? 'block' : 'none';
    document.getElementById('autreMaladie').required = this.value === 'autre';
  });
});

function chargerPatientActif() {
  const patientId = localStorage.getItem('santab_patient_actif_id');
  const patients = getPatients();
  const container = document.getElementById('infosPatient');

  if (!patientId || patients.length === 0) {
    container.innerHTML = `<p style="color: var(--danger);">Aucun patient sélectionné. Choisissez un patient depuis la liste d'attente.</p>`;
    return;
  }

  const patient = patients.find(p => p.id == patientId);

  if (!patient) {
    container.innerHTML = `<p style="color: var(--danger);">Patient introuvable.</p>`;
    return;
  }

  container.innerHTML = `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; font-size: 0.95rem;">
      <p><strong>Nom & Prénom :</strong> ${patient.nom} ${patient.prenom}</p>
      <p><strong>Âge :</strong> ${patient.age} ans</p>
      <p><strong>Poids :</strong> ${formatPoids(patient)}</p>
      <p><strong>Température :</strong> ${formatTemperature(patient)}</p>
      <p><strong>Tension :</strong> ${patient.tension}</p>
      <p><strong>Glycémie :</strong> ${patient.glycemie}</p>
    </div>
    <hr style="margin: 12px 0; border: none; border-top: 1px solid var(--border);">
    <p><strong>Symptômes (accueil) :</strong> ${patient.symptomes}</p>
    <p style="margin-top: 6px;"><strong>Antécédents :</strong> ${patient.antecedents}</p>
    <p style="margin-top: 6px;"><strong>Allergies :</strong> ${patient.allergies}</p>
  `;
}

document.getElementById('formPrediagnostic').addEventListener('submit', function(e) {
  e.preventDefault();

  const patientId = localStorage.getItem('santab_patient_actif_id');
  const patients = getPatients();
  const patientIndex = patients.findIndex(p => p.id == patientId);

  if (patientIndex === -1) {
    alert("Erreur : aucun patient actif trouvé.");
    return;
  }

  const maladieSelect = document.getElementById('maladie').value;
  const maladieFinale = maladieSelect === 'autre'
    ? document.getElementById('autreMaladie').value.trim()
    : maladieSelect;

  const avisMedecin = document.getElementById('avisMedecin').value.trim();
  const prescription = document.getElementById('prescription').value.trim();

  if (!patients[patientIndex].historiqueConsultations) {
    patients[patientIndex].historiqueConsultations = [];
  }

  patients[patientIndex].historiqueConsultations.push({
    id: 'c_' + Date.now(),
    date: new Date().toISOString(),
    hypothese: maladieFinale,
    avisMedecin: avisMedecin,
    prescription: prescription,
    medecinConfirmation: 'Confirmé'
  });

  patients[patientIndex].statut = 'Traité';

  savePatients(patients);

  alert("Diagnostic enregistré ! Le dossier est transmis à la pharmacie.");
  window.location.href = 'liste_patients.html';
});