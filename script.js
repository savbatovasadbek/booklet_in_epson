const firstNumber = document.getElementById("firstNumber");
const secondNumber = document.getElementById("secondNumber");

const back = document.getElementById("back");
const front = document.getElementById("front");

const btn = document.getElementById("btn");
const listNumber = document.getElementById("listNumber");

btn.addEventListener("click", () => {
  const a = +firstNumber.value;
  const b = +secondNumber.value;

  listNumber.innerText = Math.floor((b - a + 1) / 4) + 1;

  let list = b / 4;
  const old = [b, a];
  const orqa = [a + 1, b - 1];
  for (i = 0; i < list - 1; i++) {
    orqa.push(orqa[i * 2] + 2, orqa[i * 2 + 1] - 2);
    old.push(old[i * 2] - 2, old[i * 2 + 1] + 2);
  }

  let backNumbers = orqa.join(",");
  let frontNumbers = old.join(",");

  back.value = backNumbers;
  front.value = frontNumbers;
});
