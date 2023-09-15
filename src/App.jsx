import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import Instructions from "./Instruction"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [userInfo, setUserInfo] = React.useState({
      rollsNum:0,
      isPlaying:false,
      isDone:false
    })

    React.useEffect(() => {
      const allHeld = dice.every(die => die.isHeld)
      const firstValue = dice[0].value
      const allSameValue = dice.every(die => die.value === firstValue)
      if (allHeld && allSameValue) {
        setTenzies(true)
        setUserInfo(({//as soone as the user win 
          rollsNum:0,
          isDone:true,
          isPlaying:false
        }))
      }
    }, [dice])

    function generateNewDie() {
      return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      }
    }
    
    function allNewDice() {
      const newDice = []
      for (let i = 0; i < 10; i++) {
        newDice.push(generateNewDie())
      }
      return newDice
    }
    
    function rollDice() {
        if(!tenzies) {
          setDice(oldDice => oldDice.map(die => {
              return die.isHeld ? 
                die :
                generateNewDie()
          }))
          //rollsNum handle
          setUserInfo(oldInfo => ({
            ...oldInfo,
            rollsNum:oldInfo.rollsNum + 1
          }))
        } else {//new game 
          setTenzies(false)
          setDice(allNewDice())
        }
    }

    function handleDiceClick(id) {
      //handle dice held
      setDice(oldDice => oldDice.map(die => {
          return die.id === id ? 
              {...die, isHeld: !die.isHeld} :
              die
      }))
      if(!tenzies) {
        setUserInfo(oldInfo => ({
          ...oldInfo,
          isDone:false,
          isPlaying:true,
        }))
      } else {//win => new game on dice click
        setTenzies(false)
        setDice(allNewDice())
      }
    }
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            id={die.id}
            value={die.value} 
            isHeld={die.isHeld} 
            handleDiceClick={() => handleDiceClick(die.id)}
        />
    ))
    return (
        <main>
            {tenzies && <Confetti />}
            <Instructions 
                rollDiceNum={userInfo.rollsNum}
                isPlaying={userInfo.isPlaying}
                isDone={userInfo.isDone}
            />
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}
