import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment'
import { Bar } from 'react-chartjs-2'



class App extends React.Component {
  state = {
    weather: null,
    loading: false,
    text: '',
  }

  getWeather = async (e) => {
    e.preventDefault() // no refreshing when searching
    this.setState({ loading: true, weather: null })
    var key = 'bfc8f5b2eabca4875bc14b9db2704655'
    var url = `https://api.openweathermap.org/data/2.5/forecast?q=${this.state.text}&units=imperial&APPID=${key}`
    var r = await fetch(url)
    var json = await r.json()
    console.log(json)

    if (r.status===200){
    //set thet weather in state and loading to false and text is an empty string
    this.setState({ weather: json.list, loading: false, text: '', error:null})
    } else{
      this.setState({error: json.message, loading: false,})
    }
  }

  render() {
    //extract the peices of state  of state so we can 
    var { weather, loading, text, error } = this.state
    console.log(weather)

    var data
    if (weather) {

      data = {
        labels: weather.map(w => moment(w.dt*1000).format('llll')),
        datasets: [{
          label: 'Temperature',
          data: weather.map(w => w.main.temp),
          borderWidth: 1,
          backgroundColor: 'rgba(132,99,255,0.2)',
          borderColor: 'rgba(132,99,255,1)',
          hoverBackgroundColor: 'rgba(132,99,255,0.4)',
          hoverBorderColor: 'rgba(132,99,255,1)',

        }]
      }
    }
    return (
      <div className="App"> search_weather
        <form className="App-header" onSubmit={this.getweather}>
          <TextField className=".MuiInputBase-input"
            value={text}
            label="Search for weather"
            variant="outlined"

            onChange={e => this.setState({ text: e.target.value })}
            style={{ width: '100%', marginLeft: 8 }}
          />
          <Button variant=" contained"
            color="primary"
            type="submit"
            disabled={loading || !text}
            style={{ width: 150, margin: '0 10px', height: '75', color: 'white' }} >
            <SearchIcon style={{ margnRight: 8 }} />
            Search
          {loading && <CircularProgress size={24} />}
          </Button>
        </form>

        <main>
          {data && <Bar 
            data={data}
            width={100}
            height={50}
         /*  options={{ maintainAspectRatio: false}}*/

    />}
    {error && <div style= {{color: 'red'}}>{error}</div>}
        </main>
      </div>
    );
  }
}

export default App;
