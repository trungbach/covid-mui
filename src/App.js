import './App.css';
import React, { useState, useEffect } from 'react';
import { FormControl, Select, MenuItem, Card, CardContent, Grid } from '@material-ui/core';
// import CountUp from 'react-countup'; 
import InfoBox from './InfoBox';
import LineGraph from './LineGraph';
import Table from './Table';
import Map from './Map';
import {prettyPrintStat} from './util';

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] =  useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapZoom, setMapZoom] = useState(2);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState('cases');

  useEffect(() => {
    const getCountriesData = async () => {
        await fetch('http://disease.sh/v3/covid-19/countries')
          .then(response => response.json())
          .then(data => {
            const countries = data.map(country => ({
              name: country.country,
              value:  country.countryInfo.iso2
            }));

            setMapCountries(data);
            setTableData(data);
            setCountries(countries);
          })
        await fetch('http://disease.sh/v3/covid-19/all')
        .then(response => response.json())
        .then(data => {
          setCountryInfo(data);
        })
    }  
    getCountriesData(); 
  }, []);

  const onChangeCountry = async (e) => {
     const country = e.target.value;
     const url = country === 'worldwide' ? 'http://disease.sh/v3/covid-19/all' : `http://disease.sh/v3/covid-19/countries/${country}`;
    
     await fetch(url)
     .then(response => response.json()) 
     .then(data => {
        setCountry(country);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(6);
     })
  }

  return (
    <div className="app">
      <div className='app__left'>
        <div className='app__header'>
          <h1>COVID19-TRACKER</h1>
          <FormControl className='app__dropdown'>
            <Select variant='outlined' value={country} onChange={onChangeCountry}>
              <MenuItem value='worldwide'>Worldwide</MenuItem>
              {countries.map(country => <MenuItem value={country.value}>{country.name}</MenuItem>)}
            </Select>
          </FormControl>
        </div>

        <div className='app_stats'>
          <InfoBox title='Coronavirus cases' 
            isRed
            active={casesType === 'cases'}
            casesType={casesType}
            onClick={(e) => setCasesType('cases')}
            cases={prettyPrintStat(countryInfo.todayCases)} 
            total={prettyPrintStat(countryInfo.cases)} />
          <InfoBox title='Recovered' 
            active={casesType === 'recovered'}
            onClick={(e) => setCasesType('recovered')}
            cases={prettyPrintStat(countryInfo.todayRecovered)} 
            total={prettyPrintStat(countryInfo.recovered)} />
          <InfoBox title='Deaths' 
            isRed
            active={casesType === 'deaths'}
            onClick={(e) => setCasesType('deaths')}
            cases={prettyPrintStat(countryInfo.todayDeaths)} 
            total={prettyPrintStat(countryInfo.deaths)} />
        </div>

        <Map
            countries={mapCountries}
            casesType={casesType}
            center={mapCenter}
            zoom={mapZoom}
        />
      </div>
      <Card className='app__right'>
        <CardContent>
           <h3>Live Cases by Country</h3>
           <Table countries={tableData}/>
           <h3>Worldwide new {casesType}</h3>
           <LineGraph className='app_graph' casesType={casesType}/>
        </CardContent>
      </Card>
    </div>

    
  );
}

export default App;
