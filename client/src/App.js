import React, { useEffect, useState } from "react";
import './App.css';
import Axios from "axios";
import Card from "./components/cards/cards.js";

function App() {

  const [values, setValues] = useState();
  const [listLanc, setListLanc] = useState([]);

  useEffect( ()=> {
    Axios.get("http://localhost:3001/getLancsMes").then( (response)=>{
      setListLanc(response.data);
    });
  }, []);

  const handleChangeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const handleClickButton = () => {
    Axios.post("http://localhost:3001/register", {
      idLancamento      : values.idLancamento,
      descricao         : values.descricao,
      dtLancamento      : values.dtLancamento,
      idTipoLancamento  : values.idTipoLancamento,
      idTipoConta       : values.idTipoConta,
      idUsuario         : values.idUsuario,
      valor             : values.valor,
      juros             : values.juros
    }).then(  ()=> {
      setListLanc([
        ...listLanc,
        {
          idLancamento      : values.idLancamento,
          descricao         : values.descricao,
          dtLancamento      : values.dtLancamento,
          idTipoLancamento  : values.idTipoLancamento,
          idTipoConta       : values.idTipoConta,
          idUsuario         : values.idUsuario,
          valor             : values.valor,
          juros             : values.juros
        }
      ])
    });
  };
  
  return (
    <div className="app-container">
      <div className="register-container">        
        <h1 className="register-title"> Lançamentos do Controle Financeiro </h1>        
        <input type="text" name="descricao"         placeholder="Descrição do Lançamento" className="register-input"      onChange={handleChangeValues} />
        <input type="text" name="dtLancamento"      placeholder="Data Lançamento"         className="register-input"      onChange={handleChangeValues} />

        <select name="idTipoLancamento" className="register-input" onChange={handleChangeValues} >
            <option value="1"selected>Receita</option>
            <option value="2">Despesa</option>
            <option value="3">Receita Adicional</option>
            <option value="4">Despesa Isenta</option>
            <option value="5">Depósito</option>
            <option value="6">Saque</option>
            <option value="7">Transferência</option>
            <option value="8">Montante Inicial</option>
            <option value="9">Renda Passiva</option>          
        </select>

        <select name="idTipoConta" className="register-input" onChange={handleChangeValues} >
            <option value="1"selected>Conta Corrente</option>
            <option value="2">Conta Poupança</option>
        </select>

        <select name="idUsuario" className="register-input" onChange={handleChangeValues} >
            <option value="1"selected>Ricardo</option>         
        </select>        
        
        <input type="text" name="valor"             placeholder="Valor"                   className="register-input-real" onChange={handleChangeValues} />
        <input type="text" name="juros"             placeholder="Juros"                   className="register-input-real" onChange={handleChangeValues} />
        <button className="register-button" onClick={() => handleClickButton()}>
          Incluir Lançamento
        </button>        
      </div>   
            
      {typeof listLanc !== "undefined" && listLanc.map((value) => {
        return <Card
            key           = {value.idLancamento} 
            idLancamento  = {value.idLancamento}
            meses         = {value.meses}
            descricao     = {value.descricao}
            dtLancamento  = {value.dtLancamento}
            valor         = {value.valor}
            juros         = {value.juros}
            listLanc      = {listLanc} 
            setListLanc   = {setListLanc}
          />
      })}
    </div>
  );
}

export default App;
