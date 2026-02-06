import { theme, Tag, Flex, Space,  Grid, Row, Col, Card, Button, Tooltip, Popover, Typography } from "antd"
import styles from "./index.module.css"
import type { OperationLog, Project, User } from "@/pages/typings"
import { LazyAvatar, LazyImage, useBlurStyles, useConfigState } from "@adminui-dev/antd-layout"
import { User2,ArrowUp,ArrowDown,Flag,MoreVertical, Users } from "lucide-react"
import type { AppChartOption } from "@/components/AppChart"
import AppChart from "@/components/AppChart"
import dayjs from 'dayjs'
import { useIntl } from "react-intl"

const {Text} = Typography
const { useToken } = theme
const { useBreakpoint } = Grid

const user:User = {
    id:20389283,
    uid:"Scapegoat",
    realName:"Scapegoat",
    avatarUrl:"https://api.dicebear.com/9.x/miniavs/svg?seed=8",
    email:"zhouwenqi@me.com",
    roleName:"Admin",
    deptName:"Development",
    lastDate:"2026/01/24 23:42",
    createDate:"2025/07/23 18:39"    
}

const chartBoxStyle:React.CSSProperties = {
    position: "absolute",
    bottom:"8px",
    right:"8px",
    height:"70px",
    width:"160px",
}

interface TotalCardProps extends React.HTMLAttributes<HTMLDivElement>{
    title:string,
    data?:string,
    footer:React.ReactNode,
    icon?:React.ReactNode,
    extra?:React.ReactNode,
}

/**
 * welcome header
 * @returns 
 */
function WelcomeHeaderPanel(){
    const { token } = useToken()
    const {xs} = useBreakpoint()
    const intl = useIntl()
    const {layoutConfig} = useConfigState()
    const cardStyles = useBlurStyles(token.colorBgContainer)
    let headerStyle:React.CSSProperties = {
        ...cardStyles,
        padding:token.paddingLG
    }
    let itemStyle:React.CSSProperties = {
        borderColor:token.colorBorderSecondary,
        paddingInlineEnd:token.padding,
    }
    let totalBoxStyle:React.CSSProperties = {

    }

    if(layoutConfig.noneHeader){
        headerStyle = {
            ...headerStyle,
            borderBottomRightRadius:token.borderRadiusLG,
            borderBottomLeftRadius:token.borderRadiusLG,
        }
    }

    if (xs) {
        headerStyle = {
            ...headerStyle,
            flexFlow:"column",
            textAlign:"center"
        }
        totalBoxStyle = {
            ...totalBoxStyle,   
            justifyContent:"center",
            width:"100%",
            marginBlockStart:token.margin,     
            borderTop:`solid 1px ${token.colorBorderSecondary}`,
            paddingBlockStart:token.padding,
        }
        itemStyle = {
            ...itemStyle,
            alignItems:"center"
        }
    }

    const hour = dayjs().hour()    
    var weltag = ''
    if(hour > 6 && hour < 11){
      weltag = intl.formatMessage({id:'welcome.header.time.morning'})
    }
    else if(hour > 11 && hour < 14){
      weltag = intl.formatMessage({id:'welcome.header.time.goodnoon'})  
    }else if(hour > 14 && hour < 18){
      weltag = intl.formatMessage({id:'welcome.header.time.afternoon'})
    }else{
      weltag = intl.formatMessage({id:'welcome.header.time.evening'})
    }

    const pd = token.padding

    return(
        <div className={styles.headerBox} style={headerStyle}>
            <Flex align="center" gap={pd} orientation={xs ? "vertical" :"horizontal"}>
                <LazyAvatar style={{minWidth:"64px"}} src={user.avatarUrl} size={64}/>
                <Flex orientation="vertical" gap={6}>                    
                    <span style={{fontSize:"1.4rem"}}>{weltag}, <span style={{color:token.colorPrimary}}>{user.realName}</span>, {intl.formatMessage({id:"welcome.header.happy"})}</span>
                    <Space styles={{root:{justifyContent:xs?"center":"initial"}}}>
                        <Tag>{user.deptName}</Tag>
                        <Tag>{user.roleName}</Tag>
                    </Space>
                </Flex>
            </Flex>   
            <div className={styles.totalBox} style={totalBoxStyle}>
                <div style={itemStyle}>
                    <span>{intl.formatMessage({id:"welcome.header.accountId"})}</span>
                    <span>20389283</span>
                </div>
                <div style={itemStyle}>
                    <span>{intl.formatMessage({id:"welcome.header.ip"})}</span>
                    <span>202.96.148.107</span>
                </div>
                <div style={{...itemStyle,borderColor:"transparent"}}>
                    <span>{intl.formatMessage({id:"welcome.header.level"})}</span>
                    <span>Pro</span>
                </div>
            </div>         
        </div>
    )
}



/**
 * Grid card item
 * @param props 
 * @returns 
 */
function TotalCard(props:TotalCardProps){   
    const { token }  = useToken()   
    const cardStyles = useBlurStyles(token.colorBgContainer)
    const cardStyle:React.CSSProperties = {
        ...cardStyles,
        margin:token.marginXS,
        whiteSpace:"nowrap"
    }
    return(
        <Col
        xs={24}
        sm={24}
        md={12}
        lg={12}
        xl={12}>
            <Card style={cardStyle}>
                <Flex justify="space-between">
                    <Space orientation="vertical" size={14}>
                        <span style={{fontSize:token.fontSizeHeading5,color:token.colorTextSecondary}}>{props.title}</span>
                        <h4 style={{fontWeight:"500",fontSize:"2rem",margin:"0px",padding:"0px"}}>{props.data}</h4>                       
                        {props.footer}
                    </Space>
                    {props.extra}
                    {props.children}                  
                </Flex>                
            </Card>
        </Col>
    )
}


const userChartoption:AppChartOption = {
    dataset:{
        source:[{'week':'Monday','value':200},{'week':'Tuesday','value':1200},{'week':'Wednesday','value':800},{'week':'Thursday','value':1460},{'week':'Friday','value':560},{'week':'Saturday','value':790},{'week':'Sunday','value':410}],
        dimensions:['week','value']
    },
    tooltip: {
        trigger: 'axis',
        borderWidth: 0
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        show:false,
    },
    yAxis: {
        type: 'value',
        show:false
    },
    grid: {
        show:false
    },        
    series: [
        {
        type: 'line',
        smooth: true,
        showSymbol: false,
        color:['#20b523'],
        areaStyle: {
            color:{
                type:'linear',
                x:0,
                y:0,
                x2:0,
                y2:1,
                colorStops:[
                    {offset:0,color:'rgba(32,181,35,0.6)'},
                    {offset:0.5,color:'rgba(32,181,35,0.2)'},
                    {offset:0.9,color:'rgba(32,181,35,0)'},
                ]
            }
        }
        }
    ]
}

const orderChartOption:AppChartOption = {
    dataset:{
        source:[{'date':'2022-11-01','value':140},{'date':'2022-11-02','value':450},{'date':'2022-11-03','value':1960},{'date':'2022-11-04','value':370},{'date':'2022-11-05','value':1750},{'date':'2022-11-06','value':790}],
        dimensions:['date','value']
    },
    tooltip: {
        trigger: 'axis',
        borderWidth: 0,
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        show:false,
    },
    yAxis: {
        type: 'value',
        show:false
    },
    grid: {
        show:false
    },        
    series: [
        {
        type: 'line',
        smooth: true,
        showSymbol: false,
        color:['#5d90f6'],
        areaStyle: {
            color:{
                type:'linear',
                x:0,
                y:0,
                x2:0,
                y2:1,
                colorStops:[
                    {offset:0,color:'rgba(93,144,246,0.6)'},
                    {offset:0.5,color:'rgba(93,144,246,0.2)'},
                    {offset:0.9,color:'rgba(93,144,246,0)'},
                ]
            }
        }
        }
    ]
}

const salesChartOption:AppChartOption = {
    dataset:{
        source:[{'month':'2022-06','value':90},{'month':'2022-07','value':780},{'month':'2022-08','value':490},{'month':'2022-09','value':1270},{'month':'2022-10','value':530},{'month':'2022-11','value':780},{'month':'2022-12','value':419}],
        dimensions:['month','value']
    },
    tooltip: {
        trigger: 'axis',
        borderWidth: 0,
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        show:false,
    },
    yAxis: {
        type: 'value',
        show:false
    },
    grid: {
        show:false
    },        
    series: [
        {
        type: 'line',
        smooth: true,
        showSymbol: false,
        color:['#5d90f6']
        }
    ]
}

/**
 * Grid panel
 * @returns 
 */
function GridPanel(){
    const intl=useIntl()
    const {token} = useToken()
    const footerStyle:React.CSSProperties = {
        color:token.colorTextTertiary,
        fontSize:token.fontSize,
        display:"inline-flex",
        gap:"6px",
    }

    const userPanelProps:TotalCardProps = {
        title:intl.formatMessage({id:"welcome.grid.user.title"}),
        icon:<User2 size={16} />,
        extra: <Popover placement="bottomLeft" content={<Space orientation="vertical"><Button type="text">{intl.formatMessage({id:"welcome.grid.user.option.monday"})}</Button><Button type="text">{intl.formatMessage({id:"welcome.grid.user.option.saturday"})}</Button><Button type="text">{intl.formatMessage({id:"welcome.grid.user.option.sunday"})}</Button></Space>}><Button type="text">{intl.formatMessage({id:"welcome.grid.user.option.monday"})}</Button></Popover>,
        data:"855",
        footer:<div style={footerStyle}><Tag style={{display:"inline-flex",alignItems:"center",gap:"4px"}} color="green" icon={<ArrowUp size={12} />}>12%</Tag>{intl.formatMessage({id:"welcome.grid.user.footer"})}</div>
    }

    const orderPanelProps:TotalCardProps = {
        title:intl.formatMessage({id:"welcome.grid.order.title"}),
        icon:<User2 size={16} />,
        extra: <Tooltip title={intl.formatMessage({id:"global.more"})}><Button type="text" icon={<MoreVertical size={14} />} /></Tooltip>,
        data:"1198",
        footer:<div style={footerStyle}><Tag style={{display:"inline-flex",alignItems:"center",gap:"4px"}} color="error" icon={<ArrowDown size={12} />}>17%</Tag>{intl.formatMessage({id:"welcome.grid.order.footer"})}</div>
    }

    const salesPanelProps:TotalCardProps = {
        title:intl.formatMessage({id:"welcome.grid.sales.title"}),
        icon:<User2 size={16} />,
        extra: <Tooltip title={intl.formatMessage({id:"global.more"})}><Button type="text" icon={<MoreVertical size={14} />} /></Tooltip>,
        data:"$10938.86",
        footer:<div style={footerStyle}><Tag style={{display:"inline-flex",alignItems:"center",gap:"4px"}} color="error" icon={<ArrowDown size={12} />}>32%</Tag>{intl.formatMessage({id:"welcome.grid.sales.footer"})}</div>
    }

    const todoPanelProps:TotalCardProps = {
        title:intl.formatMessage({id:"welcome.grid.todo.title"}),
        icon:<User2 size={16} />,
        data:"34",
        footer:<div style={footerStyle}><Tag style={{display:"inline-flex",alignItems:"center",gap:"4px"}} color="error" icon={<Flag size={12} />}>12</Tag>{intl.formatMessage({id:"welcome.grid.todo.footer"})}</div>
    }

    return(
        <Row>
            <TotalCard {...userPanelProps} ><div style={chartBoxStyle}><AppChart option={userChartoption}  style={{width:"100%",height:"100%"}} /></div></TotalCard>
            <TotalCard {...orderPanelProps} ><div style={chartBoxStyle}><AppChart option={orderChartOption}  style={{width:"100%",height:"100%"}} /></div></TotalCard>
            <TotalCard {...salesPanelProps} ><div style={chartBoxStyle}><AppChart option={salesChartOption}  style={{width:"100%",height:"100%"}} /></div></TotalCard>
            <TotalCard {...todoPanelProps} ><div style={{...chartBoxStyle,height:"auto",textAlign:"right"}}><img style={{width:"90%"}} src="/images/visitiors.webp" alt="visitors.webp" /></div></TotalCard>
        </Row>
    )
}

const projectMap:Record<string,Project[]>={"en-US": [
    {id:1,name:'Calf school',code:'P208823',color:'#ff6600',icon:'/svg/project/p1.svg',createDate:'2022/12/8 23:22',description:'Creating value for corporate customers is the pursuit of the calf academy all along...',memberCount:4,speedCount:86,testCount:19},
    {id:2,name:'CodeMonkey horde',code:'P442323',color:'#2e78ff',icon:'/svg/project/p2.svg',createDate:'2022/12/8 23:22',description:'Code Monkey horde APP is a real dating software with easy registration...',memberCount:12,speedCount:59,testCount:51},
    {id:3,name:'Tea on Front-End',code:'A02342',color:'#ac36ca',icon:'/svg/project/p3.svg',createDate:'2022/12/8 23:22',description:'The front-end tea APP Naixue wants to create a lifestyle. Always between product...',memberCount:6,speedCount:38,testCount:67},
    {id:4,name:'Product Speeder',code:'A093823',color:'#57ad2d',icon:'/svg/project/p4.svg',createDate:'2022/12/8 23:22',description:'Only for the product manager, others do not answer, product speeding...',memberCount:22,speedCount:93,testCount:31}
],"zh-CN":[
    {id:1,name:'牛犊子学堂',code:'P208823',color:'#ff6600',icon:'/svg/project/p1.svg',createDate:'2022/12/8 23:22',description:'为企业客户创造价值是牛犊子学堂一直以来的追求，通过丰富的产品矩阵为...',memberCount:4,speedCount:86,testCount:19},
    {id:2,name:'代码猴部落',code:'P442323',color:'#2e78ff',icon:'/svg/project/p2.svg',createDate:'2022/12/8 23:22',description:'代码猴部落APP是一款注册方便，秒速登录的真人交友软件，最大程度...',memberCount:12,speedCount:59,testCount:51},
    {id:3,name:'前端的茶',code:'A02342',color:'#ac36ca',icon:'/svg/project/p3.svg',createDate:'2022/12/8 23:22',description:'前端的茶APP奈雪要打造的是一种生活方式。在产品与自然之间始终...',memberCount:6,speedCount:38,testCount:67},
    {id:4,name:'产品飞车',code:'A093823',color:'#57ad2d',icon:'/svg/project/p4.svg',createDate:'2022/12/8 23:22',description:'只为产品经理服务，其它人不接，产品飞车带您快速进入天堂...',memberCount:22,speedCount:93,testCount:31}
]}

function ProjectPanel(){    
    const intl = useIntl()
    const { token } = useToken()
    const { locale } = useConfigState()
    let projectData = locale ? projectMap[locale] : projectMap["en-US"]
    let items:React.ReactNode[]=[]
    projectData.forEach((item,index)=>{
        items.push(<ProjectItem project={item} key={index} />)
    })
    
    const cardStyles = useBlurStyles(token.colorBgContainer) 

    return(
        <Card className={styles.projectBox} style={cardStyles} title={intl.formatMessage({id:"welcome.project.title"})} extra={<Tooltip title={intl.formatMessage({id:"global.more"})}><Button type="text" icon={<MoreVertical size={14} />} /></Tooltip>} >
            {items}
        </Card>
    )
}

function ProjectItem(props:{project:Project}){
    const {project} = props 
    return(
        <Flex gap={"middle"} justify="space-between" className={styles.projectItem}>
            <Flex gap={"middle"}>
                <div><LazyImage style={{width:"42px"}} src={project.icon} alt={project.name}/></div>
                <div className={styles.subject}><a style={{margin:"0px",padding:"0px"}}>{project.name}</a><span className={styles.description}>{project.description}</span></div>
            </Flex>
            <Button type="text" icon={<Users size={14} />}>{project.memberCount}</Button>
        </Flex>
    )
}


const paymentChartOption:AppChartOption = {
    tooltip: {
        trigger: 'item',
        borderWidth: 0,
        formatter: (obj:any)=> {
        return ''+obj.percent+'%'
        }
    },
    legend: {
        orient: 'vertical',
        left: 'left'
    },
    grid:{
        right:'0px',
        bottom:'0px'
    }, 
    series: [
        {
        name: 'Channel',
        type: 'pie',
        radius: [50, 160],
        avoidLabelOverlap: false,
        roseType: 'area',      
        itemStyle: {
            borderRadius: 5
        },
        label: {
            show: false,
            position: 'center'
        },
        emphasis: {
            label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold'
            }
        },
        labelLine: {
            show: false
        },
        data: [
            {
                "name": "Alipay",
                "value": 13288,
            },
            {
                "name": "GooglePay",
                "value": 13600,
            },
            {
                "name": "WeixinPay",
                "value": 18180,
            },
            {
                "name": "ApplePay",
                "value": 11388,
            },
            {
                "name": "Other",
                "value": 9688,
            }
        ]
        }
    ]
}

const operationLogMap:Record<string,OperationLog[]> = {
    "zh-CN":[
        {id:1,name:'Aneka',avatar:'https://api.dicebear.com/9.x/miniavs/svg?seed=1',createDate:'2022/12/8 23:24',action:'VERIFY',content:(<><Text strong>Aneka </Text><Text type="success">审核</Text><Text> 了一张订单： </Text><Text type="secondary">PSN204823422</Text></>)},
        {id:2,name:'Felix',avatar:'https://api.dicebear.com/9.x/miniavs/svg?seed=2',createDate:'2022/12/8 23:24',action:'DELETE',content:<><Text strong>Felix </Text><Text type="danger">删除</Text><Text> 了订单： </Text><Text type="secondary" delete>PSN49837246</Text></>},
        {id:3,name:'Neutral',avatar:'https://api.dicebear.com/9.x/miniavs/svg?seed=3',createDate:'2022/12/8 23:24',action:'UPDATE',content:<><Text strong>Neutral </Text><Text type="warning">修改</Text><Text> 了用户(173****234)的 </Text><Text type="secondary">登录密码</Text></>},    
        {id:4,name:'Adventurer',avatar:'https://api.dicebear.com/9.x/miniavs/svg?seed=4',createDate:'2022/12/8 23:24',action:'LOGIN',content:<><Text strong>Adventurer </Text><Text> 使用手机端APP </Text><Text type="success">登录</Text><Text type="secondary"> 沃登后台管理系统</Text></>},  
        {id:5,name:'Lorelei',avatar:'https://api.dicebear.com/9.x/miniavs/svg?seed=5',createDate:'2022/12/8 23:24',action:'PUBLISH',content:<><Text strong>Lorelei </Text><Text type="success">发布</Text><Text> 商品信息 </Text><Text type="secondary"> 沃登多功能无人机</Text></>},  
        {id:6,name:'Miniavs',avatar:'https://api.dicebear.com/9.x/miniavs/svg?seed=6',createDate:'2022/12/8 23:24',action:'JOIN',content:<><Text strong>Oracle </Text><Text type="success">加入</Text><Text> 项目 </Text><Text type="secondary"> 产品飞车</Text></>}, 
        {id:7,name:'Apple',avatar:'https://api.dicebear.com/9.x/miniavs/svg?seed=9',createDate:'2022/12/8 23:24',action:'VERIFY',content:(<><Text strong>Apple </Text><Text type="success">审核</Text><Text> 了一张订单： </Text><Text type="secondary">PSN24266234</Text></>)},
    ],
    "en-US":[
        {id:1,name:'Aneka',avatar:'https://api.dicebear.com/9.x/miniavs/svg?seed=1',createDate:'2022/12/8 23:24',action:'VERIFY',content:(<><Text strong>Aneka </Text><Text type="success">Verify</Text><Text> an order： </Text><Text type="secondary">PSN204823422</Text></>)},
        {id:2,name:'Felix',avatar:'https://api.dicebear.com/9.x/miniavs/svg?seed=2',createDate:'2022/12/8 23:24',action:'DELETE',content:<><Text strong>Felix </Text><Text type="danger">Delete</Text><Text> an order： </Text><Text type="secondary" delete>PSN49837246</Text></>},
        {id:3,name:'Neutral',avatar:'https://api.dicebear.com/9.x/miniavs/svg?seed=3',createDate:'2022/12/8 23:24',action:'UPDATE',content:<><Text strong>Neutral </Text><Text type="warning">Modify</Text><Text> user(173****234) is </Text><Text type="secondary">login password</Text></>},    
        {id:4,name:'Adventurer',avatar:'https://api.dicebear.com/9.x/miniavs/svg?seed=4',createDate:'2022/12/8 23:24',action:'LOGIN',content:<><Text strong>Adventurer </Text><Text> use mobile-app </Text><Text type="success">Login</Text><Text type="secondary"> warden system</Text></>},  
        {id:5,name:'Lorelei',avatar:'https://api.dicebear.com/9.x/miniavs/svg?seed=5',createDate:'2022/12/8 23:24',action:'PUBLISH',content:<><Text strong>Lorelei </Text><Text type="success">Publish</Text><Text> product info </Text><Text type="secondary"> warden intelligent UAVs</Text></>},  
        {id:6,name:'Miniavs',avatar:'https://api.dicebear.com/9.x/miniavs/svg?seed=6',createDate:'2022/12/8 23:24',action:'JOIN',content:<><Text strong>Miniavs </Text><Text type="success">Join</Text><Text> project </Text><Text type="secondary"> PM fly up</Text></>}, 
        {id:7,name:'Apple',avatar:'https://api.dicebear.com/9.x/miniavs/svg?seed=9',createDate:'2022/12/8 23:24',action:'VERIFY',content:(<><Text strong>Apple </Text><Text type="success">Verify</Text><Text> an order： </Text><Text type="secondary">PSN24266234</Text></>)},
    ]
}
/**
 * payment channel
 * @returns 
 */
function PaymentChannelPanel(){
    const intl = useIntl()
    const { token } = useToken()
    const cardStyles = useBlurStyles(token.colorBgContainer)

    return(
        <Card className={styles.projectBox} style={cardStyles} title={intl.formatMessage({id:"welcome.playment.title"})} extra={<Tooltip title={intl.formatMessage({id:"global.more"})}><Button type="text" icon={<MoreVertical size={14} />} /></Tooltip>} >
            <AppChart option={paymentChartOption} style={{height:"320px"}} />
        </Card>
    )
}

function LogsPanel(){
    const { token } = useToken()    
    const { locale } = useConfigState()  
    const {xs} = useBreakpoint() 
    const  intl = useIntl()
    const logsData = locale ? operationLogMap[locale] : operationLogMap["en-US"]

    let items:React.ReactNode[]=[]
    logsData.forEach((item,index)=>{
        items.push(<LogsItem key={index} log={item} isMobile={xs||false} />)
    })

    const cardStyles = useBlurStyles(token.colorBgContainer)

    return(
        <Card className={styles.logsCard} style={cardStyles} title={intl.formatMessage({id:"welcome.logs.title"})} extra={<Tooltip title={intl.formatMessage({id:"global.more"})}><Button type="text" icon={<MoreVertical size={14} />} /></Tooltip>}>
            {items}          
        </Card>
    )    
}

function LogsItem(props:{log:OperationLog,isMobile:boolean}){
    const { log , isMobile} = props
    const intl = useIntl()
    const { token } = useToken()
    
    return(
        <div className={styles.logsItem}>
            <Flex gap={token.paddingXS}>
                <LazyAvatar size={"small"} src={log.avatar} />
                {isMobile ? <></> : <Flex orientation="vertical">
                    <span style={{fontWeight:"500"}}>{log.name}</span>
                    <span style={{color:token.colorTextTertiary}}>{log.createDate}</span>
                </Flex>}
            </Flex>
            <div className={styles.logsContent} style={{justifyContent: isMobile ? "space-between" : "flex-end"}}>
                <span>{log.content}</span>
                <a>{intl.formatMessage({id:"global.view"})}</a>
            </div>
        </div>
    )
}

export { WelcomeHeaderPanel, GridPanel, ProjectPanel, PaymentChannelPanel,LogsPanel }