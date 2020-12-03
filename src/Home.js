import {RefComponent} from './examples/RefComponent'
import {HookExample} from './examples/HookExample'
import FluxExample from './examples/FluxExample';

import {Component, createContext, Profiler} from 'react'

const ThemeContext = createContext('light')

export default class Home extends Component {
  constructor(){
    super();
    this.state = {
      counts: 0,
      color:'red'
    }
  }
  add(){
    this.setState({
      counts: this.state.counts+1
    })
  }
  callbak(){
    console.log(arguments)
  }
  render(){
    return (
      <div>
        <div>
          <button onClick={this.add.bind(this)}>+</button>
          <span>counts:{this.state.counts}</span>
          <span>color:{this.state.color}</span>
        </div>
        <div>
          <ThemeContext.Provider value={{'theme':'dark','counts':this.state.counts}}>
            <Profiler id='tooBar' onRender={this.callbak}>
              <ToolBar>
                haha
              </ToolBar>
            </Profiler>
            <ThemeContext.Consumer>
              {value=>ThemedButton1(value)}
            </ThemeContext.Consumer>
          </ThemeContext.Provider>
          <RefComponent></RefComponent>
          <HookExample></HookExample>
          <FluxExample></FluxExample>
        </div>
      </div>
    )
  }
}

class ToolBar extends Component{
  constructor(){
    super();
    this.state={
      cc:0
    }
  }
  add = ()=>{
    this.setState({
      cc:this.state.cc+1
    })
  }
  render(){
      return <div>
          <button onClick={this.add}>toobar+1</button>
          <span>{this.state.cc}</span>
          <ThemedButton />
          <em>{this.props.children}</em>
      </div>
  }
}


function ThemedButton1(props){
  console.log(props)
  return <button theme={props.theme}>{props.theme}1: {props.counts}</button>
}
// ThemedButton.contextType = ThemeContext;

class ThemedButton extends Component{
  // static contextType = ThemeContext;
  render(){
    return <button theme={this.context.theme}>{this.context.counts}</button>
  }
}
ThemedButton.contextType = ThemeContext;