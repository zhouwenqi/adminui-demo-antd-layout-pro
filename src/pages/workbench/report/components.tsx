import AppChart, { type AppChartOption } from "@/components/AppChart";
import { Drawer, Flex, Segmented,theme,Grid, Card, Button, Tooltip } from "antd";
import type { DrawerProps } from "antd"
import { useEffect, useRef, useState } from "react";
import type {RefObject} from "react"
import { useIntl } from "react-intl";
import salesStyles from "./sales.module.css";
import { hexToRgbaString, useConfigState} from "@adminui-dev/antd-layout";
import {MoreVertical} from "lucide-react";

const {useToken} = theme
const { useBreakpoint } = Grid

type ChartType = "OS" | "Device"

/**
 * Visit chart drawer
 * @param props 
 * @returns 
 */
function VistChartDrawer(props:DrawerProps){
    const intl = useIntl()
    const {token} = useToken()
    const appChart:RefObject<any> = useRef(null)
    const [chartType,setChartType] = useState<ChartType>("OS")   
    const chartTypes = [
        {label:intl.formatMessage({id:"visit.chart.os.tag"}),value:"OS"},
        {label:intl.formatMessage({id:"visit.chart.device.tag"}),value:"Device"}
    ] 
    
    let data = [
        {value:32812,name:'PC'},
        {value:20123,name:'MAC'},
        {value:15323,name:'TABLET'},
        {value:27231,name:'MOBILE'},
        {value:18453,name:'WATCH'},
    ]

    let chartTitle = intl.formatMessage({id:"visit.chart.os.title"})
    if(chartType == 'OS'){
        data = [            
            {value:12304,name:'WINDOWS'},
            {value:21310,name:'OSX'},
            {value:17850,name:'IOS'},
            {value:32310,name:'ANDROID'},
            {value:16537,name:'LINUX'}
        ]
        chartTitle = intl.formatMessage({id:"visit.chart.device.title"})
    }  

    const option = {
        legend: {
          top: 'bottom'
        },
        grid:{
            show:false,
            top:'10px',
            left:'10px',
            right:'10px',
            bottom:'10px'
        },
        tooltip: {
            trigger: 'item',
            borderWidth: 0,
        },
        series: [
          {
            type: 'pie',            
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data: data
          }
        ]
    }

    useEffect(()=>{
        if(appChart.current){
            appChart.current.setOption(option)
        }
    },[chartType])
    
    return(
        <Drawer {...props} title={intl.formatMessage({id:"visit.chart.drawer.title"})}>
            <Flex orientation="vertical" justify="center" align="center">
                <h4 style={{margin:"0px",padding:"0px"}}>{chartTitle}</h4>
                <span style={{color:token.colorTextTertiary}}>2026/01 - 2026/03</span>
                <Segmented style={{marginTop:"8px"}} options={chartTypes} defaultValue="OS" value={chartType} onChange={(e)=>{setChartType(e as ChartType)}} />
            </Flex>
            <AppChart style={{ height:"600px"}} option={option} ref={appChart} />
        </Drawer>
    )
}

function SalesReportHeader(){
    const intl = useIntl()
    const {xs} = useBreakpoint()
    const {token} = useToken()
    const {layoutConfig} = useConfigState()
    const bgColor = layoutConfig.asideBlur || layoutConfig.headerBlur ? hexToRgbaString(token.colorBgContainer,0.6) : token.colorBgContainer
    const boxStyles:React.CSSProperties = {
        flexWrap:xs ? "wrap" : "inherit",
        gap:xs ? "0.5rem" : "0px",
        border:`solid 1px ${token.colorBorderSecondary}`,
        backgroundColor:bgColor
    }
    const cardStyles:React.CSSProperties = {
        width:xs? "100%" : "auto",
        flexFlow:xs ? "row" : "column",
        gap:xs ? "1rem" : "0rem",
        borderWidth:xs ? "0px" : "1px",
    }
    const itemStyles:React.CSSProperties = {
        flexFlow:xs ? "column" :"row",
        gap: xs ? "0px" : "4px"
    }
    return(
        <div className={salesStyles.salesReportHeader} style={boxStyles}>
            <div>
                <span>{intl.formatMessage({id:"sales.total.order.amount"})}</span>
                <h2>$6703829</h2>                
            </div>
            <div style={cardStyles}>
                <div style={itemStyles}>
                    <span>{intl.formatMessage({id:"sales.total.order.paid"})}</span>
                    <span className={salesStyles.memo}>$5406673</span>
                </div>
                <div style={itemStyles}>
                    <span>{intl.formatMessage({id:"sales.total.order.unpaid"})}</span>
                    <span className={salesStyles.memo}>$738290</span>
                </div>
                <div style={itemStyles}>
                    <span>{intl.formatMessage({id:"sales.total.order.refund"})}</span>
                    <span className={salesStyles.memo}>$38290</span>
                </div>
            </div>
            <div style={cardStyles}>
                <div style={itemStyles}>
                    <span>{intl.formatMessage({id:"sales.total.order.total"})}</span>
                    <span className={salesStyles.memo}>78665</span>
                </div>
                <div style={itemStyles}>
                    <span>{intl.formatMessage({id:"sales.total.order.service"})}</span>
                    <span className={salesStyles.memo}>273</span>
                </div>
                <div style={itemStyles}>
                    <span>{intl.formatMessage({id:"sales.total.order.superseded"})}</span>
                    <span className={salesStyles.memo}>456</span>
                </div>
            </div>
        </div>
    )
}
const getRandomNumber=(s:number,t:number):number=>{
    return Math.floor(Math.random()*(t-s))+t
}
const osChartData = [[getRandomNumber(1000,2000),getRandomNumber(1400,4000),getRandomNumber(800,1500),getRandomNumber(3000,4000),getRandomNumber(1400,2500)],[getRandomNumber(1000,2000),getRandomNumber(1400,4000),getRandomNumber(800,1500),getRandomNumber(3000,4000),getRandomNumber(1400,2500)],[getRandomNumber(1000,2000),getRandomNumber(1400,4000),getRandomNumber(800,1500),getRandomNumber(3000,4000),getRandomNumber(1400,2500)],[getRandomNumber(1000,2000),getRandomNumber(1400,4000),getRandomNumber(800,1500),getRandomNumber(3000,4000),getRandomNumber(1400,2500)],[getRandomNumber(1000,2000),getRandomNumber(1400,4000),getRandomNumber(800,1500),getRandomNumber(3000,4000),getRandomNumber(1400,2500)]]
const osChartOption:AppChartOption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
        type: 'shadow'
        }
    },
    legend: {
        data: ['WINDOWS', 'OSX', 'IOS', 'ANDROID', 'LINUX']
    },
    grid:{
        top:'50px',
        left:'50px',
        right:'30px',
        bottom:'40px'
    },      
    xAxis: [
        {
        type: 'category',
        axisTick: { show: false },
        data: ['2012', '2023', '2024', '2025', '2026'],
        axisLine:{show:false}
        }
    ],
    yAxis: [
        {
        type: 'value'
        }
    ],
    series: [
        {
        name: 'WINDOWS',
        type: 'bar',
        barGap: 0,
        emphasis: {
            focus: 'series'
        },
        itemStyle: {
            borderRadius: 5
        },
        data: osChartData[0]
        },
        {
        name: 'OSX',
        type: 'bar',
        emphasis: {
            focus: 'series'
        },
        itemStyle: {
            borderRadius: 5
        },
        data: osChartData[1]
        },
        {
        name: 'IOS',
        type: 'bar',
        emphasis: {
            focus: 'series'
        },
        itemStyle: {
            borderRadius: 5
        },
        data: osChartData[2]
        },
        {
        name: 'ANDROID',
        type: 'bar',
        emphasis: {
            focus: 'series'
        },
        itemStyle: {
            borderRadius: 5
        },
        data: osChartData[3]
        },
        {
        name: 'LINUX',
        type: 'bar',
        emphasis: {
            focus: 'series'
        },
        itemStyle: {
            borderRadius: 5
        },
        data: osChartData[4]
        }
    ]
}


const deviceChartOption:AppChartOption = {
    legend: {
        top: 'bottom'
    },
    grid:{
        show:false,
        top:'10px',
        left:'10px',
        right:'10px',
        bottom:'10px'
    },
    tooltip: {
        trigger: 'item',
        borderWidth: 0,
    },
    series: [
        {
        type: 'pie',            
        roseType: 'area',
        itemStyle: {
            borderRadius: 8
        },
        data: [
                {value:getRandomNumber(1200,2900),name:'PC'},
                {value:getRandomNumber(1400,2600),name:'MAC'},
                {value:getRandomNumber(1200,3400),name:'MOBILE'},
                {value:getRandomNumber(1000,2800),name:'TABLET'},
                {value:getRandomNumber(1600,3800),name:'WATCH'}
            ]
        }
    ]
}

function SalesOsChart(){
    const intl = useIntl()
    const {token} = useToken()
    const {layoutConfig} = useConfigState()
    const appChart:RefObject<any> = useRef(null)
    const bgColor = layoutConfig.asideBlur || layoutConfig.headerBlur ? hexToRgbaString(token.colorBgContainer,0.6) : token.colorBgContainer
    return(
        <Card style={{backgroundColor:bgColor}} title={intl.formatMessage({id:"sales.chart.os.title"})} extra={<Tooltip title={intl.formatMessage({id:"global.more"})}><Button type="text" icon={<MoreVertical size={14} />} /></Tooltip>}>
            <AppChart style={{width:"100%",height:"400px"}} option={osChartOption} ref={appChart} />
        </Card>        
    )
}

function SalesDeviceChart(){
    const intl = useIntl()
    const {token} = useToken()
    const {layoutConfig} = useConfigState()
    const appChart:RefObject<any> = useRef(null)
    const bgColor = layoutConfig.asideBlur || layoutConfig.headerBlur ? hexToRgbaString(token.colorBgContainer,0.6) : token.colorBgContainer
    return(
        <Card style={{backgroundColor:bgColor}} title={intl.formatMessage({id:"sales.chart.device.title"})} extra={<Tooltip title={intl.formatMessage({id:"global.more"})}><Button type="text" icon={<MoreVertical size={14} />} /></Tooltip>}>
            <AppChart style={{width:"100%",height:"400px"}} option={deviceChartOption} ref={appChart} />
        </Card>  
    )
}

export default function useVisitChart(){
    const [openDetails,setOpenDetails] = useState<boolean>(false)
    const detailsDrawer = <VistChartDrawer size={500} open={openDetails} onClose={()=>{setOpenDetails(false)}} />
    const showDetails=()=>{        
        setOpenDetails(true)
    }
    return {showDetails, detailsDrawer}
}

export {SalesReportHeader,SalesOsChart,SalesDeviceChart}