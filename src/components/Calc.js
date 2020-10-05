import React, { useState } from 'react';
import { MathOperation, operationTypes } from './MathOperation';
import DigitButton from './DigitButton';

/**
 * A basic switch calcuation function
 * @param {*} operation The name or type of the operation used, for ex. : "sqrt" / "+"
 * @param {*} num1 The first num to use in the calculation
 * @param {*} num2 The second num to use in the calculation
 */
function calculate(operation, num1, num2 = 0) {

  switch (operation) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      return num1 / num2;
    case '%':
      return num1 % num2;
    case 'power':
      return Math.pow(num1, 2);
    case 'sqrt':
      return Math.sqrt(num1);
  }
}

function Calc() {
const [result, setResult] = useState(0)
  /**
   * Add (0-9) to <DigitButton /> with value and onClick function as exlplained in the requirements
   * Add the correct types to MathOperation, if you are having problem make sure its written correctly compared to operationTypes array
   * This is a state machine, you'll need to work wisely with React.js State and Lifecycle functionality
   * You can use calculate function for your aid
   */


const addToResult = (e) => {
let sum = result.toString() + e.toString()
setResult(Number(sum))
}



  return (
    <div className='calculator'>
      <div className='result'>
        {result}
      </div>
      <div className='calculator-digits'>
        {DigitButton({value: 0, onClick: () => addToResult(0)})}
        {DigitButton({value: 1, onClick: () => addToResult(1)})}
        {DigitButton({value: 2, onClick: () => addToResult(2)})}
        {DigitButton({value: 3, onClick: () => addToResult(3)})}
        {DigitButton({value: 4, onClick: () => addToResult(4)})}
        {DigitButton({value: 5, onClick: () => addToResult(5)})}
        {DigitButton({value: 6, onClick: () => addToResult(6)})}
        {DigitButton({value: 7, onClick: () => addToResult(7)})}
        {DigitButton({value: 8, onClick: () => addToResult(8)})}
        {DigitButton({value: 9, onClick: () => addToResult(9)})}
      </div>
    </div>
  );
}

export default Calc;
