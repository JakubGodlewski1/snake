import './App.css';
import {useEffect, useState} from "react";

function App() {
  const [board, setBoard] = useState([])
  const [snake, setSnake] = useState([0,1,2,3])
  const [cookie, setCookie] = useState(null)

  //initialize game
  useEffect(()=>{
    initializeGame()
  },[])

  const initializeGame = () => {
    //create cookie
    let cookie = Math.floor(Math.random()*400)
    setCookie(cookie)


    //create board
    let board = []
    for (let i = 0; i < 400; i++) {
      board.push({
        id: i,
        snake: snake.includes(i),
        cookie: cookie === i
      })
    }
    setBoard(board)
  }




  return (
    <div className="App">
      <div className="board">
        {board.length > 0 && board.map((el)=>{
          return <div className={`element ${el.cookie ? "cookie": ""} ${el.snake ? "snake" : ""}`} key={el.id}></div>
        })}
      </div>
    </div>
  );
}

export default App;
