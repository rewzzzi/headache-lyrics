const audio = document.getElementById('music-player');
const playBtn = document.getElementById('play-btn');
const progressBar = document.getElementById('progress-bar');
const progressCont = document.getElementById('progress-cont');
const lines = document.querySelectorAll('.lyric-line');
const volumeSlider = document.getElementById('volume-slider');



playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.innerText = 'II';
    } else {
        audio.pause();
        playBtn.innerText = '▶';
    }
});

audio.addEventListener('timeupdate', () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = percent + '%';

    let current = audio.currentTime;
    lines.forEach((line, i) => {
        const time = parseFloat(line.dataset.time);
        const nextTime = lines[i+1] ? parseFloat(lines[i+1].dataset.time) : Infinity;

        if (current >= time && current < nextTime) {
            if (!line.classList.contains('active')) {
                lines.forEach(l => l.classList.remove('active'));
                line.classList.add('active');
                line.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
});

progressCont.addEventListener('click', (e) => {
    const width = progressCont.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
});

lines.forEach(line => {
    line.addEventListener('click', () => {
        audio.currentTime = parseFloat(line.dataset.time);
        audio.play();
        playBtn.innerText = 'II';
    });
});

volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});