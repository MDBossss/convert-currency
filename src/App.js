import {useEffect, useState} from "react";
import Selection from "./components/Selection";

function App() {

const [from,setFrom] = useState({"label":"EUR"});
const [to,setTo] = useState({"label":"HRK"});
const [amount,setAmount] = useState(1);
const [result,setResult] = useState(0);
const [symbols,setSymbols] = useState([]);

//returns object with converted amount
const convertCurrency = (e) => {
  e.preventDefault();
  var requestURL = `https://api.exchangerate.host/convert?from=${from.label.toLocaleLowerCase()}&to=${to.label.toLocaleLowerCase()}&amount=${amount}&places=2`;
  console.log(requestURL)
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();

  request.onload = function() {
    var response = request.response;
    setResult(response.result);
  }
}

useEffect(() => {
  //returns object with array of symbols
  var requestSymbolURL = 'https://api.exchangerate.host/symbols';
  var requestSymbol = new XMLHttpRequest();
  requestSymbol.open('GET', requestSymbolURL);
  requestSymbol.responseType = 'json';
  requestSymbol.send();

  requestSymbol.onload = function() {
    var response = requestSymbol.response.symbols;
    const keys = Object.keys(response);
    const arr = [];
    keys.forEach(item =>{
      const obj = {};
      obj["value"] = item;
      obj["label"] = item;
      arr.push(obj);
    })
    setSymbols(arr);
  }
  
     
},[]);

  return (
    <div className="container">
      <h3>Exchange rate</h3>
      <h2>{result!==0 ? result : "-"} {result!==0 ? to.label.toLocaleUpperCase() : ""}</h2>
      <Selection convertCurrency={convertCurrency} symbols={symbols} setFrom={setFrom} setTo={setTo} setAmount={setAmount} from={from} to={to}/>
      <a href="https://github.com/MDBossss" target="_blank" rel="noopener noreferrer">&copy; MDBoss</a>
    </div>
  );
}

export default App;
