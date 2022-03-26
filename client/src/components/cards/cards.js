import React, {useState} from "react";
import "./cards.css";
import FormDialog from "../dialog/dialog";
export default function Card(props) {

    const [open, setOpen] = React.useState(false);

    const handleClickCard = () => {
        setOpen(true);
    }
    return (
        <>
        <FormDialog open={open} setOpen={setOpen} 
            idgames={props.idgames}
            name={props.name} 
            cost={props.cost} 
            category={props.category} 
            listCard={props.listCard}
            setListCard={props.setListCard}/>
        <div className="card-container" onClick={() => handleClickCard()}>
            <h1 className="card-title">{props.name} ({props.idgames})</h1>            
            <p className="card-category">{props.category}</p>
            <h3 className="card-cost">R${props.cost}</h3>
        </div>
      </>
    )
}