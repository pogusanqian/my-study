const TextToSVG = require('text-to-svg');

const textToSVG = TextToSVG.loadSync('/fonts/Noto-Sans.otf');
const svg = textToSVG.getSVG('hello');
console.log(svg);
