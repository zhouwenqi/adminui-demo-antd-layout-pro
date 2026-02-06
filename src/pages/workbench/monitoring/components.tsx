import AppChart, { type AppChartOption } from "@/components/AppChart"
import { Card, Grid, Statistic,Tooltip,Button, Space,theme } from "antd"
import { useEffect, useRef, useState} from "react"
import type { RefObject } from "react"
import { useIntl } from "react-intl"
import dayjs from "dayjs"
import { Activity,StepForward,ArrowRight,ArrowLeft,MoreVertical } from "lucide-react"
import type { AgentTotal,AreaSales } from "@/pages/typings"
import styles from "./index.module.css"
import { useBlurStyles} from "@adminui-dev/antd-layout"

const { Timer } = Statistic
const { useBreakpoint } = Grid
const {useToken} = theme

const colors:{[key:string]:string} = {
    NewYork:'#3ba272',
    ShangHai:'#b19c85',
    HongKong:'#fac858',
    Tokyo:'#5470c6',
    Seoul:'#73c0de',
    Dubai:'#fc8452',
    London:'#d88ec4',
    Berlin:'#ee6666',
    TaiWan:'#91cc75',
    Paris:'#9a60b4',
}

/**
 * Regional sales statistics(demo)
 * @author zhouwenqi
 * @returns 
 */
function AreaChartPanel(){
    const appChart:RefObject<any> = useRef(null)
    const intl = useIntl()
    const {xs} = useBreakpoint()
    const [endTime,setEndTime] = useState<number>(Date.now() + 60 * 5 * 1000)
    const [overly,setOverly] = useState<boolean>(false)
    const {token} = useToken()
    const cardStyles = useBlurStyles(token.colorBgContainer)
         
    const initOption = {
      dataset: {
        source: []
      },
      tooltip: {
        trigger: 'axis',
        borderWidth: 0,
      },
      grid:{
        top:'0px',
        left:intl.locale=='en-US'? '80px' : '40px',
        right:'14px',
        bottom:'20px'
      },
      xAxis: {
        min:10,
        max: 'dataMax',    
      },
      yAxis: { 
        type: 'category',
        inverse: true,
        realtimeSort: true,
        seriesLayoutBy: 'column',
        animationDuration: 300,
        animationDurationUpdate: 300,         
      },
      series: [
        {            
          type: 'bar',
          realtimeSort: true,
          encode: {
            x: 'value',
            y: 'name',
          },
          itemStyle:{
            color:(param:any)=>{
              return colors[param.value.area]
            },
            borderRadius:[0,8,8,0]            
          },
        }
      ],            
        barGap:"60%",
        barWidth:12,
        realtimeSort: true,
        animationDuration: 30,
        animationDurationUpdate: 3000,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear'
    }   

    const onReadyHandler=()=>{
      
    }

    const onRefresh=()=>{
        setOverly(false)
        setEndTime(Date.now() + 60 * 5 * 1000)
    }

    const onChangeHandler=(option:any,total:number,overly:boolean)=>{    
      console.log(total)  
      if(!overly && appChart.current){
        const ops = {grid:{left:intl.locale=='en-US'? '80px' : '40px'},...option}
        appChart.current.setOption(ops)
      }else{
        setOverly(overly)
      }
    }

    return(
        <Card title={intl.formatMessage({id:"monitoring.areasales.title"})} style={{...cardStyles}} extra={<Tooltip title={intl.formatMessage({id:"global.continue"})}><Button disabled={!overly} type="text" onClick={()=>{onRefresh()}} icon={<StepForward size={14} />} /></Tooltip>}>
            <div className={styles.areaHeader} style={{flexWrap:xs ? "wrap" :"initial"}}>
                <div>
                    <Statistic title={intl.formatMessage({id:'monitoring.areasales.begin.title'})} value={dayjs().format("YYYY-MM-DD HH:mm:ss")} />
                </div>
                <div>
                    <StatisticTotal onChange={onChangeHandler} endTime={endTime} />
                </div>
                <div>
                    <Timer title={intl.formatMessage({id:'monitoring.areasales.end.title'})} type="countdown" value={endTime}  format="HH:mm:ss:SSS"  />
                </div>
            </div>            
            <AppChart style={{width:"100%", height:"280px"}} ref={appChart} option={initOption} ready={onReadyHandler} />
        </Card>
    )
}

const areaSalesMap:Record<string,AreaSales[]> = {
    "en-US":[
        {name:'NewYork',value:0,time:'2025/12/19 8:05',area:'NewYork'},
        {name:'ShangHai',value:0,time:'2025/12/19 8:06',area:'ShangHai'},
        {name:'Tokyo',value:0,time:'2025/12/19 8:07',area:'Tokyo'},
        {name:'Seoul',value:0,time:'2025/12/19 8:09',area:'Seoul'},
        {name:'London',value:0,time:'2025/12/19 8:10',area:'London'},
        {name:'Dubai',value:0,time:'2025/12/19 8:11',area:'Dubai'},
        {name:'Berlin',value:0,time:'2025/12/19 8:12',area:'Berlin'},
        {name:'Paris',value:0,time:'2025/12/19 8:13',area:'Paris'},
        {name:'TaiWan',value:0,time:'2025/12/19 8:14',area:'TaiWan'},
        {name:'HongKong',value:0,time:'2025/12/19 8:15',area:'HongKong'},
    ],
    "zh-CN":[
        {name:'纽约',value:0,time:'2025/12/19 8:05',area:'NewYork'},
        {name:'上海',value:0,time:'2025/12/19 8:06',area:'ShangHai'},
        {name:'东京',value:0,time:'2025/12/19 8:07',area:'Tokyo'},
        {name:'首尔',value:0,time:'2025/12/19 8:09',area:'Seoul'},
        {name:'伦敦',value:0,time:'2025/12/19 8:10',area:'London'},
        {name:'迪拜',value:0,time:'2025/12/19 8:11',area:'Dubai'},
        {name:'伯林',value:0,time:'2025/12/19 8:12',area:'Berlin'},
        {name:'巴黎',value:0,time:'2025/12/19 8:13',area:'Paris'},
        {name:'台湾',value:0,time:'2025/12/19 8:14',area:'TaiWan'},
        {name:'香港',value:0,time:'2025/12/19 8:15',area:'HongKong'},
    ]
}

/**
 * Statistic number
 * @param props 
 * @returns 
 */
function StatisticTotal(props:{endTime:number,onChange:(data:AppChartOption,total:number,overly:boolean)=>void}){
    const intl = useIntl()
    const [total,setTotal] = useState(0)
    const locale = intl.locale
    const intervalRef:RefObject<any> = useRef(null)  
    const chartData:AreaSales[]=areaSalesMap[locale]
    
    useEffect(()=>{ 
        onRefreshData()
        return ()=>{
            onClearInterval()
        }
    },[locale,props.endTime])
    const onClearInterval=()=>{
        clearInterval(intervalRef.current)
    } 
    const onRefreshData=()=>{
        const interval = setInterval(()=>{
          var total = 0
          var overly = false
          if(Date.now() >= props.endTime){
            onClearInterval()
            overly = true
            props.onChange({},total,overly)  
            return
          }
          for(var i=0;i<10;i++){
            if(Math.random() > 0.9){
              chartData[i].value += Math.round(Math.random() * 10)
            }else{
              chartData[i].value += Math.round(Math.random() * 1)
            }
            total += chartData[i].value
          }
          const option = {
            dataset: {
              source: chartData
            }
          }
          setTotal(total)
          props.onChange(option,total,overly)          
        },300)
        intervalRef.current = interval
      }
    return(
        <Statistic title={intl.formatMessage({id:'monitoring.areasales.amount.title'})}  value={total+' K'} suffix={<Activity size={20} />} />
    )
}

function getRandomNumber(lastNum:number){
    let lnum = lastNum
    if(isNaN(lnum)){
        lnum = Math.floor(Math.random()*50)
    }
    let num = Math.floor((Math.round(Math.random())*2-1)*Math.floor(Math.random()*5))+lnum
    if(num < 0){
        num = 0
    }
    if(num > 100){
        num = 100
    }
    return num
}

const agentChartOption:AppChartOption = {
    colorBy:'series',
    color:[
        {
            type:'linear',
            x:0,
            y:0,
            x2:0,
            y2:1,
            colorStops:[
                {offset:0,color:'#5e71a0'},
                {offset:0.5,color:'#8598c2'},
                {offset:1,color:'#bcccef'}
            ]
        },
        {
            type:'linear',
            x:0,
            y:0,
            x2:0,
            y2:1,
            colorStops:[
                {offset:0,color:'#ee6767'},
                {offset:0.5,color:'#f09494'},
                {offset:1,color:'#ffddab'}
            ]
        },
        {
            type:'linear',
            x:0,
            y:0,
            x2:0,
            y2:1,
            colorStops:[
                {offset:0,color:'#62a587'},
                {offset:0.5,color:'#9fceb9'},
                {offset:1,color:'#c3edda'}
            ]
        } 
    ],       
    legend: {show:false},
    tooltip: {
        trigger: 'axis',
        borderWidth: 0,
    },
    dataset: {
        dimensions: ["time","pv","uv","ip"],
        source: []
    },
    grid:{
        show:false,
        top:'2px',
        left:'0px',
        right:'0px',
        bottom:'2px'
    },
    xAxis: {type:'category',boundaryGap: false,show:false},
    yAxis: {show:false},
    series: [{ type: 'line',seriesLayoutBy:'row',showSymbol: false}, { type: 'line',seriesLayoutBy:'row',showSymbol: false }, { type: 'line',seriesLayoutBy:'row',showSymbol: false }]
}
const getDataRow=(items:AgentTotal[])=>{
    var lastPV = 37
    var lastUV = 15
    var lastIP = 9        
    if(items.length>1){   
        const lastAny = items[items.length-1]
        lastPV = lastAny.pv
        lastUV = lastAny.uv
        lastIP = lastAny.ip            
    }
    return {            
        "time":dayjs().format("HH:mm:ss"),
        "pv":getRandomNumber(lastPV),
        "uv":getRandomNumber(lastUV),
        "ip":getRandomNumber(lastIP)
    }
} 
function getInitAgentData(){
  let items:AgentTotal[]=[]
  const start = dayjs().subtract(100, 'second');
  for(let i=0;i<100;i++){
    const timeStr = start.add(i, 'second').format('HH:mm:ss');
    items.push({time:timeStr,uv:getRandomNumber(15),pv:getRandomNumber(37),ip:getRandomNumber(9)})
  }  
  return items
}

/**
 * Agent data monitoring(demo)
 * @author zhouwenqi
 * @returns 
 */
function AgentChartPanel(props:{onMore:()=>void}){
  const appChart:RefObject<any> = useRef(null)
  const intl = useIntl()
  const intervalRef:RefObject<any> = useRef(null)
  const {token} = useToken()
  const cardStyles = useBlurStyles(token.colorBgContainer)

  let items = getInitAgentData()  
  const getData=()=>{
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    const interval = setInterval(()=>{
        items.push(getDataRow(items))
        if(items.length>100){
            items.splice(0,1)
        }
        const option = {            
            dataset: {
              source: items
            }
        }
        appChart.current.setOption(option)   
    },1000)
    intervalRef.current = interval
  }
  useEffect(()=>{
    return()=>{
      clearInterval(intervalRef.current)
      appChart.current = null
    }      
  },[])

  const onReadyHandler=()=>{
    getData() 
  }

  return(
    <Card title={intl.formatMessage({id:"monitoring.agent.title"})} style={{...cardStyles}} extra={<Tooltip title={intl.formatMessage({id:"global.more"})}><Button onClick={()=>{props.onMore()}} type="text" icon={<MoreVertical size={14} />} /></Tooltip>}>
      <AppChart style={{width:"100%", height:"300px"}} ref={appChart} option={agentChartOption} ready={onReadyHandler} />
    </Card>
  )
}

const transformChartOption:AppChartOption = {
    tooltip: {
        formatter: '{b} : {c}%',            
        borderWidth: 0,
    },
    grid:{
        top:'0px',
        left:'0px',
        right:'0px',
        bottom:'0px'
    },
    title:{},
    series: [
    {
        type: 'gauge',           
        progress: {
            show: true,
            width: 6
        },
        axisLine: {
            lineStyle: {
              width: 6
            }
        },
        title: {
            offsetCenter: [0, '30%'],
            fontSize: 14,
            color:'#999999'
        },
        axisTick: {
            show: true,
            distance:0,
            length: 4,
            lineStyle:{
                width:1,
                color:'#aaaaaa'
            }
            
        },  
        splitLine:{
            length: 8,
            distance:0,
            lineStyle:{
                width:1
            }
        },   
        axisLabel:{
            show:false
        },
        detail: {
            valueAnimation: true,
            formatter: '{value}%',
            fontSize: 24,
            offsetCenter: [0, '70%']
        },
        data: [
            {
                value: 0,
            }
        ]
    }
    ]
}

/**
 * Conversion rate chart(demo)
 * @author zhouwenqi
 * @returns 
 */
function TransformChartPanel(){
  const appChart:RefObject<any> = useRef(null)
  const intl = useIntl()
  const intervalRef:RefObject<any> = useRef(null)
  const [seed,setSeed] = useState<number>(0)
  const {token} = useToken()
  const cardStyles = useBlurStyles(token.colorBgContainer)

  let chartData = [
    {name:intl.formatMessage({id:"monitoring.transform.deal.tag"}),value:70},
    {name:intl.formatMessage({id:"monitoring.transform.retained.tag"}),value:75},
    {name:intl.formatMessage({id:"monitoring.transform.return.tag"}),value:65}
  ]
  const getData=()=>{
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    const interval = setInterval(()=>{
        chartData.forEach(item=>item.value = chartData[seed].value = Math.round(Math.random() * 30) + 70)        
        const option = {            
            series: {                   
              data: [chartData[seed]]
            }
        }
        appChart.current.setOption(option)   
    },300)
    intervalRef.current = interval
  }
  useEffect(()=>{
    return()=>{
      clearInterval(intervalRef.current)
      appChart.current = null
    } 
  },[])

  useEffect(()=>{
    clearInterval(intervalRef.current)
    getData()
  },[seed,intl.locale])

  const onPlusSeed=()=>{
    let s = seed + 1
    if(s>=chartData.length -1){
      s = chartData.length -1
    }
    setSeed(s)
  }
  const onReduceSeed=()=>{
    let s = seed - 1
    if(s<=0){
      s = 0
    }
    setSeed(s)
  }

  return(
    <Card title={intl.formatMessage({id:"monitoring.transform.title"})} style={{...cardStyles}} extra={<Space.Compact><Button disabled={seed < 1} onClick={()=>{onReduceSeed()}} type="text" icon={<ArrowLeft size={14} />} /><Button disabled={seed >= chartData.length -1} onClick={()=>{onPlusSeed()}} type="text" icon={<ArrowRight size={14} />} /></Space.Compact>}>
      <AppChart style={{width:"100%", height:"300px"}} ref={appChart} option={transformChartOption} />
    </Card>
  )
}
export { AreaChartPanel,AgentChartPanel,TransformChartPanel }