const musiqueContenant = document.getElementById('musique-contenant');

const btnPlay = document.getElementById('play');
const btnPredecedent = document.getElementById('precedent');
const btnSuivant = document.getElementById('suivant');

const audio = document.getElementById('audio');
const progres = document.getElementById('progres');

const titre = document.getElementById('titre');
const cover = document.getElementById('cover');

const chansonsArr = ['spin', 'poke-eye', 'bat'];

let orderChanson = 0;

function telechargerChanson(chanson) {
	titre.innerHTML = chanson;
	audio.src = `musique/${chanson}.mp3`;
	cover.src = `img/${chanson}.png`;
}

telechargerChanson(chansonsArr[orderChanson]);

function playChanson() {
	musiqueContenant.classList.add('play');

	btnPlay.querySelector('i.fas').classList.remove('fa-play');
	btnPlay.querySelector('i.fas').classList.add('fa-pause');

	audio.play();
}

function chansonPrecedente() {
	orderChanson--;

	if (orderChanson < 0) {
		orderChanson = chansonsArr.length - 1;
	}
	telechargerChanson(chansonsArr[orderChanson]);

	playChanson();
}

function chansonSuivante() {
	orderChanson++;

	if (orderChanson > chansonsArr.length - 1) {
		orderChanson = 0;
	}
	telechargerChanson(chansonsArr[orderChanson]);

	playChanson();
}

function updateProgres(e) {
	const duree = e.srcElement.duration;
	const tempsCourant = e.srcElement.currentTime;
	const pourcentageProgres = (tempsCourant / duree) * 100;
	console.log(pourcentageProgres);
	progres.style.width = `${pourcentageProgres}%`;
}

function pauseChanson() {
	musiqueContenant.classList.remove('play');
	audio.pause();
	btnPlay.querySelector('i.fas').classList.add('fa-play');
	btnPlay.querySelector('i.fas').classList.remove('fa-pause');
}

btnPlay.addEventListener('click', () => {
	const playing = musiqueContenant.classList.contains('play');

	if (playing) {
		pauseChanson();
	}
	else {
		playChanson();
	}
});

btnPredecedent.addEventListener('click', chansonPrecedente);
btnSuivant.addEventListener('click', chansonSuivante);

audio.addEventListener('timeupdate', updateProgres);
