import {Component} from 'react'

export class ToolBar extends Component{
    render(){
        return <div>
            <ThemedButton theme={this.props.theme}></ThemedButton>
            <em>{this.props.children}</em>
        </div>
    }
}


function ThemedButton(props){
    return <button theme={props.theme}>{props.theme}</button>
}