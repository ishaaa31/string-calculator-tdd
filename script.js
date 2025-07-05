function add(input) {
  if (input === "") return 0;

  // converts literal "\n" (typed in textbox) into actual newline
  input = input.replace(/\\n/g, "\n");

  // default delimiters
  let delimiter = /,|\n/;
  let numbersPart = input;

  // check for custom delimiter like //;\n
  if (numbersPart.startsWith("//")) {
    const match = numbersPart.match(/^\/\/(.)\n/);
    if (match) {
      delimiter = new RegExp(escapeRegExp(match[1]));
      numbersPart = numbersPart.slice(match[0].length);
    }
  }

  const nums = numbersPart
    .split(delimiter)
    .map(s => parseInt(s, 10))
    .filter(n => !isNaN(n)); // this removes invalid parses

  const negatives = nums.filter(n => n < 0);
  if (negatives.length > 0) {
    throw new Error("negative numbers not allowed " + negatives.join(","));
  }

  // to ignore numbers >1000
  return nums.filter(n => n <= 1000).reduce((sum, n) => sum + n, 0);
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// for browser ui
window.calculate = function () {
  const input = document.getElementById("inputBox").value.trim();
  const resultEl = document.getElementById("result");
  try {
    const result = add(input);
    resultEl.innerText = `Result: ${result}`;
    resultEl.style.color = 'green';
  } catch (e) {
    resultEl.innerText = `Error: ${e.message}`;
    resultEl.style.color = 'red';
  }
};
