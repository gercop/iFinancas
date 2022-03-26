import React, { useEffect, useState } from "react";
import './App.css';
import Axios from "axios";
import Card from "./components/cards/cards.js";

function App() {

  const [values, setValues] = useState();
  const [listCard, setListCard] = useState([]);
  console.log(listCard);

  const handleChangeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const handleClickButton = () => {
    Axios.post("http://localhost:3001/register", {
      idgames : values.idgames,
      name    : values.name,
      cost    : values.cost,
      category: values.category
    }).then(  ()=> {
      setListCard([
        ...listCard,
        {
          idgames : values.idgames,
          name    : values.name,
          cost    : values.cost,
          category: values.category
        }
      ])
    });
  };

  useEffect( ()=> {
    Axios.get("http://localhost:3001/getCards").then( (response)=>{
      setListCard(response.data);
    });
  }, []);

  return (
    <div className="app-container">
      <div className="register-container">        
        <h1 className="register-title"> Controle Financeiro </h1>
        <input type="text" name="name" placeholder="Nome" className="register-input" onChange={handleChangeValues} />
        <input type="text" name="cost" placeholder="Preço" className="register-input" onChange={handleChangeValues} />
        <input type="text" name="category" placeholder="Categoria" className="register-input" onChange={handleChangeValues} />
        <button className="register-button" onClick={() => handleClickButton()}>
          Cadastrar
        </button>        
      </div>   
            
      {typeof listCard !== "undefined" && listCard.map((value) => {
        return <Card
            key         = {value.idgames} 
            idgames     = {value.idgames}
            name        = {value.name}
            cost        = {value.cost}
            category    = {value.category}
            listCard    = {listCard} 
            setListCard = {setListCard}
          />
      })}
    </div>
  );
}

export default App;
