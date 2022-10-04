
import './App.css';
import React, { useState, useEffect } from 'react';

const numbers = [
  {name : "nine", number: "9"},
  {name : "eight", number: "8"},
  {name : "seven", number: "7"},
  {name : "six", number: "6"},
  {name : "five", number: "5"},
  {name : "four", number: "4"},
  {name : "three", number: "3"},
  {name : "two", number: "2"},
  {name : "one", number: "1"},
  {name : "zero", number: "0"},
  {name : "decimal", number : "."},
]

const operators = [
  {name : "add", operation : "+"},
  {name : "subtract", operation : "-"},
  {name : "multiply", operation : "*"},
  {name : "divide", operation : "/"},
  {name : "clear", operation : "AC"},
  {name : "equals", operation : "="},
  
]

function App() {

  const[operationStr, setOperationStr] = useState("")
  const[toCalculate, setCalculate] = useState("0")
  const[result, setResult] = useState(0)

  useEffect(() => {
    document.getElementById("multiply").innerHTML="x";
  });



  const changeScreenView = (initialValue, valueToAdd) => {


    if(valueToAdd === "AC"){
      setOperationStr("")
      setCalculate("0")
      console.log("AC")
    } 


    else if(valueToAdd === "="){
      setResult(eval(operationStr).toString())
      setOperationStr(initialValue + "= " + eval(operationStr))
      setCalculate(eval(operationStr))

      console.log(operationStr)
      console.log(result)
    }

    else if(initialValue.includes("=")){
      if(isNaN(parseInt(valueToAdd))){
        changeScreenView(result, valueToAdd)  
      }
      else{
        setOperationStr(valueToAdd)
        setCalculate(valueToAdd)
      }
    }

    else if(valueToAdd === "." && toCalculate.includes(".")){
      setCalculate(toCalculate)
      console.log("2 petits points")
    }

    else if(valueToAdd === "-" && toCalculate === "-"){
      let newOperation = operationStr.slice(0, -1) + '+'
      setOperationStr(newOperation)
      console.log(operationStr)
        }

    else if((isNaN(parseInt(toCalculate)) && isNaN(parseInt(valueToAdd))) && isNaN(parseInt(operationStr.charAt(operationStr.length -2)))){
      let newOperation = operationStr.slice(0, -2)
      setOperationStr(newOperation + valueToAdd)
      }

    else if((isNaN(parseInt(toCalculate)) && isNaN(parseInt(valueToAdd))) && valueToAdd !== "-"){
      let newOperation = operationStr.slice(0, -1)
      setOperationStr(newOperation + valueToAdd)
      console.log(operationStr)
    }

    else if((parseInt(toCalculate) === 0 && valueToAdd === "0") || ((isNaN(parseInt(toCalculate))) && valueToAdd === "0")){
      setOperationStr(initialValue)
      setCalculate(toCalculate)
      console.log("zero interdit")
    }
    

    else if((toCalculate === "0" && operationStr === "")|| (initialValue === "0" || isNaN(parseInt(toCalculate)))){
      setOperationStr(initialValue + valueToAdd)
      setCalculate(valueToAdd)
      console.log("hello")
    }
 
    else if(isNaN(parseInt(valueToAdd)) === false || valueToAdd === "."){
      setCalculate(toCalculate + valueToAdd)
      setOperationStr(initialValue + valueToAdd)
      console.log("num ou point")
    }

    else if(isNaN(parseInt(valueToAdd)) && valueToAdd !== "="){
      setOperationStr(initialValue + valueToAdd)
      setCalculate(valueToAdd)
      console.log("Nan et pas =")
    }
  }

  const numberButtons = numbers.map(element => <CalculatorButton id = {element.name} value = {element.number} calculation = {setCalculate} changeScreenView = {changeScreenView} operationDone = {operationStr} className = "numbersButtons"/>)
  const operatorsButtons = operators.map(operator => <CalculatorButton id = {operator.name} value = {operator.operation} calculation = {setCalculate} changeScreenView = {changeScreenView} operationDone = {operationStr} className = "operationButtons"/>)

  return (
    <div className="App">
      <Screen screenView = {operationStr} toCalculate = {toCalculate}/>
      <div id = "calcultorButtons">
          {numberButtons}
          {operatorsButtons}
      </div>
    </div>
  );
}

function Screen(props) {
  return(
    <div id="screen">
      <div id ="view"> {props.screenView} </div>
      <div id = "display">{props.toCalculate}</div>
    </div>
  )
}

function CalculatorButton(props) {
  return(
    <button id = {props.id} onClick = {() => (
      props.changeScreenView(props.operationDone, props.value)
      )} className = {props.className}> {props.value}</button>
  )
  }
export default App;
