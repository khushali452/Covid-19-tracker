import React ,{ useState , useEffect } from "react";
import {MenuItem, FormControl, Select } from "@material-ui/core";
import './App.css';
import Map from './Map';
import  Infobox from './Infobox';

function App() {
  const[countries,setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');

  useEffect(() => {
    const getCountriesData = async () =>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => ({
          name: country.country,
          value:country.countryInfo.iso2,
        }));

        setCountries(countries)
      });
    };
    getCountriesData();
   
  }, [])

const onCountryChange = async (event) => {
  const countryCode = event.target.value;
  setCountry(countryCode);
};


  return (
    <div className="App">
      <div className ="app__header">
      <h1> Covid 19 tracker</h1>
      <FormControl className="app__dropdown">
      <Select
      variant="outlined" 
      onChange={onCountryChange}
      value={country} >
        <MenuItem value="worldwide">Worldwide</MenuItem>
         {
           countries.map((country) => (
            <MenuItem value={country.value}>{country.name}</MenuItem>
           ))
         }
        
        
        </Select> 
        </FormControl>

      </div>
      
    <div className="app__stats">

      <Infobox title="Covid Cases" cases = {123} total = {2000}></Infobox>
      <Infobox title="Recovered" cases = {1234} total = {2001}></Infobox>
      <Infobox title="Deaths" cases = {12345} total = {2002}></Infobox>
      {/* infobox */}
      {/* infobox */}
      {/* infobox */}

    </div>

      
      {/* table */}
      {/* graph */}

      <Map />
      {/* map */}
    </div>
  );
}

export default App;
