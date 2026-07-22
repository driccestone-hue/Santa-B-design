function verifierSession(rolesAutorises) {
  const sessionData = localStorage.getItem('santab_session');
  if (!sessionData) {
    window.location.href = 'Login.html';
    return null;
  }
  const session = JSON.parse(sessionData);
  if (rolesAutorises && !rolesAutorises.includes(session.role)) {
    alert("Vous n'avez pas accès à cette page.");
    window.location.href = 'Login.html';
    return null;
  }
  return session;
}

function deconnexion() {
  localStorage.removeItem('santab_session');
  window.location.href = 'Login.html';
}

function getPatients() {
  return JSON.parse(localStorage.getItem('santab_patients')) || [];
}

function savePatients(patients) {
  localStorage.setItem('santab_patients', JSON.stringify(patients));
}

function formatPoids(patient) {
  if (patient.poidsUnite === 'g') return patient.poidsValeur + ' g';
  return patient.poidsValeur + ' kg';
}

function formatTemperature(patient) {
  return patient.temperatureValeur + ' °C';
}