import React, { useEffect, useState } from 'react';
import { MathOperation, operationTypes } from './MathOperation';
import DigitButton from './DigitButton';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import { act } from 'react-dom/test-utils';

function calculate(operation, num1, num2 = 0) {

if(operation === '/' && num2 === 0){
  return 'Error'
}

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
const [number, setNumber] = useState(0)
const [primary, setPrimary] = useState(0)
const [secondary, setSecondary] = useState(0)

const [operation, setOperation] = useState(undefined)
const [action, setAction] = useState(undefined)

const [equal, setEqual] = useState(false)
const [decimal, setDecimal] = useState(false)
const [toggle, setToggle] = useState(0)

const [caseEqual, setCaseEqual] = useState(false)

const handleOperator = (e) => {
setOperation(e)
setToggle(num => num + 1)
}

const handleNumber = (e) => {
setNumber(number => number.toString() + e.toString())
}


useEffect(() => {
const equalFunction = () => {
if(equal && action){
new Promise((resolve, reject) => {
resolve((calculate(action, primary, secondary)))
})
.then((value) => {
setEqual(false)
setPrimary(value)
if(operation === '=' ) {
setCaseEqual(true)
}
});
}
if (operation !== '=' && operation !== '.') {
setAction(operation)
}
}; equalFunction();
}, [equal])


console.log(primary + '---' + action + '---' + secondary + '---' + number + '---' + operation)

useEffect(() => {

const operationFunction = () => {
if(action && secondary  && operation !== '=' && operation !== 'AC' && !caseEqual){
setNumber('')
setEqual(true)
return
}
setCaseEqual(false)

switch (operation) {
case '=':
setEqual(true)
break;
    case '.':
setDecimal(true)
break;
    case 'AC':
setSecondary(0)
setPrimary(0)
setNumber(0)
setAction(undefined)
setOperation(undefined)
break;
    default:
setNumber('')
setAction(operation)
}
}; operationFunction();
}, [toggle])

useEffect(() => {
const passNumbers = () => {
switch (action) {
    case '√':
new Promise((resolve, reject) => {
resolve((calculate('sqrt', primary)))
})
.then((value) => {
setPrimary(value)
});
setSecondary(0)
setAction(undefined)
return

    case 'x²':
new Promise((resolve, reject) => {
resolve((calculate('power', primary)))
})
.then((value) => {
setPrimary(value)
});
setSecondary(0)
setAction(undefined)
return
}
if (!action) {
setPrimary(Number(number))
} else {
setSecondary(Number(number))
}
}; passNumbers();
}, [action, number])






useEffect(() => {
const decimalFunction = () => {
if(decimal && !String(number).includes('.')){
setNumber(number => number.toString() + '.')
setDecimal(false)
}}; decimalFunction();
}, [decimal])

const [digits, setDigits] = useState(() => {
let array = [];
for ( let i = 0; i < 10; i++) {
array.push(<DigitButton value={i} key={i} onClick={handleNumber}/>)
};
return array
})

const [operators, setOperators] = useState(() => {
let array = [];
for ( let operator in operationTypes) {
array.push(<MathOperation type={operationTypes[operator]} key={operationTypes[operator]} onClick={handleOperator}/>)
}
return array
})

  return (
    <div className='calculator'>
      <div className='result'>
        {secondary && operation !== '=' ? secondary : primary}
      </div>
      <div className='calculator-digits'>
{digits.map(e => {return e})}
{operators.map(e => {return e})}
      </div>
    </div>
  );
}

export default Calc;
