const Moment = require('moment');

const m1 = new Moment();
const m2 = Moment();

console.log(m1, m2);
console.log(m1 instanceof Moment);
console.log(m2 instanceof Moment);

console.log(Date());
console.log(new Date());
