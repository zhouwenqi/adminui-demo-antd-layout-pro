import type { Role,Permission, Firewall } from "@/pages/typings";
import type { DrawerProps,DescriptionsProps, ModalProps } from "antd";
import {Drawer,Button,Space,Descriptions, Tag, Modal, Tree} from "antd"
import { useIntl } from "react-intl";
import {SquarePen} from "lucide-react"
import { useEffect, useState } from "react";
import { getYesOrNo, transformTreeData } from "@/utils/stringUtil";

/**
 * Drawer - role details
 * @param props 
 * @returns 
 */
function RoleDetailsDrawer(props:DrawerProps&{role?:Role}){
    const intl = useIntl()
    const {role} = props
    if(!role){
        return<></>
    }
    const yesOrNo = getYesOrNo(intl)
    const items: DescriptionsProps['items'] = [
        {
            key: '1',            
            label: intl.formatMessage({id:"role.column.name"}),
            children: role.name,
            span:"filled",
        },
        {
            key: '2',
            label: intl.formatMessage({id:"role.column.value"}),
            children: role.value,
            span:"filled",
        },
        {
            key: '3',
            label: intl.formatMessage({id:"global.column.disabled"}),
            children:<Tag color={role.disabled ? "red" : "green" }>{yesOrNo.find(item=>item.value == role.disabled)?.label}</Tag>,
            span:"filled",
        }, 
        {
            key: '9',
            label: intl.formatMessage({id:"global.column.description"}),
            children:role.description,
            span:"filled",
        },        
        
        {
            key: '10',
            label: intl.formatMessage({id:"global.column.createDate"}),
            children: role.createDate,
            span:"filled",
        },
    ]
    return(
        <>
        <Drawer {...props} title={intl.formatMessage({id:"role.drawer.details.title"})} extra={<Space><Button key="edit-btn" icon={<SquarePen size={14} />}>{intl.formatMessage({id:"global.edit"})}</Button></Space>}>
            <Descriptions bordered items={items} />
        </Drawer>
        </>
    )
}

/**
 * Drawer - permission details
 * @param props 
 * @returns 
 */
function PermissionDetailsDrawer(props:DrawerProps&{permission?:Permission}){
    const intl = useIntl()
    const {permission} = props
    if(!permission){
        return<></>
    }
    const yesOrNo = getYesOrNo(intl)
    const items: DescriptionsProps['items'] = [
        {
            key: '1',            
            label: intl.formatMessage({id:"permission.column.name"}),
            children: permission.name,
            span:"filled",
        },
        {
            key: '2',
            label: intl.formatMessage({id:"permission.column.value"}),
            children: permission.value,
            span:"filled",
        },
        {
            key: '3',
            label: intl.formatMessage({id:"global.column.disabled"}),
            children:<Tag color={permission.disabled ? "red" : "green"}>{yesOrNo.find(item=>item.value == permission.disabled)?.label}</Tag>,
            span:"filled",
        }, 
        {
            key: '4',
            label: intl.formatMessage({id:"global.column.description"}),
            children:permission.description,
            span:"filled",
        },        
        
        {
            key: '5',
            label: intl.formatMessage({id:"global.column.createDate"}),
            children: permission.createDate,
            span:"filled",
        },
    ]
    return(
        <>
        <Drawer {...props} title={intl.formatMessage({id:"permission.drawer.details.title"})} extra={<Space><Button key="edit-btn" icon={<SquarePen size={14} />}>{intl.formatMessage({id:"global.edit"})}</Button></Space>}>
            <Descriptions bordered items={items} />
        </Drawer>
        </>
    )
}

/**
 * Drawer - firewall details
 * @param props 
 * @returns 
 */
function FirewallDetailsDrawer(props:DrawerProps&{firewall?:Firewall}){
    const intl = useIntl()
    const {firewall} = props
    if(!firewall){
        return<></>
    }
    const yesOrNo = getYesOrNo(intl)
    const items: DescriptionsProps['items'] = [
        {
            key: '1',            
            label: intl.formatMessage({id:"permission.column.name"}),
            children: firewall.ip,
            span:"filled",
        },
        
        {
            key: '3',
            label: intl.formatMessage({id:"global.column.disabled"}),
            children:<Tag color={firewall.disabled ? "red" : "green"}>{yesOrNo.find(item=>item.value == firewall.disabled)?.label}</Tag>,
            span:"filled",
        }, 
        {
            key: '4',
            label: intl.formatMessage({id:"global.column.description"}),
            children:firewall.description,
            span:"filled",
        },        
        
        {
            key: '5',
            label: intl.formatMessage({id:"global.column.createDate"}),
            children: firewall.createDate,
            span:"filled",
        },
    ]
    return(
        <>
        <Drawer {...props} title={intl.formatMessage({id:"firewall.drawer.details.title"})} extra={<Space><Button key="edit-btn" icon={<SquarePen size={14} />}>{intl.formatMessage({id:"global.edit"})}</Button></Space>}>
            <Descriptions bordered items={items} />
        </Drawer>
        </>
    )
}

export const permissionData:Permission[]=[
    {id:1,name:"Create order",value:"create:order",description:"Users can only be created",createDate:"2016/02/12 23:18:49"},
    {id:2,name:"Manager notice",value:"notice:admin",description:"Management Announcement",createDate:"2016/02/12 23:18:49"},
    {id:3,name:"Payment order",value:"payment:order",description:"Payment order",createDate:"2016/02/12 23:18:49"},
    {id:4,name:"Add user",parentId:10,parentName:"Manager user",value:"add:user",disabled:true,description:"Add user",createDate:"2016/02/12 23:18:49"},
    {id:5,name:"Modify user",parentId:10,parentName:"Manager user",value:"modify:user",description:"Modify user",createDate:"2016/02/12 23:18:49"},
    {id:6,name:"Export user",parentId:10,parentName:"Manager user",value:"export:user",description:"Export user",createDate:"2016/02/12 23:18:49"},
    {id:7,name:"Delete user",parentId:10,parentName:"Manager user",value:"delete:user",disabled:true,description:"Delete user",createDate:"2016/02/12 23:18:49"},
    {id:8,name:"Query report",value:"query:report",description:"Query report",createDate:"2016/02/12 23:18:49"},
    {id:9,name:"Delete notice",parentId:2,parentName:"Manager notice",value:"query:report",disabled:true,description:"Query report",createDate:"2016/02/12 23:18:49"},
    {id:10,name:"Manager user",value:"admin:user",description:"Query report",createDate:"2016/02/12 23:18:49"},
]

function AssignPermissionModal(props:ModalProps&{role?:Role}){
    const [selectedKeys,setSelectedKeys] = useState<React.Key[] | undefined>([])
    const intl = useIntl()   
    const {role}  = props
    useEffect(()=>{
        setSelectedKeys(role?.permissionIds)
    },[role])
    const treeData = transformTreeData(permissionData)
    
    return(
        <Modal {...props} title={intl.formatMessage({id:"role.modal.assign.title"})}>
            <Tree treeData={treeData} checkable defaultExpandAll checkedKeys={selectedKeys} />
        </Modal>
    )
}

function useRoleDrawer(){
    const [openDetails,setOpenDetails] = useState<boolean>(false)
    const [detailsRecord,setDetailsRecord] = useState<Role>()
    const showDetails=(role?:Role)=>{
        setDetailsRecord(role)
        setOpenDetails(true)
    }
    const detailsDrawer = <RoleDetailsDrawer role={detailsRecord} open={openDetails} onClose={()=>{setOpenDetails(false)}} size={500} />
    return {detailsDrawer,showDetails}
}

function usePermissionDrawer(){
    const [openDetails,setOpenDetails] = useState<boolean>(false)
    const [detailsRecord,setDetailsRecord] = useState<Permission>()
    const showDetails=(permission?:Permission)=>{
        setDetailsRecord(permission)
        setOpenDetails(true)
    }
    const detailsDrawer = <PermissionDetailsDrawer permission={detailsRecord} open={openDetails} onClose={()=>{setOpenDetails(false)}} size={500} />
    return {detailsDrawer,showDetails}
}

function useFirewallDrawer(){
    const [openDetails,setOpenDetails] = useState<boolean>(false)
    const [detailsRecord,setDetailsRecord] = useState<Firewall>()
    const showDetails=(firewall?:Firewall)=>{
        setDetailsRecord(firewall)
        setOpenDetails(true)
    }
    const detailsDrawer = <FirewallDetailsDrawer firewall={detailsRecord} open={openDetails} onClose={()=>{setOpenDetails(false)}} size={500} />
    return {detailsDrawer,showDetails}
}

function useAssignPermissionModal(){
    const [openDetails,setOpenDetails] = useState<boolean>(false)
    const [detailsRecord,setDetailsRecord] = useState<Role>()
    const showAssignModal=(role?:Role)=>{
        setDetailsRecord(role)
        setOpenDetails(true)
    }
    const assignModal = <AssignPermissionModal role={detailsRecord} open={openDetails} onCancel={()=>{setOpenDetails(false)}} />
    return {assignModal,showAssignModal}
}

export { useRoleDrawer, usePermissionDrawer, useFirewallDrawer, useAssignPermissionModal }