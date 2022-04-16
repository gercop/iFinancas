import React, {useState} from "react";
import "./tables.css";
import { currencyFormat } from "../../libs/general"

const Row = ({ record }) => {
    const keys = Object.keys(record)
    return (
        <tr key={record.id}>            
            <td> {record["mesesName"]} </td>
            <td> {currencyFormat(record["receitas"])} </td>
            <td> {currencyFormat(record["despesas"])} </td>            
            <td> {currencyFormat(record["despesas_isentas"])} </td>
            <td> {currencyFormat(record["receitas_adicionais"])} </td>
            <td> {currencyFormat(record["valor_liquido"])} </td>
        </tr>
    )
}

const Table = ({ data }) => {    
    return (
        <table className="table-demonstrativo-anual">
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
            {data.map( record => <Row record={record}/> )}
        </tbody>
    </table>        
    )
}

export default Table


