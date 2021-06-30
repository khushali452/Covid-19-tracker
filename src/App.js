import React, { useState, useEffect } from "react";
import "./App.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import Infobox from "./Infobox";
import LineGraph from "./LineGraph";
import Table from "./Table";
import { sortData, prettyPrintStat } from "./util";
import numeral from "numeral";
import Map from "./Map";
import "leaflet/dist/leaflet.css";



function App() {
  const[countries,setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo , setCountryInfo] = useState({});
  const [tableData , setTableData] =useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 });
  const [mapZoom, setMapZoom] = useState(3); 
  const [mapCountries, setMapCountries] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data)
      })
    
  }, [])

  useEffect(() => {
    const getCountriesData = async () =>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => ({
          name: country.country,
          value:country.countryInfo.iso2,
        }));

        const sortedData = sortData(data);

        setTableData(sortedData);
        setMapCountries(data);
        setCountries(countries);
      });
    };
    getCountriesData();
   
  }, [])

const onCountryChange = async (event) => {
  const countryCode = event.target.value;
  setCountry(countryCode);

  const url = countryCode=== 'worldwide' ? "https://disease.sh/v3/covid-19/all"
  : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

  await fetch(url)
  .then(response => response.json())
  .then(data => {
    setCountry(countryCode);
    setCountryInfo(data);
    
    setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
  })
};
console.log(countryInfo);

  return (
    <div className="App">
      <div className="app_left">
      <div className ="app__header">
      <h1> Covid-19 Tracker</h1>
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

      <Infobox title="Infected" cases = {prettyPrintStat(countryInfo.todayCases)} total = {countryInfo.cases}></Infobox>
      <Infobox title="Recovered" cases = {prettyPrintStat(countryInfo.todayRecovered)} total = {countryInfo.recovered}></Infobox>
      <Infobox title="Deaths" cases = {countryInfo.todayDeaths} total = {prettyPrintStat(countryInfo.deaths)}></Infobox>
      
    </div>

     

      <Map
      countries={mapCountries}
        center = {mapCenter}
        zoom= {mapZoom}
      />
      
    </div>

    <Card className="app_right">
      <CardContent>
        <h3>Live Cases by Country</h3>
        <Table countries={tableData} />
        <h3>Worldwide new cases</h3>
        <LineGraph />
        </CardContent>   

    </Card>

    </div>
  );
}

export default App;
