import "./styles.css";
import {useState} from "react";

export default function App() {
  const [counter, setCounter] = useState (0); // Hook





  return (
    <div className="App">
      
      <button onClick={() => {
        setCounter(counter + counter + 1);
        console.log(counter);
      }}>Like</button>

      <p>{counter}</p>


    </div>
  );
}
