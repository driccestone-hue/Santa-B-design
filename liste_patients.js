document.addEventListener('DOMContentLoaded', function() {
  verifierSession(['medecin', 'admin']);
  chargerListeMedecin();

  const inputRecherche = document.getElementById('recherchePatient');
  if (inputRecherche) {
    inputRecherche.addEventListener('input', function(e) {
      chargerListeMedecin(e.target.value.toLowerCase());
    });
  }
});

function chargerListeMedecin(filtre = '') {
  const tbody = document.getElementById('listePatientsBody');
  if (!tbody) return;

  const patients = getPatients();
  const patientsFiltres = patients.filter(p => {
    const nomComplet = `${p.nom || ''} ${p.prenom || ''}`.toLowerCase();
    return nomComplet.includes(filtre);
  });

  if (patientsFiltres.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; color: var(--text-light); padding:20px;">Aucun patient en attente.</td></tr>`;
    return;
  }

  tbody.innerHTML = '';
  patientsFiltres.forEach((p, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td><strong>${p.nom} ${p.prenom}</strong></td>
      <td>${p.age} ans</td>
      <td>${formatPoids(p)}</td>
      <td>${formatTemperature(p)}</td>
      <td>${p.tension}</td>
      <td><span class="badge ${p.statut === 'Traité' ? 'badge-leger' : 'badge-modere'}">${p.statut}</span></td>
      <td><button onclick="traiterPatient(${p.id})" class="btn-primary" style="padding:6px 12px; font-size:0.85rem; width:auto;">Traiter</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function traiterPatient(id) {
  localStorage.setItem('santab_patient_actif_id', id);
  window.location.href = 'prediagnostic.html';
}