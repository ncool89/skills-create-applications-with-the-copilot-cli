#!/usr/bin/env node
"use strict";

/*
  Node.js CLI Calculator

  Supported operations:
  - add : addition (a + b)
  - sub : subtraction (a - b)
  - mul : multiplication (a * b)
  - div : division (a / b)

  Usage examples:
    node src/calculator.js add 2 3    => 5
    node src/calculator.js sub 5 2    => 3
    node src/calculator.js mul 4 6    => 24
    node src/calculator.js div 10 2   => 5

  If no command-line arguments are provided, the CLI will prompt interactively.
*/

const readline = require('readline');

function printUsage() {
  console.log('Usage: node src/calculator.js <op> <num1> <num2>');
  console.log('Operations: add, sub, mul, div');
  console.log('Or run without args for interactive mode.');
}

function isNumber(n) {
  return typeof n === 'number' && !Number.isNaN(n) && Number.isFinite(n);
}

function toNumber(str) {
  const n = Number(str);
  if (!isNumber(n)) return null;
  return n;
}

function calculate(op, a, b) {
  // Supported operations are documented at the top of this file
  switch (op) {
    case 'add':
      return a + b;
    case 'sub':
      return a - b;
    case 'mul':
      return a * b;
    case 'div':
      if (b === 0) {
        throw new Error('Division by zero');
      }
      return a / b;
    default:
      throw new Error(`Unsupported operation: ${op}`);
  }
}

async function interactiveMode() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (q) => new Promise((res) => rl.question(q, res));

  try {
    const op = (await question('Operation (add, sub, mul, div): ')).trim();
    const aStr = (await question('First number: ')).trim();
    const bStr = (await question('Second number: ')).trim();

    const a = toNumber(aStr);
    const b = toNumber(bStr);

    if (a === null || b === null) {
      console.error('Error: both operands must be valid numbers');
      process.exit(1);
    }

    try {
      const result = calculate(op, a, b);
      console.log(result);
      process.exit(0);
    } catch (err) {
      console.error('Error:', err.message);
      process.exit(1);
    }
  } finally {
    rl.close();
  }
}

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    return interactiveMode();
  }

  if (args.length !== 3) {
    printUsage();
    process.exit(1);
  }

  const [op, aStr, bStr] = args;
  const a = toNumber(aStr);
  const b = toNumber(bStr);

  if (a === null || b === null) {
    console.error('Error: both operands must be valid numbers');
    process.exit(1);
  }

  try {
    const result = calculate(op, a, b);
    if (Number.isInteger(result)) {
      console.log(result);
    } else {
      console.log(result);
    }
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
