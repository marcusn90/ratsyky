import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var Store = {
  lines: [
    {
      prefix: 'ratsyky$>',
      active: true
    }
  ]
};

class App extends Component {
  constructor () {
    super();
    this.state = Store;
  }

  onSubmit ( line ) {
    line.active = false;
    this.setState({ lines: this.state.lines.concat({
          prefix: '\tname:',
          active: true
        })})
  }

  render() {
    return (
      <div className="container">
        { this.state.lines.map( (l, idx) => <PromptLine onSubmit={this.onSubmit.bind(this)} key={idx} line={ l }/>) }
      </div>
    );
  }

}

class PromptLine extends Component {
  
  onChangeCommand (v) {
    console.log(this.command.innerText)
  }

  onKeyDown (e) {
    console.log(e.keyCode)

    switch (e.keyCode) {
      case 13:
        e.preventDefault();
        console.log('submit command');
        this.props.onSubmit(this.props.line);
        return false;
      default:
        return;
    }
  }

  render () {
    return (
      <p className="prompt-line">
        <span className="pref">{ this.props.line.prefix }</span>
        <span onKeyDown={this.onKeyDown.bind(this)} 
              onInput={this.onChangeCommand.bind(this)} 
              ref={ (e) => { this.command = e; }} 
              className={this.props.line.active ? 'command command-active' : 'command'} 
              contentEditable={this.props.line.active ? 'true' : 'false' }></span>
        { this.props.line.active ? <span className="cursor">_</span> : null }
      </p>
    );
  }

  componentDidMount () {
    this.command.focus();
  }
}

export default App;
