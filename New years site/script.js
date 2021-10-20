const jours = document.getElementById('jours');
const heures = document.getElementById('heures');
const minutes = document.getElementById('minutes');
const secondes = document.getElementById('secondes');
const decompte = document.getElementById('decompte');
const annee = document.getElementById('annee');
const telechargement = document.getElementById('telechargement');

const anneeCourrante = new Date().getFullYear();

const jourdelan = new Date(`January 01 ${anneeCourrante + 1} 00:00:00`);

annee.innerText = anneeCourrante + 1;

function updateDecompte() {
	const dateactuelle = new Date();
	const diff = jourdelan - dateactuelle;
	const j = Math.floor(diff / 1000 / 60 / 60 / 24);
	const h = Math.floor(diff / 1000 / 60 / 60) % 24;
	const m = Math.floor(diff / 1000 / 60) % 60;
	const s = Math.floor(diff / 1000) % 60;
	jours.innerHTML = j;
	heures.innerHTML = h < 10 ? '0' + h : h;
	minutes.innerHTML = m < 10 ? '0' + m : m;
	secondes.innerHTML = s < 10 ? '0' + s : s;
}

setTimeout(() => {
	telechargement.remove();
	decompte.style.display = 'flex';
}, 1000);

setInterval(updateDecompte, 1000);