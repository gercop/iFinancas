import React, {useState} from "react";
import "./tables.css";
import { currencyFormat } from "../../libs/general"

const Row = ({ record }) => {
    const keys = Object.keys(record)
    return (
        <tr key={record.id}>
            {
                keys.map( key => <td key={key}> {record[key]} </td>)
            }
        </tr>
    )
}

const Table = ({ data }) => {
    const keys = Object.keys(data[0])
    return (
        <table classame="tbLancamentos">
        <thead>
            <tr>
                <td> <strong>ID</strong></td>
                <td> <strong>Data Lançamento</strong></td>
                <td> <strong>Mês</strong></td>
                <td> <strong>Receitas</strong></td>
                <td> <strong>Despesas</strong></td>
                <td> <strong>Desp. Isentas</strong></td>
                <td> <strong>Rec. Adicionais</strong></td>
                <td> <strong>Valor Líquido</strong></td>
            </tr>                        
        </thead>                                
        <tbody>                          
            {data.map(record => <Row record={record}/>)}
        </tbody>
    </table>        
    )
}

export default Table


