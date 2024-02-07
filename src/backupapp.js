import './App.css';
import {useEffect, useState} from "react";
import pattern from './pattern';

const init = [
  "","","",
  "","","",
  "","","",
];

function App() {


  const [board, setBoard] = useState([...init]);

  const [player, setPlayer] = useState('X');

  const [lIdx, setLidx] = useState(-1);




  const changeTile = (idx) => {
    // console.log(player, i);
    if(board[idx] !== "") return;
    
    setLidx(idx);

    setBoard ((board) => {
      return board.map((val, i) => {
        if(i == idx) return player;
        return val;
      });
    });
    // console.log("result",result )

    setPlayer(player === "X" ? "O" : "X");
  }

  const checkWin = () => {
    if (lIdx < 0) return;
    const checkArr = pattern[lIdx];
    const prevPlayer = player === "X" ? "O" : "X" ;
    checkArr.forEach((arr) => {
      if(
        board[arr[0]] === prevPlayer && 
        board[arr[1]] === prevPlayer && 
        board[arr[2]] === prevPlayer 
        ){
        alert(`${prevPlayer} won the game`)
        reset();
      };
    })
    // console.log('checking board')
  };

  const reset = () => {
    setBoard([...init]);
    setPlayer("X");
    setLidx(-1);
  }

  useEffect(() => {
    checkWin();
    localStorage.setItem("scores", JSON.stringify(scores));
  }, [board, scores]); 
  return (
    
    <div className="App">
      <div className="header"> Tic Tac Toe </div>
      <div>
        <p> current player is : {player}</p>
      </div>
      <div className="board">
        {board.map((sq,i) => {
          return <div className="board_tiles" onClick={() => changeTile(i)}>{sq}</div>
        })}
      </div>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default App;
