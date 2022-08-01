import Select from 'react-select';
import React from 'react';
import {FaExchangeAlt} from "react-icons/fa";

const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: "#252836",
      borderBottom: '1px solid #222531',
      cursor:"pointer",
      color: state.isSelected ? '#5f63c4' : '#fff',
      padding: 20,
      "&:hover":{
        backgroundColor:"#1C1E29"
    }
    }),
    menuList: (base) => ({
        ...base,
    maxHeight: "200px",
    backgroundColor:"#252836",

   "::-webkit-scrollbar": {
     width: "4px"
   },
   "::-webkit-scrollbar-track": {
     background: "#252836"
   },
   "::-webkit-scrollbar-thumb": {
     background: "#5f63c4"
   },
   "::-webkit-scrollbar-thumb:hover": {
     background: "#4348c4"
   }
      }),
    control: (provided) => ({
        ...provided,
        backgroundColor: "#252836",
        borderRadius:"0px 4px 4px 0px",
        cursor:"pointer",
        border: "none",
        boxShadow:"none",
        color: "white",
        padding: 5,
        "&:hover":{
            borderColor:"1px solid white",
            boxShadow:"none"
        }
      }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
      
  
      return { ...provided, opacity, transition };
    }
    
  }



const Selection = ({convertCurrency,symbols,setFrom,from,setTo,to,setAmount}) => {


    return (
    <div className="form">
        <span className="amount">Amount</span>
        <input type="number" placeholder="Enter amount..." onChange={(e) => setAmount(e.target.value)}/>
        <div className="from-to-label">
            <span>From</span>
            <span>To</span>
        </div>
        <div className="currency-wrapper">
            <div className="currency-container">
                <div className="flag-container">
                    <div className={`currency-flag currency-flag-${from.label.toLocaleLowerCase()}`}></div>
                </div>          
                <Select options={symbols} onChange={setFrom} defaultValue={from} styles={customStyles}/>
            </div>
            <FaExchangeAlt size={28} onClick={() => {
                let temp = from;
                setFrom(to);
                setTo(temp);
            }}/>
            <div className="currency-container">
                <div className="flag-container">
                    <div className={`currency-flag currency-flag-${to.label.toLocaleLowerCase()}`}></div>
                </div>
                <Select options={symbols} onChange={setTo} defaultValue={to} styles={customStyles}/>
            </div>
        </div>
        
        <button onClick={convertCurrency}>Convert</button>
    </div>
  )
}

export default Selection