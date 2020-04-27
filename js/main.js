let $slides = $('.slides__item');
let $indicators = $('.indicators__item');
let $indicator = $('.indicators');
let $next = $('.controls__next');
let $previous = $('.controls__prev');
let $pause = $('.controls__pause');
let $pauseIcon = $('#pause');
let currentSlide = 0;
let prevInd = null;
let isPlaying = true;
let $carousel = $('.carousel');

const KEY_LEFT_ARROW = 'ArrowLeft';
const KEY_RIGHT_ARROW = 'ArrowRight';
const KEY_SPACE = ' ';

const goToSlide = (n) => {
  $($slides[currentSlide]).toggleClass('active');
  $($indicators[currentSlide]).toggleClass('active');
  currentSlide = (n + $slides.length) % $slides.length;
  $($slides[currentSlide]).toggleClass('active');
  $($indicators[currentSlide]).toggleClass('active');
};

let nextSlide = () => goToSlide(currentSlide + 1);
let previousSlide = () => goToSlide(currentSlide - 1);

let pauseSlideShow = () => {
  if (isPlaying) {
    $pauseIcon.text('play');
    isPlaying = false;
    clearInterval(slideInterval);
  }
}

let playSlideShow = () => {
  $pauseIcon.text('pause');
  isPlaying = true;
  slideInterval = setInterval(nextSlide, 2000);
}

let clickPause = () => isPlaying ? pauseSlideShow() : playSlideShow();

let clickNext = () => {
  pauseSlideShow();
  nextSlide();
};

let clickPrevious = () => {
  pauseSlideShow();
  previousSlide();
};

$pause.on('click', clickPause);
$next.on('click', clickNext);
$previous.on('click', clickPrevious);

const clickIndicator = (e) => {
  clickPause();
  goToSlide(+$(e.target).attr('data-slide-to'));
};

$indicator.on('click', '.indicators__item', clickIndicator);

let pressKey = (e) => {
  if (e.key === KEY_LEFT_ARROW) clickPrevious();
  if (e.key === KEY_RIGHT_ARROW) clickNext();
  if (e.key === KEY_SPACE) clickPause();
}

$(document).on('keydown', pressKey);

let swipeStartX = null;
let swipeEndX = null;

let swipeStart = (e) => {
  swipeStartX = e.changedTouches[0].pageX;
};

let swipeEnd = (e) => {
  swipeEndX = e.changedTouches[0].pageX;
  swipeStartX - swipeEndX < 100 && previousSlide();
  swipeStartX - swipeEndX > -100 && nextSlide();
  pauseSlideShow();
};

$carousel.on("touchstart", swipeStart);
$carousel.on("touchend", swipeEnd);

let slideInterval = setInterval(nextSlide, 2000);