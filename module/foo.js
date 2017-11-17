const circle = require('./circle.js');
console.log(`半径为 4 的圆的面积是 ${circle.area(4)}`);
console.log(`半径为 4 的圆的周长是 ${circle.circumference(4)}`);
const square = require('./square.js');
const mySquare = square(2);
console.log(`正方形的面积是 ${mySquare.area()}`);
