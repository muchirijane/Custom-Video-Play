/**** *Get our elements ****/
const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progress= document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const toggle = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('.player__slider');

/**** *Build our functions ****/

//how to play and pause the video
function togglePlay (){
    const method = this.paused ? 'play' : 'pause';

    video[method](); //video.paused() / video.play()
}

//updating the button either play or pause button
function updateButton(){
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

// updating the skip buttons
function skip(){
    console.log(this.dataset.skip)
    video.currentTime += parseFloat(this.dataset.skip); // convert the string into floating point number
}

// used to get the upadate on the volume and the playbackrate
function handleRangeUpdate(){
    video[this.name] = this.value;
}

//update the flex basis when playing
function handleProgress(){
    const percent = (video.currentTime/ video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`; // 10%
}

function scrub(e){
    console.log(e);
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}
/**** *Hook up the event listeners ****/
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

progress.addEventListener('click', scrub);
let mousedown = false;
progress.addEventListener('mousemove', (e)=> mousedown && scrub(e));
progress.addEventListener('mousedown', ()=> mousedown = true)
progress.addEventListener('mousedown', ()=> mouseup = false)