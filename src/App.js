
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


  const [winners, setWinners] = useState([]);

  useEffect(() => {
    const storedWinners = JSON.parse(localStorage.getItem("winners")) || [];
    setWinners(storedWinners);
  }, []);

  useEffect(() => {
    if(winners.length === 3){
      callFakeAPI();
    }
  });


  const callFakeAPI = async () => {
    console.log('calling the fake api');
    
    try {
      for (let index = 0; index < winners.length; index++) {
        const winner = winners[index];
        const postId = index + 1; 

        console.log('Simulating API call for winner:', winner);
        const postData = {
          userId: postId,
          title: `winner is ${index + 1}`,
          body: ` The winner is ${winner}`,
          id: postId
        };
  
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          body: JSON.stringify(postData),
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          },
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        console.log('Success:', data);
        console.log('id', data.id)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

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

    let winner = null;

    checkArr.forEach((arr) => {
      if(
        board[arr[0]] === prevPlayer && 
        board[arr[1]] === prevPlayer && 
        board[arr[2]] === prevPlayer 
        ){
        winner = prevPlayer;
        alert(`${prevPlayer} won the game`)
        // reset();
      };
    });

    if(winner){
      handleWinner(winner);
      reset()
    }
    // console.log('checking board')
  };

  const handleWinner = (winner) => {
    const updatedWinners = [...winners, winner];
    localStorage.setItem("winners", JSON.stringify(updatedWinners));
    setWinners(updatedWinners);
  }


  const handleShowWinners = () => {

    const lastFiveWinners = winners.slice(-5);
    

    const winnerCounts = {};
    lastFiveWinners.forEach(winner => {
        winnerCounts[winner] = (winnerCounts[winner] || 0) + 1;
    });

    let mostFrequentWinner = null;
    let highestCount = 0;
    Object.entries(winnerCounts).forEach(([winner, count]) => {
        if (count > highestCount) {
            mostFrequentWinner = winner;
            highestCount = count;
        }
    });

    alert(`title winner is  : ${mostFrequentWinner}`);
};


  const reset = () => {
    setBoard([...init]);
    setPlayer("X");
    setLidx(-1);
  }

  const clearLocalStorage = () => {
    localStorage.removeItem("winners");
    setWinners([]);
  }

  useEffect(() => {
    checkWin();
  }, [board]); 
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

      <button onClick={handleShowWinners}>Show last time Winner</button>
      <button onClick={clearLocalStorage}> clear local storage</button>
      <div>
      <h2>Previous Winners:</h2>
        <ul>
        {winners.map((winner, index) => (
            <li key={index}>{index + 1 } round winner is {winner}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
