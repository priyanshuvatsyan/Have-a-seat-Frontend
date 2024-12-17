import './styles/BestdeliveredCard.css'
import React from 'react';

export default function BestDeliveredCard(props) {
    return (
        <div className="main-bd-container">
            <div className='BD-card-container' >
                <img src={props.foodItem.img} alt="" />
                <h5>{props.foodItem.name}</h5>
                <p> Order Now... </p>
            </div>
        </div>
    )
}
