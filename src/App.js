import {
  MenuItem,
  FormControl,
  Select
} from "@material-ui/core";
import React ,{ useState } from "react";
import './App.css';

function App() {
  const[countries,setCountries] = useState([
    'INDIA','USA','UK'
  ])
  return (
    <div className="App">
      <div className ="app__header">
      <h1> Covid 19 tracker</h1>
      <FormControl className="app__dropdown">
      <Select
      variant="outlined" 
      value="abc">
         {
           countries.map((country) => (
            <MenuItem value={country}>{country}</MenuItem>
           ))
         }
        
        
        </Select> 
        </FormControl>

      </div>
      

      {/* header */}
      {/* title */}
      {/* infobox */}
      {/* infobox */}
      {/* infobox */}
      {/* table */}
      {/* graph */}
      {/* map */}
    </div>
  );
}

export default App;
