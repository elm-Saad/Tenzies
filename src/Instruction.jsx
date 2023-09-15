import React from "react"

export default function Instructions(props){
    const [seconds, setSeconds] = React.useState(0)

    React.useEffect(() => {
        const bestTimeFromLocalStorage = localStorage.getItem("time")
        if (props.isDone && !props.isPlaying && (bestTimeFromLocalStorage === null || seconds < bestTimeFromLocalStorage)) {
            localStorage.setItem("time", seconds)
            // console.log('setItem -> true')
        }
    }, [props.isDone])

    React.useEffect(() => {
        let interval
        if (props.isPlaying) {
          interval = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds + 1)
          }, 1000)
        }else{
            clearInterval(interval)
            setSeconds(0)
        }
        //side effect handle 
        return () => {
          clearInterval(interval)
        }
    },[props.isPlaying])

    return (
        <div className="info">
            <h1 className="title">Tenzies</h1>
            <ul className="user-data">
                <li>
                    <span>rolls</span>
                    <span>{props.rollDiceNum}</span>
                </li>
                <li>
                    <span>time</span>
                    <span>{seconds}</span>
                </li>
                <li>
                    <span>score</span>
                    <span>{localStorage.getItem("time") || 0}</span>
                </li>
            </ul>
            <p className="instructions">
                Roll until all dice are the same. 
                Click each die to freeze it at its current value between rolls.
            </p>
        </div>
    )
}