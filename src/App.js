import KeyListener from 'react-key-listener'
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const pallet = {
    '0': '#90CAF9',
    '2': '#1DE9B6',
    '4': '#FFAB91', 
    '8': '#D1C4E9',
    '16': '#FFF59D',
    '32': '#A5D6A7', 
    '64': '#80CBC4', 
    '128': '#F48FB1', 
    '256': '#81D4FA', 
  };

  const [matrix, setMatrix] = useState([
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ]);

  const handleChange = (row, column, value) => {
    let copy = [...matrix];
    copy[row][column] = + value;
    setMatrix(copy);
  };

  const random2 = () => {
    let x = Math.floor(Math.random() * 4);
    let y = Math.floor(Math.random() * 4);
    while (matrix[x][y] != 0) {
      x = Math.floor(Math.random() * 4);
      y = Math.floor(Math.random() * 4);
    }
    handleChange(x, y, 2);
  }

  const random4 = () => {
    let x = Math.floor(Math.random() * 4);
    let y = Math.floor(Math.random() * 4);
    while (matrix[x][y] != 0) {
      x = Math.floor(Math.random() * 4);
      y = Math.floor(Math.random() * 4);
    }
    handleChange(x, y, 4);
  }

  const checkValid = () => {
    for (let i=0; i<4; i++) {
      for (let j=0; j<4; j++) {
        if (matrix[i][j] == 0) return true
      }
    }
    return false
  }

  const left = () => {
    for (let i=0; i<4; i++) {
      for (let j=0; j<3; j++) {
        for (let k=j+1; k<4; k++) {
          if (matrix[i][k] == matrix[i][j]) {
            handleChange(i, j, matrix[i][j]*2);
            handleChange(i, k, 0);
            break;
          } else if (matrix[i][k] != 0) {
            break;
          }
        }
      }
      let ind = -1;
      for (let j=0; j<4; j++) {
        if (matrix[i][j] == 0) {
          ind = j;
          break;
        }
      }
      if (ind != -1) 
      for (let j=ind+1; j<4; j++) {
        if (matrix[i][j] != 0) {
          let temp = matrix[i][j]
          handleChange(i, j, 0);
          handleChange(i, ind++, temp);  
        }
      }
    }
    Math.floor(Math.random() * 2) ? random2() : random4();
    reset();
  }

  const right = () => {
    for (let i=0; i<4; i++) {
      for (let j=0; j<3; j++) {
        for (let k=j+1; k<4; k++) {
          if (matrix[i][k] == matrix[i][j]) {
            handleChange(i, j, matrix[i][j]*2);
            handleChange(i, k, 0);
            break;
          } else if (matrix[i][k] != 0) {
            break;
          }
        }
      }
      let ind = -1;
      for (let j=3; j>=0; j--) {
        if (matrix[i][j] == 0) {
          ind = j;
          break;
        }
      }
      if (ind != -1) 
      for (let j=ind-1; j>=0; j--) {
        if (matrix[i][j] != 0) {
          let temp = matrix[i][j]
          handleChange(i, j, 0);
          handleChange(i, ind--, temp);  
        }
      }
    }
    Math.floor(Math.random() * 2) ? random2() : random4();
    reset();
  }

  const up = () => {
    for (let i=0; i<4; i++) {
      for (let j=0; j<3; j++) {
        for (let k=j+1; k<4; k++) {
          if (matrix[k][i] == matrix[j][i]) {
            handleChange(j, i, matrix[j][i]*2);
            handleChange(k, i, 0);
            break;
          } else if (matrix[k][i] != 0) {
            break;
          }
        }
      }
      let ind = -1;
      for (let j=0; j<4; j++) {
        if (matrix[j][i] == 0) {
          ind = j;
          break;
        }
      }
      if (ind != -1) 
      for (let j=ind+1; j<4; j++) {
        if (matrix[j][i] != 0) {
          let temp = matrix[j][i]
          handleChange(j, i, 0);
          handleChange(ind++, i, temp);  
        }
      }
    }
    Math.floor(Math.random() * 2) ? random2() : random4();
    reset();
  }

  const down = () => {
    for (let i=0; i<4; i++) {
      for (let j=0; j<3; j++) {
        for (let k=j+1; k<4; k++) {
          if (matrix[k][i] == matrix[j][i]) {
            handleChange(j, i, matrix[j][i]*2);
            handleChange(k, i, 0);
            break;
          } else if (matrix[k][i] != 0) {
            break;
          }
        }
      }
      let ind = -1;
      for (let j=3; j>=0; j--) {
        if (matrix[j][i] == 0) {
          ind = j;
          break;
        }
      }
      if (ind != -1) 
      for (let j=ind-1; j>=0; j--) {
        if (matrix[j][i] != 0) {
          let temp = matrix[j][i]
          handleChange(j, i, 0);
          handleChange(ind--, i, temp);  
        }
      }
    }
    Math.floor(Math.random() * 2) ? random2() : random4();
    reset();
  }

  const reset = () => {
    if (!checkValid()) {
      let tempMatrix = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
      ];
      let x = Math.floor(Math.random() * 4);
      let y = Math.floor(Math.random() * 4);
      tempMatrix[x][y] = 2;
      tempMatrix[x + 1 < 4 ? x + 1 : x - 1][y] = 2;
      setMatrix(tempMatrix)
      alert("con ga")
    }
  }

  useEffect(() => {
    random2();
    random2();
  }, [])

  return (
    <div tabIndex={0 /* allow this div to be given user focus */}>
        <KeyListener keyDownHandlers={{
          "ArrowLeft": left,
          "ArrowRight": right,
          "ArrowUp": up,
          "ArrowDown": down
        }} />
    <div className="App">    
      <div className="container">    
        <div className="row justify-content-center" >
          <h1>2048</h1>
        </div>
        <div className="row">
        {matrix.map((value, i) => {
          return <div className="col-md-12" >
            {value.map((v, j)=> {
              return <input 
              style={{backgroundColor: pallet[v]}}
              value={v == 0 ? "" : v}
              onChange={null}/>
            })}
          </div>
        })}
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
