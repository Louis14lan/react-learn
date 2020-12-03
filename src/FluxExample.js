import { EventEmitter } from "events";
import { Dispatcher } from "flux";
import { Component } from "react";

export default function FluxExample(){
    return <div>
        <h2>FluxExample</h2>
        <FluxExampleChild1></FluxExampleChild1>
        <FluxExampleChild2></FluxExampleChild2>
    </div>
}
class FluxExampleChild1 extends Component{
    constructor(){
        super();
        this.state = {
            items: Store.getAll()
        }
    }

    componentDidMount(){
        Store.addChageListener(this._onchage);
    }

    componentWillUnmount(){
        Store.removeEventListener(this._onchage);
    }

    _onchage = ()=>{
        this.setState({
            items:Store.getAll()
        })
    }

    addItem = ()=>{
        ButtonAction.addItemAction('haha')
    }


    render(){
        return <div>
            <h3>child1</h3>
            <MyButton click={this.addItem}></MyButton>
            <ul>{this.state.items.map(item=><li>item</li>)}</ul>
        </div>
    }
}

class FluxExampleChild2 extends Component{
    constructor(){
        super();
        this.state = {
            items: Store.getAll()
        }
    }

    componentDidMount(){
        Store.addChageListener(this._onchage);
    }

    componentWillUnmount(){
        Store.removeEventListener(this._onchage);
    }

    _onchage = ()=>{
        this.setState({
            items:Store.getAll()
        })
    }

    addItem = ()=>{
        ButtonAction.addItemAction('haha')
    }


    render(){
        return <div>
            <h3>child2</h3>
            <MyButton click={this.addItem}></MyButton>
            <ul>{this.state.items.map(item=><li>item</li>)}</ul>
        </div>
    }
}

function MyButton(prop){
    return <button onClick={prop.click}>
        add item
    </button>
}

// Action
const ButtonAction = {
    addItemAction:function(val){
        ButtonDispatch.dispatch({
            type:'ADDITEM',
            text: val
        })
    }
}

// Dispatch
// 需要额外调用flux库中的Dispatcher类
const ButtonDispatch = new Dispatcher();
ButtonDispatch.register(function(action){
    switch(action.type){
        case 'ADDITEM':
            Store.addItem(action.text)
            Store.emitChange()
    }
})

// Store
// 需要依赖events库中的EventEmitter对事件进行发布订阅
const Store = Object.assign({},EventEmitter.prototype,{
    storeList: [],

    getAll:function(){
        return this.storeList;
    },
    
    addItem: function(text){
        this.storeList.push(text);
    },

    emitChange: function(){
        this.emit('change');
    },

    addChageListener: function(callback){
        this.on('change',callback);
    },

    removeEventListener: function(callback){
        this.removeListener('change',callback)
    }
})


