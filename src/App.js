
import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import InfoBox from './InfoBox';
import LineGraph from './LineGraph';
import Map from './Map';
import Table from "./Table"
import { sortData } from './util';

function App() {

  //https://disease.sh/v3/covid-19/countries

  // USE EFFECT = runs a piece of code 
  // based on a given condition

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('Worldwide');
  const [countryInfo, setcountryInfo] = useState([])
  const [tableData,settableData]=useState([])
  useEffect(() => {

    fetch('https://disease.sh/v3/covid-19/all')
      .then(res => res.json())
      .then(data => {
        setcountryInfo(data);
      })

  }, [])

  useEffect(() => {

    const getCountryData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country,
              value: country.countryInfo.iso2,
            }
          ));

          const sortedData=sortData(data);

          settableData(sortedData)
          setCountries(countries);

        })
    }

    getCountryData();
  }, [])


  // The code inside here will run once 
  // when the component loads and not again
  // async -> send a request wait for it , do something

  const handleChange = (e) => {
    const countryCode = e.target.value;

    setCountry(countryCode);

    const url = countryCode === 'Worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCountry(countryCode)

        // All of the data from the country response
        setcountryInfo(data);

      });


    //https://disease.sh/v3/covid-19/all

     

  }

  console.log(countryInfo);



  return (
    <div className="App">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid 19 tracker</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" value={country} onChange={handleChange}>

              {/** Loop through all the countries and show a drop down  */}
              {/*<MenuItem value="worldwide">worldwide</MenuItem>
            <MenuItem value="worldwide">worldwide</MenuItem>
            <MenuItem value="worldwide">worldwide</MenuItem>
            <MenuItem value="worldwide">worldwide</MenuItem> */}
              <MenuItem value="Worldwide">Worldwide</MenuItem>

              {
                countries.map((country) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>

        {/** Header */}
        {/** Title Select input dropdown box */}

        {/** InfoBox */}

        <div className="app__stats">
          {/** InfoBox */}
          {/** InfoBox */}
          {/** InfoBox */}
          <InfoBox title="Confirmed Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox title="Recovered Cases" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />


        </div>
        {/** Map */}
        <Map />
      </div>

      <Card className="app__right">
        <CardContent>
          {/** Table */}
          <h3>Live Cases by country</h3>
          <Table  countries={tableData}/>
          {/** Graph */}
          <h3>Worldwide new Cases</h3>
          <LineGraph/>

        </CardContent>
      </Card>
    </div>
  );
}

export default App;
