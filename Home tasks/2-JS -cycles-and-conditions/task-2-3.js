/*Задание 3*/
console.log(`Задание 3`);

let userValue = prompt("Введите число в формате числа");
let degree = prompt("Введите значение степени в формате числа");

for (;;) {
  if (!Number(userValue) || !Number(degree) || degree <= 0) {
    console.log(
      `Введенное значение имеет неверный тип данных или значение degree меньше 0.`
    );
    userValue = prompt("Введите число в формате число");
    degree = prompt("Введите значение степени большее 0 в формате число");
  } else {
    break;
  }
}
let result = userValue;
for (i = 1; i < degree; i++) {
  result *= userValue;
}
if (Number(result)) {
  console.log(`Полученное значение: ${result}`);
}

console.log(``);
