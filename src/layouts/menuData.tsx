import type { MenuData }  from "@adminui-dev/antd-layout"
import {Badge} from "antd"
import {UsersRound,Contact,UserLock,Shield,BrickWallShield,FingerprintPattern,HeartHandshake,Gauge,MonitorCheck,Bell,ChartNoAxesCombined,TableProperties,BadgeDollarSign,Globe,ClipboardClock,ScanFace,NotebookPen,Scale,SquareChartGantt,Box,Cog,MonitorCog,Building2} from "lucide-react"
/**
 * Menu data
 * A menu corresponds to a route, and the root menu is not displayed, but it must correspond to a layout route because an item may have a layout.
 */
const menuData:MenuData = {
    name:"",
    path:"/",
    label:"Dashboard",
    icon:<Gauge />,
    children:[
        {name:"welcome",path:"./welcome",label:"Welcome",icon:<HeartHandshake />},
        {name:"login",path:"./login",label:"Login",layout:false},
        {name:"workbench",path:"./workbench",label:"Workbench",icon:<MonitorCheck />,children:[            
            {name:"notifications",path:"./notifications",label:"Notifications",icon:<Bell />,extra:<Badge count={18} />},
            {name:"monitoring",path:"./monitoring",label:"Monitoring",icon:<ChartNoAxesCombined />},
            {name:"report",path:"./report",label:"Report",icon:<TableProperties />,children:[                
                {name:"visit",path:"./visit",label:"Visit",icon:<Globe />},
                {name:"sales",path:"./sales",label:"Sales",icon:<BadgeDollarSign />},
            ]},
            {name:"logs",path:"./logs",label:"Logs",icon:<ClipboardClock />,children:[
                {name:"login",path:"./login",label:"Login",icon:<ScanFace />},
                {name:"operation",path:"./operation",label:"Operation",icon:<NotebookPen />},
            ]},
        ]},
        {name:"transaction",path:"./transaction",label:"Transaction",icon:<Scale />,children:[
            {name:"order",path:"./order",label:"Order",icon:<SquareChartGantt />},
            {name:"order",path:"./product",label:"Product",icon:<Box />},
        ]},
        {name:"system",path:"./system",label:"System",icon:<MonitorCog />,children:[
            {name:"settings",path:"./settings",label:"Settings",icon:<Cog />},
            {name:"organizations",path:"./organizations",label:"Organizations",icon:<Building2 />,children:[
                {name:"dept",path:"./dept",label:"Dept",icon:<Contact />},
                {name:"user",path:"./user",label:"User",icon:<UsersRound />},
            ]},
            {name:"security",path:"./security",label:"Security",icon:<Shield  />,children:[
                {name:"role",path:"./role",label:"Role",icon:<UserLock />},
                {name:"permission",path:"./permission",label:"Permission",icon:<FingerprintPattern />},
                {name:"firewall",path:"./firewall",label:"Firewall",icon:<BrickWallShield />},
            ]},
        ]},
    ]
}
export default menuData