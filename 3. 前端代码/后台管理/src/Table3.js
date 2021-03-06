import React, { Component } from 'react'
import shanchu from './删 除 .png'
import tianjia from './添加.png'
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom';
export default class Table3 extends Component {
    constructor(){
        super();
        this.state=({
            ress:[],
            str:'',
        })
    }
    componentDidMount(){
        fetch('http://47.98.163.228:8086/article')
        .then(res=>res.json())
        .then(res=>{      
            this.setState({
                ress:res
            },function(){
                console.log(this.state.ress)
            })
        })
    }
    shanchu=(idx)=>{
        fetch("http://47.98.163.228:8086/articleDelete?articleId="+idx);
        fetch('http://47.98.163.228:8086/article')
        .then(res=>res.json())
        .then(res=>{      
            this.setState({
                ress:res
            },function(){
                console.log(this.state.ress)
            })
        })
    }
    render() {
        return (
            <div>
                <div id="page-wrapper">
                <div id="page-inner">
                    <div class="row">
                        <div class="col-md-12">
                            <h1 class="page-header">
                                文章
                            </h1>
                            <Link to='/tianjia'>
                                <img src={tianjia} style={{width:'2%'}}/>添加文章
                            </Link>
                        </div>
                    </div>	
                    <div class="row">
                    <div class="col-md-12">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <div class="table-responsive">
                                <table class="table table-striped table-bordered table-hover" id="dataTables-example">
                                    
                                    <thead>
                                        <tr>
                                            <th style={{textAlign:'center'}}>文章ID</th>
                                            <th style={{textAlign:'center'}}>作者</th>
                                            <th style={{textAlign:'center'}}>内容</th>
                                            <th style={{textAlign:'center'}}>点赞数</th>
                                            <th style={{textAlign:'center'}}>收藏数</th>
                                            <th style={{textAlign:'center'}}>发表时间</th>
                                            <th style={{textAlign:'center'}}>操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.ress.map((item,idx)=>(
                                                <tr id="lalala">
                                                    <td>{item.articleId}</td>
                                                    <td>{item.userName}</td>
                                                    <td style={{width:'500px', textAlign:'left'}}>{item.content}</td>
                                                    <td>{item.agree}</td>
                                                    <td class="center">{item.save}</td>
                                                    <td class="center">{item.time}</td>
                                                    <td class="center" onClick={()=>this.shanchu(item.articleId)}><img src={shanchu} style={{width:'10%'}}/></td>
                                                </tr>
                                            ))
                                            }
                                    </tbody>
                                </table>
                            </div>                       
                        </div>
                    </div>
                </div>
                </div>
                </div>
            </div>
            </div>
        )
    }
}
