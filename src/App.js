import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';



class App extends React.Component {
  state = {
    memes: [],
    loading: false,
    text: '',
  }

  getMemes = async (e) => {
    e.preventDefault() // no refreshing when searching
    this.setState({ loading: true })
    var key = 'wP9iA7nFzpyz2JQtDNwrbBDfkAqpwTPP'
    var url = `http://api.giphy.com/v1/gifs/search?q=${this.state.text}&api_key=${key}`
    var r = await fetch(url)
    var json = await r.json()
    this.setState({ memes: json.data, loading: false, text: '' })
  }

  render() {
    var { memes, loading, text } = this.state
    return (
      <div className="App"> Memmer
        <form className="App-header" onSubmit={this.getMemes}> 
          <TextField value={text}
          label="Search for Memes"
          varient="outlined"
          margin="normal"
          
          onChange={e => this.setState({ text: e.target.value })} 
        style = {{width:'100%', marginLeft: 8}}
         />
          <Button variant=" contained"
          color="primary"
          type="submit"
          disabled={loading || !text}
          style = {{ margin: '0 10px', height: '75'}} >
          <SearchIcon style={{margnRight:8}}/>
          Search
           </Button>
        </form>

      <main>
            {memes.map(meme=>{
              return <Meme key={meme.id} meme={meme} />
            })}
      </main>
      </div>
  );
  }
}


function Meme(props){
  const {meme} = props
  const url = meme.images.fixed_height.url
  return (<div className="meme-wrap" onClick={()=>window.open(url, '_blank')}>
    <img height="200" alt="meme" src={url} />
  </div>)
}
export default App;
