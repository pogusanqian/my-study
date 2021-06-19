const faker = require('faker/locale/zh_CN');

const nameObj = faker.name;
// Object.keys(nameObj).forEach(item => console.log(`${item} === ${nameObj[item]()}`));
const nameArr = [];
const total = 1000000;
for (let i = 0; i < total; i++) {
  nameArr.push(nameObj.lastName() + nameObj.firstName());
}

// 最多生成12400个中文名字
console.log([...new Set(nameArr)].length);
