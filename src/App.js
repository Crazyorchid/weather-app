import React, {useState} from 'react';

const api ={
  key: "fc6573b46f6648feb8f174820211810",
  //base:"api.openweathermap.org/data/2.5/"
}
function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt =>{
    if (evt.key ==="Enter"){
      fetch(`http://api.weatherapi.com/v1/current.json?key=${api.key}&q=${query}&aqi=yes`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      });
    }
  }

  const dateBuilder = (d)=>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className={(typeof weather.current !="undefined") ? ((weather.current.temp_c > 16) ? 'App warm' : 'App'):'App'}>
      <main>
        <div className="search-box">
          <input type="text"
          className = "search-bar" 
          placeholder="Search..." 
          onChange={e=>setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
        </div>
        <div>
          {(typeof weather.current !="undefined") ?(
         <div>
            <div className="location-box">
            <div className="location">{weather.location.name}, {weather.location.region}, {weather.location.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.current.temp_c)}&deg;c
            </div>
            <div className="weather">{weather.current.condition.text}</div>
          </div>
         </div>
          ) : ('')}
        </div>
      </main>
    </div>
  );
}

export default App;
