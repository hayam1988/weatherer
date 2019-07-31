import React from 'react';
import './App.css';
import logo from './Weatherlogo.png'
/* how to implement this*/
/*import Div100vh from 'react-div-100vh'*/
/*import Button from '@material-ui/core/Button';*/
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment'
import { Bar } from 'react-chartjs-2'

/* ant ui kit */

import { Button } from 'antd';
import 'antd/es/button/style/css'; // for css
import { Spin, Icon } from 'antd';
import { Input } from 'antd';
import 'antd/es/input/style/css'; // for css
const { Search } = Input;



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

    if (r.status === 200) {
      //set thet weather in state and loading to false and text is an empty string
      this.setState({ weather: json.list, loading: false, text: '', error: null })
    } else {
      this.setState({ error: json.message, loading: false })
    }
  }

  render() {
    //extract the peices of state  of state so we can 
    var { weather, loading, text, error } = this.state
    console.log(weather)

    var data
    if (weather) {

      data = {
        labels: weather.map(w => moment(w.dt * 1000).calendar()),
        datasets: [{
          label: 'Temperature',
          data: weather.map(w => w.main.temp),
          borderWidth: 1,
          /*backgroundColor: 'rgba(132,99,255,0.2)',
          backgroundColor: 'rgba(22, 165, 170, 0.5)',
          font color needs to change*/
          backgroundColor: 'rgba(26, 150, 133, 0.8)',
          borderColor: 'rgba(132,99,255,1)',
          color: 'white',
          hoverBackgroundColor: 'rgba(132,99,255,0.4)',
          hoverBorderColor: 'rgba(132,99,255,1)',

        }]
      }
    }
    return (

      <div className="App"> search_weather
       <img src={logo} className="logo" alt="logo of weather" />


        <form className="App-header" onSubmit={this.getWeather}>


          <Input
            value={text}
            placeholder="Search for weather"
            onSearch={value => console.log(value)}
            onChange={e => this.setState({ text: e.target.value })}
            style={{ width: '70%', marginLeft: 8 }}
          />



          <Button
            type="submit"
            icon="search"
           ghost
            disabled={loading || !text}
            style={{ height: '50px', width: 100, marginLeft: '0 10px', color: 'white'}}
          >
            Search
              {loading && <Icon type="loading" style={{ fontSize: 7 }} spin />}
          </Button>
        </form>

        <main>
          {data && <Bar
            data={data}
            width={800}
            height={300}
          /*  options={{ maintainAspectRatio: false}}*/

          />}
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </main>
      </div>

    );
  }
}

export default App;
