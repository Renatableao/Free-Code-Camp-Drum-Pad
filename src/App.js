
import './App.css';
import React from 'react';
import { TiPlus, TiMinus} from 'react-icons/ti';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: "",
      key: "",
      power: "true",
      vol: 0.5
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleKey = this.handleKey.bind(this)
    this.playSound = this.playSound.bind(this)
    this.clickButton = this.clickButton.bind(this)
    this.handlePower = this.handlePower.bind(this)
    this.handleVolumeUp = this.handleVolumeUp.bind(this)
    this.handleVolumeDown = this.handleVolumeDown.bind(this)
    
  }

  handleClick(event) {
    event.preventDefault()
    this.setState({
      clicked: event.target.textContent
    }, () => {
      this.playSound(this.state.clicked, this.state.vol)
      this.clickButton(this.state.clicked)
      this.setDisplay(this.state.clicked)
    })
  }
  
  handleKey() {
    window.addEventListener("keydown", (event) => {
      event.preventDefault()
      let upkey = (event.key).toUpperCase();
      if ((['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C']).includes(upkey)) {
        this.setState({
        key: upkey
        }, () => {
        if (this.state.power) {
        this.playSound(this.state.key, this.state.vol)
        this.clickButton(this.state.key)
        this.setDisplay(this.state.key)
        }
      })}
    })}

  playSound(thisstate, volstate) {
    const sound = document.getElementById(thisstate);
    sound.currentTime=0;
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
  
  componentDidMount() {
    this.handleKey()
    document.getElementById("power").checked = "true"
  }

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
          <button onClick={this.handleClick} disabled={!this.state.power} name="Q" className="drum-pad" id="Heater-1"><audio className="clip" id="Q"><source src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" type="audio/mp3" /></audio>Q</button>
          <button onClick={this.handleClick} disabled={!this.state.power} name="W" className="drum-pad" id="Heater-2"><audio className="clip" id="W"><source src="https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" type="audio/mp3" /></audio>W</button>
          <button onClick={this.handleClick} disabled={!this.state.power} name="E" className="drum-pad" id="Heater-3"><audio className="clip" id="E"><source src="https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" type="audio/mp3" /></audio>E</button>
          <button onClick={this.handleClick} disabled={!this.state.power} name="A" className="drum-pad" id="Heater-4"><audio className="clip" id="A"><source src="https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" type="audio/mp3" /></audio>A</button>
          <button onClick={this.handleClick} disabled={!this.state.power} name="S" className="drum-pad" id="Clap"><audio className="clip" id="S"><source src="https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" type="audio/mp3" /></audio>S</button>
          <button onClick={this.handleClick} disabled={!this.state.power} name="D" className="drum-pad" id="Open-HH"><audio className="clip" id="D"><source src="https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"type="audio/mp3" /></audio>D</button>
          <button onClick={this.handleClick} disabled={!this.state.power} name="Z" className="drum-pad" id="Kick-n'-Hat"><audio className="clip" id="Z"><source src="https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" type="audio/mp3" /></audio>Z</button>
          <button onClick={this.handleClick} disabled={!this.state.power} name="X" className="drum-pad" id="Kick"><audio className="clip" id="X"><source src="https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" type="audio/mp3" /></audio>X</button>
          <button onClick={this.handleClick} disabled={!this.state.power} name="C" className="drum-pad" id="Closed-HH"><audio className="clip" id="C"><source src="https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" type="audio/mp3" /></audio>C</button>
        </div>
      </div>
    </div>
    );
  }
}

export default App;
