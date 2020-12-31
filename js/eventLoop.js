task1();
setTimeout(() => {
  console.log("setTimeout");
});
new Promise(resolve => {
  console.log("promise");
  resolve();
}).then(() => {
  console.log("promise 1");
});


async function task1() {
  await task2();
  console.log("task1");
}
async function task2() {
  console.log("task2");
}
console.log("task end");