import './index.css'
import logo from './assets/TecnoLogo.webp'
import Card from './componentss/Card'
import { useEffect, useRef, useState } from 'react'

function generateGame(){
  const randomArray = [1,1,2,2,3,3,4,4,5,5,6,6].sort((a,b) => {
    const rand = Math.random()
      if(rand < 0.5)
        return 1
      else
        return -1
  })

  return randomArray
}

function App() {
  const [gameArray, setGameArray] = useState(generateGame())
  const [flipState, setFlipState] = useState(Array(gameArray.length).fill("not flipped"))
  const [moves, setMoves] = useState(0)
  const [timer, setTimer] = useState(0)
  const startTimeRef = useRef(Date.now())
  const flipCounter = flipState.reduce((count, state) => {
    if(state === "flipped")
      return count + 1
    return count
  }, 0)

  function resetGame(){
    setGameArray(generateGame())
    setFlipState(Array(gameArray.length).fill("not flipped"))
    setMoves(0)
    setTimer(0)
    startTimeRef.current = Date.now()
  }

  const gameEnd = flipState.every(state => state === "correct")

  useEffect(() => {
    if(!gameEnd){
      const timerInterval = setInterval(() => {
        const currentStamp = Date.now()
        const elapsedTime = currentStamp - startTimeRef.current
        setTimer(Math.floor(elapsedTime / 1000))
      }, 1000)

      return () => {clearInterval(timerInterval)}
    }
  },[gameEnd, startTimeRef])

  useEffect(() => {
    if(flipCounter !== 2) return
    const timer = setTimeout(() => {
      const gussed = flipState.reduce((gussedArr, state, index) => {
        if(state === "flipped")
          return [...gussedArr, gameArray[index]]
        return [...gussedArr]
      },[])
      const isCorrect = gussed[0] == gussed[1]
      setFlipState(prev => prev.map(state => {
        if(state === "flipped")
          if(isCorrect) return "correct"
          else return "not flipped"
        else
          return state
      }))
    }, 1000);
    return () => clearTimeout(timer)
  },[flipState])
  
  return (
      <div className="container">
        <div className="game-container">
          <header className="header">
              <img id="logo" src={logo} alt="" />
              <div className="stats-box" style={gameEnd ? {visibility: "hidden"} : {visibility: "visible"}}>
                  <p>MOVES: {moves}</p>
                  <p>TIME: {timer}s</p>
              </div>
          </header>

          <h1 className="game-title">MEMORY MATCH</h1>
          <main className="grid-container">
            {
              flipState.map((card,index) => {
                return <Card key={index} flipState={flipState} flipCounter={flipCounter} index={index} setFlipState={setFlipState} img={gameArray[index]} setMoves={setMoves}/>
              })
            } 
          </main>
          <footer className="footer">
              <p>CAMON 50</p>
          </footer>
          {gameEnd && <div className="win-modal">
            <div className='modal-content'>
              <h2>You win</h2>
              <h3>Moves: {moves}</h3>
              <h3>Time: {timer}s</h3>
              <button className='btn' onClick={resetGame}>Play Again</button>
            </div>
          </div>}
        </div>
      </div>

  )
}

export default App
