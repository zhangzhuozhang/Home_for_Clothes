import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { NavBar, SearchBar } from 'antd-mobile';
import { Popover, Button } from 'antd';
import Back from '../../images/fanhui_1.png';

export default class MyClothing extends Component {
    constructor(){
        super();
        this.state={
            picture:[],
        }
    }
    componentDidMount(){
        fetch('http://47.98.163.228:3004/clothing?userId='+this.props.match.params.id)
        .then(res=>res.json())
        .then(res=>{
            for(var i=0;i<res.length;i++){
                var j = res[i].cloPic.indexOf('/');
                res[i].cloPic = "http://47.98.163.228:3004"+res[i].cloPic.substr(j);
            }
            this.setState({
                picture:res
            },function(){
                console.log(this.state.picture)
            })
        });
    }
    render() {
        return (
            <div>
                <NavBar
                    style={{width:'100%',backgroundColor:'#fc9d9a',color:'white',position:'fixed',top:0,left:0,zIndex:99}}
                    leftContent={<Link to={"/apptab/"+this.props.match.params.id+'&me'}><img src={Back} style={{ width: '30px', height: "30px" }} key="fan"/></Link>}
                >衣服</NavBar>
                <NavBar></NavBar>
                <SearchBar placeholder="请输入你要查找的名字" maxLength={4} style={{backgroundColor:'#ccc'}}/>
                <div>
                    {
                        this.state.picture.map((item)=>(
                            <Popover content={<p style={{fontSize:"20px"}}>{item.cloPlace}</p>} placement="bottom" title={<p style={{fontSize:"16px"}}>衣服所存位置</p>} trigger="hover">
                                <img src={item.cloPic} key={item.cloId} style={{width:'32vw',heihgt:'32vw',margin:'0.5vw',border:'1px solid #ddd'}}/>
                            </Popover>
                        ))
                    }
                </div>
            </div>
        )
    }
}