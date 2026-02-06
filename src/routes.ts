import { LazyPage } from "@adminui-dev/antd-layout"
import { createBrowserRouter,redirect } from "react-router-dom"

const DashboardLayout = LazyPage(()=>import("@/layouts"))
const LoginPage = LazyPage(()=>import("@/pages/login"))
const OrderPage = LazyPage(()=>import("@/pages/transaction/order"))
const ProductPage = LazyPage(()=>import("@/pages/transaction/product"))
const WelcomePage = LazyPage(()=>import("@/pages/welcome"))
const NotificationsPage = LazyPage(()=>import("@/pages/workbench/notifications"))
const MonitoringPage = LazyPage(()=>import("@/pages/workbench/monitoring"))
const LoginLogsPage = LazyPage(()=>import("@/pages/workbench/logs/login"))
const OperationLogsPage = LazyPage(()=>import("@/pages/workbench/logs/operation"))
const SalesReportPage = LazyPage(()=>import("@/pages/workbench/report/sales"))
const VisitReportPage = LazyPage(()=>import("@/pages/workbench/report/visit"))
const SettingsPage = LazyPage(()=>import("@/pages/system/settings"))
const DeptPage = LazyPage(()=>import("@/pages/system/organizations/dept"))
const SysUserPage = LazyPage(()=>import("@/pages/system/organizations/user"))
const PermissionPage = LazyPage(()=>import("@/pages/system/security/permission"))
const RolePage = LazyPage(()=>import("@/pages/system/security/role"))
const FirewallPage = LazyPage(()=>import("@/pages/system/security/firewall"))
const NotFound = LazyPage(()=>import("@/pages/404"))
/**
 * global router data
 * standard react-router solution
 * reference: https://reactrouter.com/start/data/routing
 *  
 */
const routers = createBrowserRouter(
    [
       {path:"/",Component:DashboardLayout, children:[
        {index:true,loader:()=>redirect("/welcome")},    
        {path:"welcome",Component:WelcomePage},    
        {path:"workbench",children:[
            {index:true,loader:()=>redirect("/workbench/monitoring")},            
            {path:"notifications",Component:NotificationsPage},
            {path:"monitoring",Component:MonitoringPage},                        
            {path:"report",children:[
                {index:true,loader:()=>redirect("/workbench/report/visit")},
                {path:"visit",Component:VisitReportPage},
                {path:"sales",Component:SalesReportPage},
            ]},
            {path:"logs",children:[
                {index:true,loader:()=>redirect("/workbench/logs/login")},
                {path:"login",Component:LoginLogsPage},
                {path:"operation",Component:OperationLogsPage},
            ]}
        ]},
        {path:"transaction",children:[
            {index:true,loader:()=>redirect("/transaction/order")},
            {path:"order",Component:OrderPage},
            {path:"product",Component:ProductPage}
        ]},
        {path:"system",children:[
            {index:true,loader:()=>redirect("/system/settings")},
            {path:"settings",Component:SettingsPage},
            {path:"organizations",children:[
                {index:true,loader:()=>redirect("/organizations/dept")},
                {path:"dept",Component:DeptPage},
                {path:"user",Component:SysUserPage}
            ]},
            {path:"security",children:[
                {index:true,loader:()=>redirect("/security/role")},
                {path:"role",Component:RolePage},
                {path:"permission",Component:PermissionPage},
                {path:"firewall",Component:FirewallPage}
            ]},
        ]},        
        { path:"/login",Component:LoginPage },      
       ]},       
       { path:"*",Component:NotFound}
    ]
)

export { routers }

