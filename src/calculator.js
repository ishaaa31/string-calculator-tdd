let callCount = 0;

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function add(input) {
  callCount++;

  if (input === '') return 0;
  if (!input.includes(',') && !input.includes('\n') && !input.startsWith('//')) {
  const n = parseInt(input);
  if (n > 1000) return 0;
  return n;
}


  let delimiter = /,|\n/;

  if (input.startsWith('//')) {
    const delimiterMatch = input.match(/^\/\/(.+)\n/);
    const delimiterSection = delimiterMatch[1];
    input = input.slice(delimiterMatch[0].length);

    const multipleDelims = [...delimiterSection.matchAll(/\[([^\]]+)\]/g)].map(m => m[1]);
    if (multipleDelims.length > 0) {
      delimiter = new RegExp(multipleDelims.map(escapeRegExp).join('|'));
    } else {
      delimiter = new RegExp(escapeRegExp(delimiterSection));
    }
  }

  const numbers = input.split(delimiter).map(Number);
  const negatives = numbers.filter(n => n < 0);
  if (negatives.length > 0) {
    throw new Error(`Negatives not allowed: ${negatives.join(',')}`);
  }

  return numbers.filter(n => n <= 1000).reduce((a, b) => a + b, 0);
}

function getCalledCount() {
  return callCount;
}

module.exports = { add, getCalledCount };
