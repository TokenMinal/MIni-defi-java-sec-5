const motEl = document.getElementById('mot');
const mauvaisesLettres = document.getElementById('mauvaises-lettres');
const rejouerBtn = document.getElementById('play-bouton');
const popup = document.getElementById('popup-contenant');
const notification = document.getElementById('notification-contenant');
const messageFinal = document.getElementById('message-final');

const figurePartie = document.querySelectorAll('.figure-partie');

const mots = [
	'majima',
	'kiryu',
	'john',
	'darksoul',
	'bonhomme',
	'github',
	'gaming',
];

let motSelectionne = mots[Math.floor(Math.random() * mots.length)];

console.log(motSelectionne);

const bonnesLettresArr = [];
const mauvaisesLettresArr = [];

function afficherMot() {
	motEl.innerHTML = `
        ${motSelectionne
		.split('')
		.map(
			(lettre) => `
                    <span class="lettre">
                        ${bonnesLettresArr.includes(lettre) ? lettre : ''}
                    </span>
                `,
		)
		.join('')}    
    `;

	const motInterne = motEl.innerText.replace(/\n/g, '');

	console.log(motEl.innerText, motInterne);

	if (motInterne === motSelectionne) {
		messageFinal.innerText = 'you won';
		popup.style.display = 'flex';
	}
}

function updateMauvaisesLettresEl() {
	mauvaisesLettres.innerHTML = `
        ${mauvaisesLettresArr.map((lettre) => ` <span> ${lettre}</span>`)}   
    `;

	figurePartie.forEach((partie, index) => {
		const erreurs = mauvaisesLettresArr.length;

		if (index < erreurs) {
			partie.style.display = 'block';
		}
		else {
			partie.style.display = 'none';
		}
	});

	if (mauvaisesLettresArr.length === figurePartie.length) {
		messageFinal.innerText = 'you lose nul';
		popup.style.display = 'flex';
	}
}

function afficherNotification() {
	notification.classList.add('afficher');

	setTimeout(() => {
		notification.classList.remove('afficher');
	}, 2000);
}

window.addEventListener('keydown', (e) => {
	if (e.keyCode >= 65 && e.keyCode <= 90) {
		const lettre = e.key;

		if (motSelectionne.includes(lettre)) {
			if (!bonnesLettresArr.includes(lettre)) {
				bonnesLettresArr.push(lettre);

				afficherMot();
			}
			else {
				afficherNotification();
			}
		}
		else if (!mauvaisesLettresArr.includes(lettre)) {
			mauvaisesLettresArr.push(lettre);

			updateMauvaisesLettresEl();
		}
		else {
			afficherNotification();
		}
	}
});

rejouerBtn.addEventListener('click', () => {
	bonnesLettresArr.splice(0);
	mauvaisesLettresArr.splice(0);

	motSelectionne = mots[Math.floor(Math.random() * mots.length)];

	afficherMot();

	updateMauvaisesLettresEl();

	popup.style.display = 'none';
});

afficherMot();
