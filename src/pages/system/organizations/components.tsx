import type { Dept,User } from "@/pages/typings";
import type { DrawerProps,DescriptionsProps } from "antd";
import {Drawer,Button,Space,Descriptions, Tag} from "antd"
import { useIntl } from "react-intl";
import {SquarePen,Users} from "lucide-react"
import { useState } from "react";
import { LazyAvatar } from "@adminui-dev/antd-layout";

/**
 * Drawer - dept details
 * @param props 
 * @returns 
 */
function DeptDetailsDrawer(props:DrawerProps&{dept?:Dept}){
    const intl = useIntl()
    const {dept} = props
    if(!dept){
        return<></>
    }
    const items: DescriptionsProps['items'] = [
        {
            key: '1',            
            label: intl.formatMessage({id:"dept.column.name"}),
            children: dept.name,
            span:"filled",
        },
        {
            key: '2',
            label: intl.formatMessage({id:"global.column.code"}),
            children: dept.code,
            span:"filled",
        },
        {
            key: '3',
            label: intl.formatMessage({id:"dept.column.members"}),
            children:<Tag styles={{"root":{alignItems:"center",gap:"6px",display:"inline-flex"}}} icon={<Users size={12} />}>{dept.members}</Tag>,
            span:"filled",
        }, 
        {
            key: '4',
            label: intl.formatMessage({id:"dept.column.parent"}),
            children: dept.parentName,
            span:"filled",
        },
        {
            key: '9',
            label: intl.formatMessage({id:"global.column.description"}),
            children:dept.desciption,
            span:"filled",
        },        
        
        {
            key: '10',
            label: intl.formatMessage({id:"global.column.createDate"}),
            children: dept.createDate,
            span:"filled",
        },
    ]
    return(
        <>
        <Drawer {...props} title={intl.formatMessage({id:"dept.drawer.details.title"})} extra={<Space><Button key="edit-btn" icon={<SquarePen size={14} />}>{intl.formatMessage({id:"global.edit"})}</Button></Space>}>
            <Descriptions bordered items={items} />
        </Drawer>
        </>
    )
}

function useDeptDrawer(){
    const [openDetails,setOpenDetails] = useState<boolean>(false)
    const [detailsRecord,setDetailsRecord] = useState<Dept>()
    const showDetails=(dept?:Dept)=>{
        setDetailsRecord(dept)
        setOpenDetails(true)
    }
    const detailsDrawer = <DeptDetailsDrawer dept={detailsRecord} open={openDetails} onClose={()=>{setOpenDetails(false)}} size={500} />
    return {detailsDrawer,showDetails}
}

/**
 * Drawer - user details
 * @param props 
 * @returns 
 */
function UserDetailsDrawer(props:DrawerProps&{user?:User}){
    const intl = useIntl()
    const {user} = props
    if(!user){
        return<></>
    }
    const items: DescriptionsProps['items'] = [
        {
            key: '0',            
            label: intl.formatMessage({id:"user.column.avatar"}),
            children: <LazyAvatar src={user.avatarUrl} size={64} />,
            span:"filled",
        },
        {
            key: '1',            
            label: intl.formatMessage({id:"user.column.uid"}),
            children: user.uid,
            span:"filled",
        },
        {
            key: '2',
            label: intl.formatMessage({id:"user.column.realName"}),
            children: user.realName,
            span:"filled",
        },
        {
            key: '3',
            label: intl.formatMessage({id:"user.column.email"}),
            children:user.email,
            span:"filled",
        }, 
        {
            key: '4',
            label: intl.formatMessage({id:"user.column.deptName"}),
            children: user.deptName,
            span:"filled",
        },
        {
            key: '9',
            label: intl.formatMessage({id:"user.column.roleName"}),
            children:user.roleName,
            span:"filled",
        },        
        {
            key: '10',
            label: intl.formatMessage({id:"user.column.lastDate"}),
            children: user.createDate,
            span:"filled",
        },
        {
            key: '11',
            label: intl.formatMessage({id:"global.column.createDate"}),
            children: user.createDate,
            span:"filled",
        },
    ]
    return(
        <>
        <Drawer {...props} title={intl.formatMessage({id:"user.drawer.details.title"})} extra={<Space><Button key="edit-btn" icon={<SquarePen size={14} />}>{intl.formatMessage({id:"global.edit"})}</Button></Space>}>
            <Descriptions bordered items={items} />
        </Drawer>
        </>
    )
}

function useUserDrawer(){
    const [openDetails,setOpenDetails] = useState<boolean>(false)
    const [detailsRecord,setDetailsRecord] = useState<User>()
    const showDetails=(user?:User)=>{
        setDetailsRecord(user)
        setOpenDetails(true)
    }
    const detailsDrawer = <UserDetailsDrawer user={detailsRecord} open={openDetails} onClose={()=>{setOpenDetails(false)}} size={500} />
    return {detailsDrawer,showDetails}
}

/**
 * Drawer - profile details
 * @param props 
 * @returns 
 */
function ProfileDetailsDrawer(props:DrawerProps&{user?:User}){
    const intl = useIntl()
    const {user} = props
    if(!user){
        return<></>
    }
    const items: DescriptionsProps['items'] = [
        {
            key: '0',            
            label: intl.formatMessage({id:"user.column.avatar"}),
            children: <LazyAvatar src={user.avatarUrl} size={64} />,
            span:"filled",
        },
        {
            key: '1',            
            label: intl.formatMessage({id:"user.column.uid"}),
            children: user.uid,
            span:"filled",
        },
        {
            key: '2',
            label: intl.formatMessage({id:"user.column.realName"}),
            children: user.realName,
            span:"filled",
        },
        {
            key: '3',
            label: intl.formatMessage({id:"user.column.email"}),
            children:user.email,
            span:"filled",
        }, 
        {
            key: '4',
            label: intl.formatMessage({id:"user.column.deptName"}),
            children: user.deptName,
            span:"filled",
        },
        {
            key: '9',
            label: intl.formatMessage({id:"user.column.roleName"}),
            children:user.roleName,
            span:"filled",
        },        
        {
            key: '10',
            label: intl.formatMessage({id:"user.column.lastDate"}),
            children: user.createDate,
            span:"filled",
        },
        {
            key: '11',
            label: intl.formatMessage({id:"global.column.createDate"}),
            children: user.createDate,
            span:"filled",
        },
    ]
    return(
        <>
        <Drawer {...props} title={intl.formatMessage({id:"profile.drawer.details.title"})} extra={<Space><Button key="edit-btn" icon={<SquarePen size={14} />}>{intl.formatMessage({id:"global.edit"})}</Button></Space>}>
            <Descriptions bordered items={items} />
        </Drawer>
        </>
    )
}

function useProfileDrawer(){
    const [openDetails,setOpenDetails] = useState<boolean>(false)
    const [detailsRecord,setDetailsRecord] = useState<User>()
    const showDetails=(user?:User)=>{
        setDetailsRecord(user)
        setOpenDetails(true)
    }
    const detailsDrawer = <ProfileDetailsDrawer user={detailsRecord} open={openDetails} onClose={()=>{setOpenDetails(false)}} size={500} />
    return {detailsDrawer,showDetails}
}

export { useDeptDrawer,useUserDrawer,useProfileDrawer }