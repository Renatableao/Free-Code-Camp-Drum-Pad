
import './App.css';
import React from 'react';
import { TiPlus, TiMinus } from 'react-icons/ti'


const audio_list = [
  {key: 'Q', title: "Heater-1", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"},
  {key: 'W', title: "Heater-2", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"},
  {key: 'E', title: "Heater-3", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"},
  {key: 'A', title: "Heater-4", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"},
  {key: 'S', title: "Clap", url:"https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"},
  {key: 'D', title: "Open-HH", url:"https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"},
  {key: 'Z', title: "Kick-n'-Hat", url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"},
  {key: 'X', title: "Kick", url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"},
  {key: 'C', title: "Closed-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"}
]


class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleClick = this.handleClick.bind(this)
    this.handleKey = this.handleKey.bind(this)
    this.playSound = this.playSound.bind(this)
    this.clickButton = this.clickButton.bind(this)
    this.setDisplay = this.setDisplay.bind(this)
}

handleClick() {
    this.playSound(this.props.drumKey, this.props.vol)
    this.clickButton(this.props.drumKey)
    this.setDisplay(this.props.drumKey)
  }


handleKey(event) {
  let upperkey = (event.key).toUpperCase();
  if (upperkey === this.props.drumKey) {
      if (this.props.power) {
        this.playSound(this.props.drumKey, this.props.vol)
        this.clickButton(this.props.drumKey)
        this.setDisplay(this.props.drumKey)
      }
    }
  }

playSound(thisstate, volstate) {
  const sound = document.getElementById(thisstate);
  sound.currentTime= 0;
  sound.volume = volstate
  sound.play()
}

clickButton(thisstate) {
  const button = document.getElementsByName(thisstate);
  button[0].classList.add('active')
  setTimeout(() => button[0].classList.remove('active'), 150)
}

setDisplay(thisstate) {
  const display = document.getElementById('display')
  display.innerHTML = document.getElementsByName(thisstate)[0].id
}

componentDidMount() {
  document.getElementById("power").checked = "true"
  document.addEventListener('keydown', this.handleKey);
  
}

componentWillUnmount() {
  document.removeEventListener('keydown', this.handleKey);
}

render() {
  return (
    <button onClick={this.handleClick} key={this.props.title} disabled={!this.props.power} name={this.props.drumKey} className="drum-pad" 
          id={this.props.title}>{this.props.drumKey}<audio className="clip" id={this.props.drumKey} src={this.props.url} type="audio/mp3"></audio></button>)
}}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      power: "true",
      vol: 0.5
    }

    
    this.handlePower = this.handlePower.bind(this)
    this.handleVolumeUp = this.handleVolumeUp.bind(this)
    this.handleVolumeDown = this.handleVolumeDown.bind(this)
    
    
  }

  

  handlePower() {
    this.setState(state => ({
      power: !state.power
    }), () => {
      if (!this.state.power) {
        document.getElementById('display').innerHTML = "OFF"
      }
      else {
        document.getElementById('display').innerHTML = "Welcome!"
        this.setState({
          vol: 0.5
        })
      }
    })
  }

  handleVolumeUp() {
    if (this.state.power) {
    if (this.state.vol < 0.9) {
      document.getElementById('volup').classList.add('vol_active')
      setTimeout(() => document.getElementById('volup').classList.remove('vol_active'), 150)
      this.setState(state => ({
        vol: state.vol + 0.1
      }), () => {
        document.getElementById('display').innerHTML = "Vol: " + (this.state.vol * 100).toFixed(0) + "%"
        })
  }}}

  handleVolumeDown() {
    if (this.state.power) {
    if (this.state.vol > 0.1) {
      document.getElementById('voldown').classList.add('vol_active')
      setTimeout(() => document.getElementById('voldown').classList.remove('vol_active'), 150)
      this.setState(state => ({
        vol: state.vol - 0.1
      }), () => {
        document.getElementById('display').innerHTML = "Vol: " + (this.state.vol * 100).toFixed(0) + "%"
      })
  }}} 
  
 
  render() {
    return (

    <div id="drum-machine">
      <div id="pad-title">
        <h1>Drum Pad</h1>
      </div>

      <div id="pad-body">

        <div className="left-panel">
          <div id="display">Welcome</div>
          <div className="power-container">
            <input onChange={this.handlePower} type="checkbox" name="" id="power" className="check"/>
            <label htmlFor="power">
                <svg  xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xLink" className="fixed-svg">
                <circle className="inner-circle" cx="35%" cy="35%" r="35%"></circle>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xLink" className="rotate-svg">
                    <circle className="outer-circle" cx="35%" cy="35%" r="35%"></circle>
                </svg>
                <div className="rect"></div>
            </label>
          </div>
          <div id="vol-buttons">
            <button onClick={this.handleVolumeUp} disabled={!this.state.power} id="volup" className="volume"><TiPlus /></button>
            <button onClick={this.handleVolumeDown} disabled={!this.state.power} id="voldown" className="volume"><TiMinus /></button>
          </div>
        </div>

        <div className="right-panel">
        {audio_list.map(audio => <DrumPad url={audio.url} title={audio.title} drumKey={audio.key} power={this.state.power} vol={this.state.vol} />)}
        </div>

      </div>
    </div>
    );
  }
}

export default App;

