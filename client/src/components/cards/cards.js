import React, {useState} from "react";
import "./cards.css";
import FormDialog from "../dialog/dialog";
export default function Card(props) {

    const [open, setOpen] = React.useState(false);

    const handleClickLanc = () => {
        setOpen(true);
    }
    return (
        <>
        <FormDialog open={open} setOpen={setOpen} 
            idLancamento={props.idLancamento}
            dtLancamento={props.dtLancamento} 
            idTipoLancamento={props.idTipoLancamento} 
            idConta={props.idConta} 
            meses={props.meses}
            listLanc={props.listLanc}
            setListLanc={props.setListLanc}/>

        <div className="card-container" onClick={() => handleClickLanc()}>
        <p className="card-category">{props.meses}</p>            
            <h3 className="card-cost">R${props.valor}</h3>            
        </div>
      </>
    )
}