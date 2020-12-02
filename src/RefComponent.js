import {Component, createRef} from 'react'

export class RefComponent extends Component{
    constructor(props){
        super(props)
        this.childRef = createRef();
    }
    focusBtn = ()=>{
        console.log(this.childRef)
        this.childRef.current.focus();
    }
    render(){
        return <div>
            <h2>Refs&Doms</h2>
            <RefChild ref={this.childRef}></RefChild>
            <button onClick={this.focusBtn}>聚焦</button>
        </div>
    }
}


class RefChild extends Component{
    constructor(){
        super()
        this.inputRef = createRef();
    }
    focus=()=>{
        this.inputRef.current.focus();
    }
    render(){
        return <input ref={this.inputRef}/>
    }
}