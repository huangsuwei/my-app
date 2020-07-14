import React, { Component } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
//import logo from './logo.svg';
//import './App.css';

/*class App extends Component {
  render() {
    return (
      <div className="App">
       {/!* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>*!/}
        <h1>hello world!</h1>

      </div>
    );
  }
}*/

class Todolist extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            aList:[],
            sTodo:''
        }
    }
    componentDidMount() {
        axios({
            url: './data.json',
            method: 'get',
            responseType: 'json',
        }).then(dat => {
            console.log(dat.data)
            //let list = dat.data
            this.setState({
                aList: dat.data
            })
            //this.state.aList = dat
        }).catch(function (err) {
            alert('服务器超时！')
        })
    }

    fnChange2(event) {
        this.setState({
            sTodo: event.target.value
        })
    }

    fnAdd2() {
        this.setState(prevState => {
            if (prevState.sTodo == '') {
                alert('请输入内容！')
                return
            }
            let repeat = false
            prevState.aList.map(function (value) {
                if (value == prevState.sTodo) {
                    repeat = true
                    alert('该内容已在列表中，请更换内容后重试！')
                }
            })
            return !repeat
                ? {aList: [...prevState.aList, prevState.sTodo], sTodo: ''}
                : {aList: prevState.aList, sTodo: ''}
        })
    }

    fnDel2(i) {
        this.setState(prevState => {
            let list = [...prevState.aList]
            list.splice(i, 1)
            return {aList: list}
        })
    }

    fnUp2(i) {
        this.setState(prevState => {
            if (i == 0) {
                alert("到顶了！")
                return
            }
            let list = [...prevState.aList]
            let nowItem = list[i]
            list.splice(i, 1)
            list.splice(i - 1, 0, nowItem)
            return {aList: list}
        })
    }

    fnDown2(i) {
        this.setState(prevState => {
            if (i == prevState.aList.length) {
                alert("到底了！")
                return
            }
            let list = [...prevState.aList]
            let nowItem = list[i]
            list.splice(i, 1)
            list.splice(i + 1, 0, nowItem)
            return {aList: list}
        })
    }

    render(){
        return (
            <div className="list_con">
                <h2>To do list</h2>
                <input type="text" value={this.state.sTodo} id="txt1" className="inputtxt" onChange={this.fnChange2.bind(this)} />
                <input type="button"  value="增加" id="btn1" className="inputbtn" onClick={this.fnAdd2.bind(this)} />

                <ul id="list" className="list">
                    {
                        this.state.aList.map((item,i)=>
                            <li key={i}><span>{ item }</span><a href="javascript:;" className="up" onClick={this.fnUp2.bind(this,i)}> ↑ </a><a href="javascript:;" className="down" onClick={this.fnDown2.bind(this,i)}> ↓ </a><a href="javascript:;" className="del" onClick={this.fnDel2.bind(this,i)}>删除</a></li>
                        )
                    }
                </ul>
            </div>
        )
    }
}
ReactDOM.render(<Todolist />, document.getElementById('root'));

export default Todolist;
