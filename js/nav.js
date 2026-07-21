function chargerNavigation() {
  const sessionData = localStorage.getItem('santab_session');

  if (!sessionData) {
    window.location.href = 'login.html';
    return;
  }

  const session = JSON.parse(sessionData);
  const container = document.getElementById('navbar-container');

  if (!container) return;

  let liens = [];

  if (session.role === 'stagiaire') {
    liens = [
      { texte: 'Accueil Patient', url: 'ajouter_patient.html' },
      { texte: 'Liste des patients', url: 'liste_patients.html' }
    ];
  } else if (session.role === 'medecin') {
    liens = [
      { texte: 'Tableau de bord', url: 'dashboard_medecin.html' },
      { texte: 'Patients en attente', url: 'liste_patients.html' },
      { texte: 'Pré-diagnostic', url: 'prediagnostic.html' },
      { texte: 'Pharmacie', url: 'pharmacie.html' },
      { texte: 'Pharmacies de garde', url: 'garde.html' }
    ];
  } else if (session.role === 'admin') {
    liens = [
      { texte: 'Tableau de bord', url: 'dashboard_admin.html' },
      { texte: 'Patients', url: 'liste_patients.html' },
      { texte: 'Statistiques', url: 'stats.html' }
    ];
  }

  const pageActuelle = window.location.pathname.split('/').pop();

  const liensHTML = liens.map(lien => {
    const classeActive = (lien.url === pageActuelle) ? 'class="active"' : '';
    return `<a href="${lien.url}" ${classeActive}>${lien.texte}</a>`;
  }).join('');

  const roleAffiche = {
    stagiaire: 'Stagiaire',
    medecin: 'Médecin',
    admin: 'Administrateur'
  }[session.role] || session.role;

  container.innerHTML = `
    <nav class="navbar">
      <a href="index.html" class="nav-logo">🏥 SANTA-B</a>
      <ul class="nav-links">
        ${liensHTML}
      </ul>
      <div class="nav-user">
        <span>${session.nom}</span>
        <span class="nav-role-badge">${roleAffiche}</span>
        <button class="btn-logout" onclick="deconnexion()">Déconnexion</button>
      </div>
    </nav>
  `;
}

function deconnexion() {
  localStorage.removeItem('santab_session');
  window.location.href = 'login.html';
}

function verifierSession(rolesAutorises) {
  const sessionData = localStorage.getItem('santab_session');
  if (!sessionData) {
    window.location.href = 'login.html';
    return null;
  }
  const session = JSON.parse(sessionData);
  if (rolesAutorises && !rolesAutorises.includes(session.role)) {
    alert("Vous n'avez pas accès à cette page.");
    window.location.href = 'login.html';
    return null;
  }
  return session;
}

document.addEventListener('DOMContentLoaded', chargerNavigation);