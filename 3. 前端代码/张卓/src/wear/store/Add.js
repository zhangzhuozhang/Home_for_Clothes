import React, { Component } from 'react'
import { NavBar} from 'antd-mobile';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import Back from '../images/返回 (1).png';
import './store.css';

export default class Add extends Component {
    hrefChange(str){
        var h=window.location.href;
        var index = h.lastIndexOf("\/");  
        window.location.href = h.substring(0, index+1)+str;
    }
    render() {
        return (
            <div>
                <NavBar
                    leftContent={
                        <Link to="/zhenglitab"><img src={Back} style={{ width: '30px', height: "30px" }} key="fan"/></Link>
                    }
                    style={{ backgroundColor: 'rgb(252, 157, 154)' }}>添加
                </NavBar>
                <h2 style={{margin:'5%',fontWeight:"lighter"}}>请输入你想要添加的空间名称:</h2>
                <input type="type" style={{marginLeft:'5%',height:'30px'}}/>
                <a href="zhenglitab"><input type="submit" style={{height:'30px',width:'50px'}}/></a>
            </div>
        )
    }
}
