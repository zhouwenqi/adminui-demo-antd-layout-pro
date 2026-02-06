import { Tag, Button, Divider, Space, theme, Popconfirm } from "antd"
import type {PopconfirmProps} from "antd"
import { useAvatarPopover,useConfigState,LazyAvatar, LazyImage, useBrandPopover } from "@adminui-dev/antd-layout";
import {ContactRound,Siren,CircleUserRound,CircleAlert,Crown,LogOut,Plus,Check,BrushCleaning} from "lucide-react";
import WardenLogo from "./WardenLogo";
import type { User } from "../pages/typings";
import { useProfileDrawer } from "@/pages/system/organizations/components";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router";

const {useToken} = theme

const boxStyles:React.CSSProperties = {
    display:"flex",
    flexFlow:"column",
    justifyContent:"flex-start",
    alignItems:"flex-start",
    maxWidth:"300px",    
    minWidth:"180px"
}
const titleStyles:React.CSSProperties = {
    display:"flex",
    alignItems:"center",
    textAlign:"left",
    justifyContent:"flex-start",
    gap:"8px",
    width:"100%"
}
const titleText:React.CSSProperties ={
    flex:"1",
    display:"flex",
    flexFlow:"column",
    justifyContent:"flex-start",
    lineHeight:"1rem",    
    whiteSpace:"nowrap",
    textOverflow:"ellipsis",
    width:"100%",
    overflow:"hidden",
}

const btnRootStyle:React.CSSProperties = {
    textAlign:"left",
    justifyContent:"flex-start",
}

interface BrandTeam {
    id:number,
    name:string,
    logo:string | React.ReactNode,
}

/**
 * Personal Profile Pop up demo
 * @author zhouwenqi
 * @returns 
 */
function UserPopoverPanel(){
    const {token} = useToken()
    const { layoutConfig } = useConfigState()
    const { close } = useAvatarPopover()
    const navigate = useNavigate()
    const intl = useIntl()
    const { userInfo } = layoutConfig
    const {detailsDrawer,showDetails} = useProfileDrawer()

    const s1Style:React.CSSProperties = {
        whiteSpace:"nowrap",
        textOverflow:"ellipsis",
        width:"100%",
        fontWeight:"600",
        overflow:"hidden",
    }
    const s2Style:React.CSSProperties = {
        whiteSpace:"nowrap",
        textOverflow:"ellipsis",
        width:"100%",
        overflow:"hidden",
        color:token.colorTextSecondary
    }

    const fetchUserInfo=(uid:string):User | undefined=> {
        console.log(`find uid is ${uid} for user`)
        return {id:7,uid:"Scapegoat",realName:"Scapegoat",email:"zhouwenqi@me.com", deptId:3,deptName:"Marketing",roleId:3,roleName:"Query",avatarUrl:"https://api.dicebear.com/9.x/miniavs/svg?seed=8", lastDate:'2022/12/8 23:24',createDate:'2022/12/8 23:24'}
    }    

    if(!userInfo){
        return <></>
    }
    const user = fetchUserInfo(userInfo.uid)

    let faceElement:React.ReactNode = <></>

    if(userInfo?.avatar){
        if(typeof userInfo.avatar == "string"){            
            faceElement = <LazyAvatar shape="square" size={32} src={userInfo.avatar} alt={userInfo.uid} />
        }else{
            faceElement = userInfo.avatar
        }
    } 

    const onClickHandler=()=>{
        close!()
    }

    const onProfileHandler=()=>{
        showDetails(user)
        close!()
    }

    const confirmHandler: PopconfirmProps['onConfirm'] = (e) => {
        console.log(e)
        navigate("/login")
    }

    return(
        <div style={boxStyles}>
            {detailsDrawer}
            <div style={titleStyles}>
                {faceElement}
                <div style={titleText}>
                    <span style={s1Style}>{userInfo.uid}</span>
                    <span style={s2Style} >{userInfo.title}</span>
                </div>                
            </div>
            <Divider style={{marginTop:"12px",marginBottom:"4px"}} />
            
            <Button onClick={onProfileHandler} type="text" block icon={<ContactRound size={14} />} styles={{root:btnRootStyle}}>Profile</Button>            
            <Button onClick={onClickHandler} type="text" block icon={<Siren size={14} />} styles={{root:btnRootStyle}}>Notice</Button>         
            <Button onClick={onClickHandler} type="text" block icon={<CircleUserRound size={14} />} styles={{root:btnRootStyle}}>Account</Button>
            <Button onClick={onClickHandler} type="text" block icon={<BrushCleaning size={14} />} styles={{root:btnRootStyle}}><div style={{display:"flex",width:"100%",justifyContent:"space-between",alignItems:"center"}}>Cache clean<Tag color="warning" icon={<CircleAlert size={14} />}>2.8G</Tag></div></Button>            
            <Divider style={{marginTop:"4px",marginBottom:"4px"}} />
            <Space style={{marginBottom:"0px"}} separator={<Divider orientation="vertical" />}>
                <Button onClick={onClickHandler} type="text" block icon={<Crown size={14} />} styles={{root:btnRootStyle}}>Upgrade pro</Button>
                <Popconfirm onConfirm={confirmHandler} title={intl.formatMessage({id:"profile.logout.confirm.title"})} description={intl.formatMessage({id:"profile.logout.confirm.description"})}>
                    <Button type="text" block icon={<LogOut size={14} />} styles={{root:btnRootStyle}}>Logout</Button>
                </Popconfirm>                
            </Space>                      
        </div>
    )
}


const btnContentStyle:React.CSSProperties = {
    whiteSpace:"nowrap",
    textOverflow:"ellipsis",
    width:"100%",
    gap:"10px",
    overflow:"hidden",
}
/**
 * Brand logo Pop up demo
 * @returns 
 */
function BrandPopoverPanel(){
    const { close } = useBrandPopover()
    const {token} = useToken()
    const brandTeams:BrandTeam[] = [    
        {id:1,name:"AIM-120",logo:"https://api.dicebear.com/9.x/bottts-neutral/svg?seed=AIM-120"},
        {id:2,name:"AGM-86A",logo:"https://api.dicebear.com/9.x/bottts-neutral/svg?seed=AGM-86A"},
        {id:3,name:"Warden.vip",logo:<WardenLogo size={20} color={token.colorPrimary} />},
        {id:4,name:"M1928",logo:"https://api.dicebear.com/9.x/bottts-neutral/svg?seed=M1928"},
        {id:5,name:"Persuader",logo:"https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Persuader"},
    ]
    let items:React.ReactNode[]=[]    
    brandTeams.forEach((item,index)=>{
        items.push(<BrandItem team={item} key={index} selected={item.id == 3} />)
    })
    return(
        <div style={boxStyles}>
            <h4 style={{margin:"0px"}}>Teams</h4>
            <Divider style={{marginTop:"10px",marginBottom:"4px"}} />     
            {items}         
            <Divider style={{marginTop:"4px",marginBottom:"4px"}} />
            <Button onClick={()=>{close!()}} type="text" block icon={<Plus size={14} />} styles={{root:btnRootStyle}}>Create team</Button>                    
        </div>
    )
}

function BrandItem(props:{team:BrandTeam,selected?:boolean}){
    const {team,selected} = props
    const itemSytles:React.CSSProperties = {
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        width:"100%"
    }
    const btnStyles = {
        root:{
            ...btnRootStyle,
            height:"36px"
        },
        content:btnContentStyle
    }
    let icon:React.ReactNode = <></>
    if(typeof team.logo == "string"){
        icon = <LazyImage src={team.logo} style={{width:"20px" }}/>
    }else{
        icon = team.logo
    }
    return(
        <Button type="text" block icon={icon} styles={btnStyles}>
            <div style={itemSytles}>{team.name}{selected? <Check size={14} /> : <></>}</div>
        </Button>
    )
}


export {UserPopoverPanel,BrandPopoverPanel}