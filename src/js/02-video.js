import Player from '@vimeo/player';

import throttle from 'lodash.throttle';

const frame = document.querySelector('#vimeo-player');

const player = new Player(frame);

let seconds = localStorage.getItem('videoplayer-current-time');

player.on(
  'timeupdate',
  throttle(e => {
    localStorage.setItem('videoplayer-current-time', e.seconds);
  }, 1000)
);

if (seconds) {
  player.setCurrentTime(seconds);
}
