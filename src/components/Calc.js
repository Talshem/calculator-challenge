import React, { useState } from 'react';
import { MathOperation, operationTypes } from './MathOperation';
import DigitButton from './DigitButton';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';

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
const [primary, setPrimary] = useState(0)
const [secondary, setSecondary] = useState(0)
const [action, setAction] = useState(undefined)

const addOperator = (value) => {
switch (value) {
    case '.':
addToResult(value)
return
    case 'AC':
setAction(undefined)
setPrimary(0)
setSecondary(undefined)
return
    case '=':
setSecondary(undefined)
setPrimary(calculate(action, primary, secondary))
return
    default:
setAction(value)
}
}

console.log(action)
const addToResult = (e) => {
console.log(action)
if (!action) {
setPrimary(primary => Number(primary.toString() + e.toString()))
} else {
setSecondary(secondary => Number(secondary.toString() + e.toString()))
}
}



const [digits, setDigits] = useState(() => {
let array = [];
for ( let i = 0; i < 10; i++) {
array.push(<DigitButton value={i} key={i} onClick={addToResult}/>)
};
return array
})

const [operators, setOperators] = useState(() => {
let array = [];
for ( let operator in operationTypes) {
array.push(<MathOperation type={operationTypes[operator]} key={operationTypes[operator]} onClick={addOperator}/>)
}
return array
})




  return (
    <div className='calculator'>
      <div className='result'>
        {secondary ? secondary : primary}
      </div>
      <div className='calculator-digits'>
{digits.map(e => {return e})}
{operators.map(e => {return e})}
      </div>
    </div>
  );
}

export default Calc;
