import React, { useEffect, useState } from "react";
import './App.css';
import Axios from "axios";
import Card from "./comps/cards/cards.js";
import Table from "./comps/tables/tables.js";
import NumberFormat from 'react-number-format';
import {currencyFormat} from "./libs/general";
import iconeMain from './figs/main.png'

function App() {

  const [values, setValues] = useState();
  const [listLanc, setListLanc] = useState([]);    
  console.log(listLanc);
  
  useEffect( ()=> {
    Axios.get("http://localhost:3001/getLancamentosAnualPorMes").then( (response)=>{
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
      idConta           : values.idConta,
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
          idConta           : values.idConta,
          idUsuario         : values.idUsuario,
          valor             : values.valor,
          juros             : values.juros
        }
      ])
    });
  };

  return (

    <div className="app-main"> 
    
      <div className="app-header">
        <img id="iconeMain" src={iconeMain}/>
        <h1 id="titleMain"> SISTEMA FINANCEIRO PESSOAL</h1>
      </div>

      <div className="app-container">
        <div className="app-container-menu">
          <nav>
            <ul>
              <li> <a href=""> MENU PRINCIPAL </a> </li>
              <li> <a href=""> LANÇAMENTOS </a> </li>              
              <li> <a href=""> SIMULADOR</a></li>         
              <li> <a href=""> INSTITUIÇÕES</a></li>
              <li> <a href=""> CONTAS</a></li>              
              <li> <a href=""> USUÁRIO</a></li>                          
            </ul>
          </nav>
        </div>

        <div className="app-container-content">
          
          <h1 className="register-title"> Demonstrativo Anual de Lançamentos</h1>          

          {listLanc.length > 0  && <Table className="table-demonstrativo" data={listLanc}/> } 
        </div>  
      </div>
    </div>
  );
}

export default App;
