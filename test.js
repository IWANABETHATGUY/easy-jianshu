const list = [1, 2, 3, 4];

console.log(list.map(item => {
  if (item % 2 === 0) {
    return item;
  }
}))