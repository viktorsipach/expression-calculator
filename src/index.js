function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let arrElements = [];
    if (/\s/.test(expr)) {
      arrElements = expr.split(/\s+/);
    } else {
      arrElements = expr.split('');
    }
    let output = [];
    let operatorStack = [];
    let precedence = {
      '+': 2,
      '-': 2,
      '*': 3,
      '/': 3
    };
    arrElements.map(el => {
      if (/\d+/gi.test(el)) {
        output.push(el);
      } else if (/[\-+*/]/gi.test(el)) {
        while (
          precedence[operatorStack[operatorStack.length - 1]] >= precedence[el] &&
          operatorStack[operatorStack.length - 1] !== '('
        ) {
          output.push(operatorStack.pop());
        }
        operatorStack.push(el);
      } else if (el === '(') {
        operatorStack.push(el);
      } else if (el === ')') {
        while (operatorStack[operatorStack.length - 1] !== '(') {
          output.push(operatorStack.pop());
        }
        if (operatorStack[operatorStack.length - 1] === '(') {
          operatorStack.pop();
        }
      }
    });
    while (operatorStack.length !== 0) {
      output.push(operatorStack.pop());
    }
  
    function changeNums(num) {
      result.pop();
      result.pop();
      result.push(num);
    }
    let result = [];
    let divisionByZero = output.some(el => {
      let calculatedNum;
      if (/\d+/gi.test(el)) {
        result.push(el);
      }
      switch (el) {
        case '*':
          calculatedNum = result[result.length - 2] * result[result.length - 1];
          changeNums(calculatedNum);
          break;
        case '/':
          if (result[result.length - 1] == 0) {
            return 1;
          }
          calculatedNum = result[result.length - 2] / result[result.length - 1];
          changeNums(calculatedNum);
          break;
        case '-':
          calculatedNum = result[result.length - 2] - result[result.length - 1];
          changeNums(calculatedNum);
          break;
        case '+':
          calculatedNum =
            parseFloat(result[result.length - 2]) +
            parseFloat(result[result.length - 1]);
          changeNums(calculatedNum);
          break;
      }
    });
  
    if (isNaN(result[0])) {
      throw 'ExpressionError: Brackets must be paired';
    } else if (divisionByZero) {
      throw 'TypeError: Division by zero.';
    } else {
      return result[0];
    }
  }

module.exports = {
    expressionCalculator
}