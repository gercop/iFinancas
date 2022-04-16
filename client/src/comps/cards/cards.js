import React, {useState} from "react";
import "./cards.css";
import FormDialog from "../dialog/dialog";
import NumberFormat from 'react-number-format';
import { currencyFormat } from "../../libs/general"

export default function Card(props) {    

    const [open, setOpen] = React.useState(false);

    const handleClickLanc = () => {
        setOpen(true);
    }

    return (
        <>
        <FormDialog open={open} setOpen={setOpen}             
            dtLancamento        = {props.dtLancamento} 
            meses               = {props.meses}
            receitas            = {props.receitas}
            despesas            = {props.despesas}
            despesas_isentas    = {props.despesas_isentas}
            receitas_adicionais = {props.receitas_adicionais}
            valor_liquido       = {props.valor_liquido}                        
            listLanc            = {props.listLanc}
            setListLanc         = {props.setListLanc}/>

        <div className="card-container" onClick={() => handleClickLanc()}>           
            <div>
                <table id="tbLancamentos">
                    <thead>
                        <tr>
                            <td> <strong>Mês</strong></td>
                            <td> <strong>Receitas</strong></td>
                            <td> <strong>Despesas</strong></td>
                            <td> <strong>Desp. Isentas</strong></td>
                            <td> <strong>Rec. Adicionais</strong></td>
                            <td> <strong>Valor Líquido</strong></td>
                        </tr>                        
                    </thead>
                    <tbody>                          
                        <tr key={props.idLancamento}>
                            <td> {props.meses} </td>                        
                            <td> {currencyFormat(props.receitas)} </td>
                            <td> {currencyFormat(props.despesas)} </td>
                            <td> {currencyFormat(props.despesas_isentas)} </td>
                            <td> {currencyFormat(props.receitas_adicionais)} </td>
                            <td>                                
                                <NumberFormat          
                                    value={props.valor_liquido}
                                    displayType={'text'} 
                                    thousandSeparator={'.'} 
                                    decimalSeparator={','} 
                                    prefix={'R$ '}                  
                                />                                
                            </td>
                        </tr>                               
                    </tbody>
                </table>
            </div>            
        </div>
    </>
    ) 
}