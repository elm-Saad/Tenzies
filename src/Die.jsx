import React from "react"
import Dotes from  "./Dotes"
import { nanoid } from 'nanoid'
export default function Die(props) {

    const dotesArray = new Array(props.value).fill(0)
    const dotesElements = dotesArray.map(() => (
        <Dotes 
            key={nanoid()}
        />
    ))
    return (
        <div 
            className={ !props.isHeld ? "die-face" : "die-face held"}
            onClick={props.handleDiceClick}
        >
            <h2 className="die-num">
                {dotesElements}
            </h2>
        </div>
    )
}