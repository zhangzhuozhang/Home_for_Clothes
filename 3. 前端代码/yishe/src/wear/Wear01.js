import React, { Component } from 'react'
import { NavBar,Grid,Tabs,WhiteSpace} from 'antd-mobile';
import { NoticeBar, Icon } from 'antd-mobile';
import './wear.css';
import {Consumer} from '../context'
import didian from '../images/地点.png'
import xiayu from '../images/下雨.png'

import qing from '../images/晴.png'
import mote from '../images/模特.png'
import mote2 from '../images/模特2.png'
import mote3 from '../images/模特2_bai(1).png'
import mote4 from '../images/模特_头发丝.png'
import fenxiang from '../images/分享.png'
import pengyouquan from '../images/朋友圈.png'
import weixin from '../images/微信.png'
import weibo from '../images/微博.png'
import QQ from '../images/QQ (2).png'
import kongjian from '../images/qq空间.png'
import shequ from '../images/社区.png'
import chuandariji from '../images/图片.png'
import fuzhilianjie from '../images/复制链接.png'
import buganxingqu from '../images/不感兴趣_44.png'
import jubao from '../images/举报.png'
import xiaoren0 from '../images/小人.png'
import xiaoren1 from '../images/小人1.png'
import xiaoren2 from '../images/小人2.png'
import xiaoren3 from '../images/小人3.png'
// import beijing from '../images/雨.jpg'
import beijing from '../images/雨.gif'
import beijing2 from '../images/晴.jpg'
import {Link} from 'react-router-dom'
import AlphaPicker from 'react-color'
import { CompactPicker } from 'react-color';
const src =[beijing,beijing2];
const xiaoren=[xiaoren0,xiaoren1,xiaoren2,xiaoren3]
const data = Array.from(new Array(5)).map((_val, i) => ({
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
    text: `name${i}`,
}));
const data2 = Array.from(new Array(5)).map(() => ({
    icon:[chuandariji,shequ,fuzhilianjie,buganxingqu,jubao]
}));
const data1 = Array.from(new Array(5)).map(() => ({
  icon:[weixin,pengyouquan,weibo,QQ,kongjian]
}));
const c=['#00cc00','#ccff99','white','#3399ff','#FFCC66'];
const w_t=[xiayu,qing]
//生成从minNum到maxNum的随机数
function randomNum(minNum,maxNum){ 
  switch(arguments.length){ 
      case 1: 
          return parseInt(Math.random()*minNum+1,10); 
      break; 
      case 2: 
          return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
      break; 
          default: 
              return 0; 
          break; 
  } 
} 
export default class Wear extends Component {
  constructor(){
    super();
    this.state = {
        data:[],
        ss: ['微信好友','朋友圈','微博','QQ好友','QQ空间'],
        ss1: ['穿搭日记','社区','复制链接','不感兴趣','举报'],
        url0:'http://47.98.163.228:8083/react',
        url:'http://47.98.163.228:8083/weather',
        city:'南京',
        temperature:'2',
        temperature2:'13',
        dressing_advice:'',
        weather:'晴',
        idx:0,
        arr:[],arr_s:[],
        ku:[],ku_s:[],qun:[],qun_s:[],yi:[],yi_s:[],tao:[],tao_s:[],tuijian:[],tuijian_s:[],
        count:0,
        href:'#/apptab',
        userId:'',
        ress:[],
        linshi:0,
        tiaosrc : ['/diaryAdd/','/articleadd/',''],
        color:'',
        color2:'',
        cc:[],
        num:0,
        num2:0,
        feng:'',
    }
  }    
  componentDidMount(){
    console.log('componentDidMount')
    fetch("http://47.98.163.228:8083/aa", {
      method: 'post', 
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true,
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify({userId:localStorage.getItem('userId')}) 
    },function(){
      console.log('fetch aa发送userid了')
    })
        //获取图片信息
        var small=[],big=[];
        fetch('http://47.98.163.228:8083/react',function(){
          console.log('我fetch react 了')
        })
        .then(res=>res.json())
        .then(res=>{
          console.log(res);
          var weather = res[res.length-1]
          this.setState({
            city:weather.city,
            temperature:weather.data[0].tem1,
            temperature2:weather.data[0].tem,
            dressing_advice:weather.data[0].index[3].desc,
            weather:weather.data[0].wea,
            tiaosrc : ['/diaryAdd/']
          })
            if(this.state.weather.indexOf('雨')!=-1){
              this.setState({
                  idx:0,
              })
            }
            else{
              this.setState({
                idx:1,
              })
            }
            //把读取的图片放进来
            if(res[0].cloSmallPic){     
            for(var i=0;i<res.length-1;i++){
              var j = res[i].cloSmallPic.indexOf('/');
              res[i].cloSmallPic = "http://47.98.163.228:8083"+res[i].cloSmallPic.substr(j);
              big[i] = res[i].cloSmallPic;
              var name = res[i].cloSmallPic.substr(j).split('/')[4];
              var n = name.split('.')[0];
              small[i] = "http://47.98.163.228:8083/images/"+n+'_s.png'
              this.setState({
                ress:res,
                arr:big,
                arr_s:small,
             })
            }
          //分类存小图标
          var kuku=[],kuku_s=[];
          var qunqun=[],qunqun_s=[];
          var yiyi=[],yiyi_s=[];
          var taotao=[],taotao_s=[];
          for(var i = 0;i<this.state.arr.length;i++){
            var n = this.state.arr[i].split('/')[4];
            //判断裤子类别
            if(n.indexOf('ku')!=-1){
              kuku.push(this.state.arr[i]);
              kuku_s.push(this.state.arr_s[i])
            }
            //判断裙子类别
            if(n.indexOf('qun')!=-1){
              qunqun.push(this.state.arr[i]);
              qunqun_s.push(this.state.arr_s[i])
            }
            //判断上衣
            if(n.indexOf('yi')!=-1){
              yiyi.push(this.state.arr[i]);
              yiyi_s.push(this.state.arr_s[i])
            }
            //判断外套
            if(n.indexOf('tao')!=-1){
              taotao.push(this.state.arr[i]);
              taotao_s.push(this.state.arr_s[i])
            }
          }
          this.setState({
            qun:qunqun,
            qun_s:qunqun_s,
            yi:yiyi,
            yi_s:yiyi_s,
            tao:taotao,
            tao_s:taotao_s,
            ku:kuku,
            ku_s:kuku_s
          })
          //实现推荐
          var tuitui=[],tuitui_s=[];
          var diwen = this.state.temperature.charAt(0);
          if(diwen<0){
            this.setState({
              tuijian:this.state.yi,
              tuijian_s:this.state.yi_s
            })
          }else{
            for(var i = 0;i<this.state.ress.length-1;i++){

              var j = this.state.ress[i].cloSmallPic.indexOf('/');
              big[i]  = "http:"+this.state.ress[i].cloSmallPic.substr(j);

              var name = this.state.ress[i].cloSmallPic.substr(j).split('/')[4];
              var n = name.split('.')[0];
              small[i] = "http://47.98.163.228:8083/images/"+n+'_s.png'
              // var n = this.state.ress[i].split('/')[4];


              if(n.indexOf('duan')==-1){
                // tuitui.push(this.state.arr[i]);
                tuitui.push(big[i]);
                tuitui_s.push(small[i])
                
                if(n.indexOf('changqun')!=-1){
                  console.log(this.state.ress[i].cloColor)
                  console.log(i)
                  this.setState({
                    num2:this.state.num2+1,
                  },function(){
                    if(this.state.num2==2){
                      console.log(this.state.num2)
                      if(this.state.ress[i].cloColor=='白色'){
                        tuitui_s[i-1]="http://47.98.163.228:8083/images/"+n+'_s_bai.png'
                      }
                      if(this.state.ress[i].cloColor=='黑色'){
                        tuitui_s[i-1]="http://47.98.163.228:8083/images/"+n+'_s_hei.png'
                      }if(this.state.ress[i].cloColor=='红色'){
                        tuitui_s[i-1]="http://47.98.163.228:8083/images/"+n+'_s_hong.png'
                      }if(this.state.ress[i].cloColor=='黄色'){
                        tuitui_s[i-1]="http://47.98.163.228:8083/images/"+n+'_s_huang.png'
                      }
                      if(this.state.ress[i].cloColor=='绿色'){
                        tuitui_s[i-1]="http://47.98.163.228:8083/images/"+n+'_s_lv.png'
                      }
                      if(this.state.ress[i].cloColor=='紫色'){
                        tuitui_s[i-1]="http://47.98.163.228:8083/images/"+n+'_s_zi.png'
                      }
                      this.setState({
                        num2:0,
                      })
                    }
                  })

                }
                
              }



            }  
            this.setState({
              tuijian:tuitui,
              tuijian_s:tuitui_s,
            })
          }
        }
      })
  }
    aaa=(idx)=>{
      if(idx==1){
        window.location.href =window.location.href.split('#')[0]+'#/articleadd/'+this.props.id
      }else{
        window.location.href =window.location.href.split('#')[0]+'#'+ this.state.tiaosrc[idx]+this.props.id
      }
    }
    click_share=()=>{
      var div = document.getElementById('fenxiang');
      div.style.display='block'
    }
    click_unShare=()=>{
      var div = document.getElementById('fenxiang');
      div.style.display='none'
    }
    //原跳转
    hrefChange(str){
      var h=window.location.href;
      var index = h.lastIndexOf("\/");  
      window.location.href = h.substring(0, index+1)+str;
    }
    qunzi=(idx)=>{
      document.getElementById('mote_4').style.display='none'
      document.getElementById('mote').style.display = 'none';
      document.getElementById('mote_2').style.display = 'block';
      document.getElementById('mote2').src=this.state.qun[idx];
      document.getElementById('mote2').style.display = 'block';
      if(this.state.qun[idx].indexOf('duan')!=-1){

      }else{
        document.getElementById('mote3').style.display = 'none';
        document.getElementById('mote4').style.display = 'none';
      }
    }
    kuzi=(idx)=>{
      document.getElementById('mote').style.display = 'none';
      document.getElementById('mote_2').style.display = 'block';
      document.getElementById('mote2').src=this.state.ku[idx];
      document.getElementById('mote2').style.display = 'block';
    }
    shangyi=(idx)=>{
      document.getElementById('mote').style.display = 'none';
      document.getElementById('mote_2').style.display = 'block';
      document.getElementById('mote3').src=this.state.yi[idx];
      document.getElementById('mote3').style.display = 'block';
    }
    waitao=(idx)=>{
      document.getElementById('mote').style.display = 'none';
      document.getElementById('mote_2').style.display = 'block';
      document.getElementById('mote4').src=this.state.tao[idx];
      document.getElementById('mote4').style.display = 'block';
    }
//推荐的点击事件
    tuijian=(idx)=>{
      this.state.count++;//判断点击几次
        var a = setTimeout(()=>{
          if(this.state.count>1){//双击
            var place = this.zhao(idx,this.state.tuijian)
            this.fasong(this.state.linshi,place)
          }else{
            document.getElementById('mote').style.display = 'none';
            document.getElementById('mote_2').style.display = 'block';
            if(this.state.tuijian[idx].indexOf('ku')!==-1){ //裤子2
              document.getElementById('mote6').style.display = 'none';
              document.getElementById('mote_5').style.display = 'none';
              document.getElementById('mote_4').style.display = 'none';
              document.getElementById('mote2').src=this.state.tuijian[idx];
              document.getElementById('mote2').style.display = 'block';
            }
            if(this.state.tuijian[idx].indexOf('qun')!==-1){ //裙子2
              document.getElementById('mote6').style.display = 'none'
              document.getElementById('mote_5').style.display = 'none';
              document.getElementById('mote_4').style.display='none'
              document.getElementById('mote_5').style.display='none'
              document.getElementById('mote2').src=this.state.tuijian[idx];
              document.getElementById('mote2').style.display = 'block';
              
              
              if(this.state.tuijian[idx].indexOf('changqun')!==-1){//长裙变色
                
                console.log(this.state.tuijian_s[idx])
                this.setState({
                  num:this.state.num+1,
                },function(){
                  if(this.state.num==1){
                    console.log(this.state.num)
                    document.getElementById('mote_4').src = this.state.tuijian[idx].split('.')[0]+'.'+this.state.tuijian[idx].split('.')[1]+'.'+this.state.tuijian[idx].split('.')[2]+'.'+this.state.tuijian[idx].split('.')[3]+'_bai.'+this.state.tuijian[idx].split('.')[4]
                    document.getElementById('mote_4').style.display = 'block';
                    var color='';
                    for(var i =0;i<this.state.ress.length-1;i++){
                      if(this.state.ress[i].cloSmallPic.indexOf(this.state.tuijian[idx])!=-1){
                        color = this.whichColor(this.state.ress[i].cloColor);
                        this.setState({
                          feng:color,
                        })
                        break;
                      }
                    }
                    document.getElementById('mote_4').style.filter=`drop-shadow(150px 0 ${color})`;
                  }else{
                    //第二件
                    console.log(this.state.num)
                    document.getElementById('mote6').src=this.state.tuijian[idx];
                    document.getElementById('mote6').style.display = 'block';
                    document.getElementById('mote_5').src = this.state.tuijian[idx].split('.')[0]+'.'+this.state.tuijian[idx].split('.')[1]+'.'+this.state.tuijian[idx].split('.')[2]+'.'+this.state.tuijian[idx].split('.')[3]+'_bai.'+this.state.tuijian[idx].split('.')[4]
                    document.getElementById('mote_5').style.display = 'block';
                    for(var i =0;i<this.state.ress.length-1;i++){
                      if(this.state.ress[i].cloSmallPic.indexOf(this.state.tuijian[idx])!=-1){
                        var color2 = this.whichColor(this.state.ress[i].cloColor);
                        document.getElementById('mote_5').style.filter=`drop-shadow(150px 0 ${color2})`;
                      }
                    }
                    this.setState({
                      num:0,
                    })
                  }
                })
               

                
                
              }
              if(this.state.tuijian[idx].indexOf('duan')!=-1){ //包括短裙

              }else{//连衣裙
                document.getElementById('mote3').style.display = 'none';
                document.getElementById('mote4').style.display = 'none';
              }
            }
            if(this.state.tuijian[idx].indexOf('yi')!==-1){
              document.getElementById('mote6').style.display = 'none';
              document.getElementById('mote_5').style.display = 'none';
              document.getElementById('mote3').src=this.state.tuijian[idx];
              document.getElementById('mote3').style.display = 'block';
              if(document.getElementById('mote2').src.indexOf('qun')!=-1){
                if(document.getElementById('mote2').src.indexOf('dun')!=-1){
                  document.getElementById('mote2').style.display = 'none';
                  document.getElementById('mote4').style.display = 'none';
                }
              }
            }
            if(this.state.tuijian[idx].indexOf('tao')!==-1){
              document.getElementById('mote6').style.display = 'none';
              document.getElementById('mote_5').style.display = 'none';
              document.getElementById('mote4').src=this.state.tuijian[idx];
              document.getElementById('mote4').style.display = 'block';
            }
            this.setState({
              count:0
            })
          }
      },200)
    }
    //找到位置
    zhao=(idx,weizhi)=>{
      var place='';
      //找到它的存储地点
      var nnn = weizhi[idx].split('/')[4].split('.')[0];
      // var nnn = this.state.tuijian[idx].split('/')[4].split('.')[0];
      for(var i = 0;i<this.state.ress.length-1;i++){
        if(this.state.ress[i].cloSmallPic.indexOf(nnn)!=-1){
            place = this.state.ress[i].cloPlace
            break;
        }
      }
      //判断存储位置的第几个
      for(var i = 0;i<this.state.ress.length-2;i++){
        if(this.state.ress[i].cloPlace===place){
          this.setState({
            linshi:this.state.linshi+1
          })
        if(this.state.ress[i].cloSmallPic.indexOf(nnn)!=-1){
          break;
        }
      }
    }
    return place
    }
    //发送衣物编号（从1开始）
    fasong=(idx,place)=>{
      localStorage.setItem('count',0);
      console.log('衣服编号'+idx)
      fetch("http://47.98.163.228:8083/pp", {
        method: 'post', 
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Credentials" : true,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify({msg:idx}) 
      })
      .then(this.tiaozhuan(place))
    }
    //跳转
    tiaozhuan=(place)=>{
      var p = '';
      switch(place){
        case '家':
          p='home';
          break;
        case '行李箱':
          p='trunk'
          break;
        case '柜子':
            p='robe'
            break;
      }
      window.location.href =window.location.href.split('#')[0]+ '#/'+p+'/'+this.props.id;
    }
    lalala=()=>{
      document.getElementById('imgpick').style.display='block';
      document.getElementById('mote_3').style.display='block';
      console.log(this.state.color)
      document.getElementById('mote_3').style.filter=`drop-shadow(150px 0 ${this.state.color})`;
      document.getElementById('mote_3').style.opacity=0.9
      this.state.count++;//判断点击几次
      var a = setTimeout(()=>{
        if(this.state.count>1){//双击
          document.getElementById('imgpick').style.display='none';
          this.setState({
            count:0
          })
        }
      }) 
    }
    huance=()=>{
      this.setState({
        color:document.getElementById('imgpick').childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].value
      })
      console.log(document.getElementById('imgpick').childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].value)
      document.getElementById('mote_3').style.filter=`drop-shadow(150px 0 ${this.state.color})`;
      document.getElementById('mote_3').style.opacity=0.9
    }
    whichColor=(name)=>{
      var color='';
      switch(name){
        case '白色':
          color='#fffbf0';
          break;
        case '黑色':
            color='black';
            break;
        case '红色':
          color='#be002f';
          break;
        case '绿色':
          color='#7ecad';
          break;
        case '蓝色':
          color='#3eede7';
          break;
        case '黄色':
          color='#ffc773';
          break;
        case '紫色':
          color='#815476';
          break;
        default:
          color='purple';
          break;
      }
      return color;
    }
    render() {
        return (
            <div id="beijingg" className="body" style={{width:'100%',height:'100%',background:`url(${src[this.state.idx]})`,backgroundRepeat: 'no-repeat',backgroundPosition: 'right bottom'}}>
              {/* 头 */}
                <NavBar style={{backgroundColor:'#fc9d9a',color:'white'}}
                >穿搭</NavBar>
              {/* 天气 */}
              <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }} id="lalala">
                    <img src={didian} style={{width:'30px',float:'left',position:'relative',top:'-5px',marginTop:'7px'}} key="fan1"/>
                    <span id="shi" style={{float:'left'}}>{this.state.city}</span>
                    <span style={{float:'left'}}>今日天气:</span>
                    <img src={w_t[this.state.idx]} style={{width:'25px',float:'left',marginLeft:'5px',marginRight:'5px',marginTop:'3px'}} key="fan2"/>
                    <span style={{marginLeft:'5px',marginRight:'5px'}}>{this.state.weather}</span>
                    <span>{this.state.temperature}~{this.state.temperature2}</span>
              </NoticeBar>
              <p style={{fontWeight:'800',marginTop:'15px',marginLeft:'15px',fontSize:'20px',height:'20px',color:'white'}}>
                  {this.state.dressing_advice}
              </p>
              {/* <CompactPicker/> */}
              <div id="imgpick">
                <AlphaPicker id="imgpick2" color={this.state.color} onChange={this.huance}/>
              </div>
                {/* 模特 */}
                <img src={mote2} id="mote"/>
                <img src={mote2} id="mote_2"/>

               <div class="icon" id="mote22"><img  class='icon3'  id="mote_4" /></div>
                <img  id='mote2' />
                <img  id='mote3' />
                <img  id='mote4' />
                
                <div class="icon" id="mote22"><img  class='icon4'  id="mote_5" /></div>
                <img  id='mote6' />

                <div class="icon" id="mote22"><img  class='icon2' src={mote3} id="mote_3"/></div>
               <img src={mote4} id='mote5'style={{display:'block'}} onClick={this.lalala}/> 
                {/* 衣物栏 */}
                {/* <TabExample /> */}
                <div id="yiwu">
                  <WhiteSpace />
                  <Tabs tabs={tabs}
                    initialPage={0}
                    tabBarPosition="left"
                    tabDirection="vertical"
                  >
                    <div style={{width:'100px', display: 'flex',
                      height: '1000px', backgroundColor: '#fff' }}>
                      <ul className="yifu" id='yifu1'>
                      {
                          this.state.tuijian_s.map((item,idx)=>(
                            <li key={idx} style={{height:'100px'}}>
                              <img style={{width:'85%'}} 
                                src={item} 
                                onClick={this.tuijian.bind(this,idx)}
                                />
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                    <div style={{width:'100px', display: 'flex',
                      height: '500px', backgroundColor: '#fff' }}>
                      <ul className="yifu" id='yifu2'>
                      {
                          this.state.tao_s.map((item,idx)=>(
                            <li  key={idx} style={{height:'100px'}}>
                              <img style={{width:'85%'}} 
                                src={item} 
                                onClick={this.waitao.bind(this,idx)}
                                />
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                    <div style={{width:'100px', display: 'flex',
                      height: '500px', backgroundColor: '#fff' }}>
                      <ul className="yifu" id='yifu3'>
                      {
                          this.state.yi_s.map((item,idx)=>(
                            <li key={idx} style={{height:'100px'}}>
                              <img style={{width:'85%'}} 
                                src={item} 
                                onClick={this.shangyi.bind(this,idx)}
                                />
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                    
                    <div style={{width:'100px', display: 'flex',
                      height: '500px', backgroundColor: '#fff' }}>
                      <ul className="yifu" id='yifu4'>
                        {
                          this.state.ku_s.map((item,idx)=>(
                            <li key={idx} style={{height:'100px'}}>
                              <img style={{width:'85%'}} 
                                src={item} 
                                onClick={this.kuzi.bind(this,idx)}
                                />
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                    <div style={{width:'100px', display: 'flex',
                      height: '500px', backgroundColor: '#fff' }}>
                      <ul className="yifu" id='yifu5'>
                          {
                          this.state.qun_s.map((item,idx)=>(
                            <li key={idx} style={{height:'100px'}}>
                              <img style={{width:'85%'}} 
                                src={item} 
                                onClick={this.qunzi.bind(this,idx)}
                                />
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                  </Tabs>
                  <WhiteSpace />
                </div>
                <a onClick={this.click_share} id="zhenglitab">
                    <img src={fenxiang} style={{width:'30px',float:'right',position:'relative',bottom:'-170px',right:'10px'}} key="fanxiang"/>
                </a>
                {/* 小人 */}
                <img src={xiaoren0} id="xiaoren"/>
                {/* 分享栏 */}
                  <div id="fenxiang">
                    <p style={{textAlign:'center'}}>分享至</p>
                      <Grid data={data1}
                      columnNum={5}
                      renderItem={(dataItem,idx) => (
                          <div>
                          <img src={dataItem.icon[idx]} style={{ width: '40px', height: '40px' ,borderRadius:'50px',backgroundColor:c[idx], marginTop:'20px'}} alt="" />
                          <div>
                              <span>{this.state.ss[idx]}</span>
                          </div>
                          </div>
                      )}
                    />
                  <hr />
                  <Grid data={data2}
                      columnNum={5}
                      renderItem={(dataItem,idx) => (
                        <div onClick={()=>this.aaa(idx)}>
                          <img src={dataItem.icon[idx]} style={{ width: '40px', height: '40px', marginTop:'20px'}} alt="" />
                          <div>
                              <span>{this.state.ss1[idx]}</span>
                          </div>
                        </div>
                      )}
                    />
                    <hr />
                    <p onClick={this.click_unShare} style={{textAlign:'center'}}>取消</p>
                  </div>
            </div>
        );
    }

}

const tabs = [
  { title: '为你推荐'},
  { title: '外套' },
  { title: '上衣'},
  { title: '裤子'},
  { title: '连衣裙'},
];

const TabExample = () => (
  <div id="yiwu">
    <WhiteSpace />
    <Tabs tabs={tabs}
      initialPage={0}
      tabBarPosition="left"
      tabDirection="vertical"
    >
      <div style={{width:'100px', display: 'flex',
        height: '700px', backgroundColor: '#fff' }}>
        <ul className="yifu">
            <li style={{height:'100px'}}></li>
            <li style={{height:'100px'}}></li>
            <li style={{height:'100px'}}></li>
            <li style={{height:'100px'}}></li>
            <li style={{height:'100px'}}></li>
            <li style={{height:'100px',backgroundColor: '#fff'}}></li>
            <li style={{height:'100px'}}></li>
            <li style={{height:'100px'}}></li>
            <li style={{height:'100px'}}></li>
        </ul>
      </div>
      <div style={{width:'100px', display: 'flex',
        height: '500px', backgroundColor: '#fff' }}>
        <ul className="yifu">
            <li style={{height:'100px'}}></li>
            <li style={{height:'100px'}}></li>
            <li style={{height:'100px'}}></li>
            <li style={{height:'100px'}}></li>
            <li style={{height:'100px'}}></li>
        </ul>
      </div>
      <div style={{width:'100px', display: 'flex',
        height: '500px', backgroundColor: '#fff' }}>
        <ul className="yifu">
            <li style={{height:'100px'}}></li>
            <li style={{height:'100px'}}></li>
            <li style={{height:'100px'}}></li>
            <li style={{height:'100px'}}></li>
            <li style={{height:'100px'}}></li>
        </ul>
      </div>
      <div style={{width:'100px', display: 'flex',
        height: '500px', backgroundColor: '#fff' }}>
        <ul className="yifu">
            <li style={{height:'100px'}}></li>
            <li style={{height:'100px'}}></li>
            <li style={{height:'100px'}}></li>
            <li style={{height:'100px'}}></li>
            <li style={{height:'100px'}}></li>
        </ul>
      </div>
      <div style={{width:'100px', display: 'flex',
        height: '500px', backgroundColor: '#fff' }}>
        <ul className="yifu">
            <li style={{height:'100px'}}></li>
            <li style={{height:'100px'}}></li>
            <li style={{height:'100px'}}></li>
            <li style={{height:'100px'}}></li>
            <li style={{height:'100px'}}></li>
        </ul>
      </div>
    </Tabs>
    <WhiteSpace />
  </div>
);