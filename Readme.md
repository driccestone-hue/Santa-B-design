SANTA-B — Guide de l'équipe
Fichiers déjà prêts (Cédric)
login.html — page de connexion simulée (Stagiaire / Médecin / Admin)
style.css — style global à utiliser sur toutes les pages
nav.js — menu de navigation qui s'adapte au rôle connecté
dashboard_medecin.html — exemple de page utilisant le nav + le style
Comment utiliser le style et la navigation sur vos pages
Dans le <head> de chaque page (sauf login.html) :
<link rel="stylesheet" href="style.css">
Dans le <body>, tout en haut :
<div id="navbar-container"></div>
Juste avant </body> :
<script src="nav.js"></script>
Format des données à respecter (IMPORTANT — à lire avant de coder)
Pour que le pré-diagnostic d'Huldah s'enregistre correctement dans le dossier
patient d'Arielle, on utilise TOUS la même structure de données en localStorage.
Un patient (clé santab_patients, tableau JSON) :
Json
{
  "id": "p_1721500000000",
  "nom": "Ouédraogo",
  "prenom": "Awa",
  "age": 24,
  "poids": 58,
  "antecedents": "Aucun",
  "allergies": "Pénicilline",
  "dateEnregistrement": "2026-07-21T10:30:00.000Z",
  "enregistrePar": "stagiaire",
  "historiqueConsultations": []
}
Une consultation dans historiqueConsultations (ajoutée par Huldah) :
Json
{
  "id": "c_1721500500000",
  "date": "2026-07-21T10:45:00.000Z",
  "symptomes": ["fievre", "maux_de_tete", "frissons"],
  "dureeJours": 2,
  "hypothese": "Paludisme probable",
  "gravite": "modere",
  "conseil": "Consulter un médecin rapidement",
  "medecinConfirmation": ""
}
Valeurs possibles pour gravite : "leger", "modere", "urgent"
(utilisées avec les classes CSS .badge-leger, .badge-modere, .badge-urgent)
Rôles disponibles
stagiaire → accueil, remplit les infos du patient
medecin → confirme le diagnostic, voit tous les patients
admin → gère les stats et la vue d'ensemble
Conseil
Faites un test d'intégration rapide dès J3 : ouvrez vos pages ensemble et
vérifiez que la navigation et les données se lient bien, sans attendre J5-J6.