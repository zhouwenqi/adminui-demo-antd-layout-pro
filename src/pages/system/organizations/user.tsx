import { Container, LazyAvatar } from "@adminui-dev/antd-layout";
import {  Button, Flex,  Space, Table, Tag, Grid, theme, Input, Tooltip,App} from 'antd';
import  type { TableColumnsType, TableProps,TableColumnType } from 'antd';
import type { User } from "@/pages/typings";
import { Search,Download,Printer,Trash, Upload,UserPlus,SquarePen,Binoculars } from "lucide-react";
import { useRef, useState } from "react";
import { useIntl } from "react-intl";
import { printElement } from "@/utils/printUtil";
import { useUserDrawer } from "./components";


const {useToken} = theme
const { useBreakpoint } = Grid
type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

type DataIndex = keyof User


const userData:User[]=[
    {id:1,uid:"Aneka",realName:"Aneka",email:"aneka@gmail.com", deptId:4,deptName:"Development",roleId:2,roleName:"Admin",avatarUrl:"https://api.dicebear.com/9.x/miniavs/svg?seed=1", lastDate:'2022/12/8 23:24',createDate:'2022/12/8 23:24'},
    {id:2,uid:"Felix",realName:"Felix",email:"felix@gmail.com", deptId:8,deptName:"Testing",roleId:2,roleName:"Admin",avatarUrl:"https://api.dicebear.com/9.x/miniavs/svg?seed=2", lastDate:'2022/12/8 23:24',createDate:'2022/12/8 23:24'},
    {id:3,uid:"Neutral",realName:"Neutral",email:"reutral@gmail.com", deptId:8,deptName:"Testing",roleId:2,roleName:"Admin",avatarUrl:"https://api.dicebear.com/9.x/miniavs/svg?seed=3", lastDate:'2022/12/8 23:24',createDate:'2022/12/8 23:24'},
    {id:4,uid:"Adventurer",realName:"Adventurer",email:"Adventurer@gmail.com", deptId:4,deptName:"Development",roleId:2,roleName:"Admin",avatarUrl:"https://api.dicebear.com/9.x/miniavs/svg?seed=4", lastDate:'2022/12/8 23:24',createDate:'2022/12/8 23:24'},
    {id:5,uid:"Lorelei",realName:"Lorelei",email:"Lorelei@gmail.com", deptId:8,deptName:"Testing",roleId:2,roleName:"Admin",avatarUrl:"https://api.dicebear.com/9.x/miniavs/svg?seed=5", lastDate:'2022/12/8 23:24',createDate:'2022/12/8 23:24'},
    {id:6,uid:"Miniavs",realName:"Miniavs",email:"Miniavs@gmail.com", deptId:4,deptName:"Development",roleId:2,roleName:"Admin",avatarUrl:"https://api.dicebear.com/9.x/miniavs/svg?seed=6", lastDate:'2022/12/8 23:24',createDate:'2022/12/8 23:24'},
    {id:7,uid:"Scapegoat",realName:"Scapegoat",email:"zhouwenqi@me.com", deptId:3,deptName:"Marketing",roleId:3,roleName:"Query",avatarUrl:"https://api.dicebear.com/9.x/miniavs/svg?seed=8", lastDate:'2022/12/8 23:24',createDate:'2022/12/8 23:24'}
]

/**
 * User - page
 * @returns 
 */
export default function(){
    const intl = useIntl()
    const { token } = useToken()
    const { xs } = useBreakpoint()
    const { message } = App.useApp()
    const printRef = useRef<any>(null)    
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const {detailsDrawer,showDetails} = useUserDrawer()
 

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    }

    const rowSelection: TableRowSelection<User> = {
        selectedRowKeys,
        onChange: onSelectChange,
    }
    
    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<User> => ({
    filterDropdown: ({ selectedKeys, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          placeholder={`${intl.formatMessage({id:"global.search"})} ${dataIndex}`}
          value={selectedKeys[0]}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            icon={<Search size={12} />}
            style={{ width: 90 }}
          >
            {intl.formatMessage({id:"global.search"})}
          </Button>
          <Button
            style={{ width: 90 }}
          >
            {intl.formatMessage({id:"global.reset"})}
          </Button>
          <Button
            type="link"
          >
            {intl.formatMessage({id:"global.filter"})}
          </Button>
          <Button
            type="link"
            onClick={() => {
              close();
            }}
          >
            {intl.formatMessage({id:"global.close"})}
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
        <Search size={14} style={{ color: filtered ? token.colorPrimary : undefined }} />
        ),
    })

    const columns: TableColumnsType<User> = [  
        {
            title: intl.formatMessage({id:"user.column.avatar"}),
            dataIndex: 'avatarUrl',
            filterSearch: true,
            render:(value,record)=>{
                return(
                    <a onClick={()=>{showDetails(record)}}><LazyAvatar src={value} alt={record.uid} /></a>
                )
            },
        },       
        {
            title: intl.formatMessage({id:"user.column.uid"}),
            dataIndex: 'uid',
            filterSearch: true,
            sorter:true,
            render:(value,record)=>{
                return(
                    <a onClick={()=>{showDetails(record)}}>{value}</a>
                )
            },
            ...getColumnSearchProps('uid'),  
        },
        {
            title: intl.formatMessage({id:"user.column.realName"}),
            dataIndex: 'realName',
            ...getColumnSearchProps('realName'), 
        },
        {
            title: intl.formatMessage({id:"user.column.email"}),
            dataIndex: 'email',
            sorter:true, 
        },
        {
            title: intl.formatMessage({id:"user.column.roleName"}),
            dataIndex: 'roleName',
            width:"160px",
            render(value) {
                return(
                    <Tag>{value}</Tag>
                )
            },
            sorter:true,
        },
        {
            title: intl.formatMessage({id:"user.column.deptName"}),
            dataIndex: 'deptName',
            width:"160px",
            render(value) {
                return(
                    <Tag>{value}</Tag>
                )
            },
            sorter:true,
        }, 
        {
            title: intl.formatMessage({id:"user.column.lastDate"}),
            dataIndex: 'createDate',
            width:"160px",
            sorter:true,
        }, 
        {
            title: intl.formatMessage({id:"global.column.createDate"}),
            dataIndex: 'createDate',
            width:"160px",
            sorter:true,
        },
        {
            title: intl.formatMessage({id:"global.column.action"}),
            dataIndex: 'id',
            width:"160px",
            align:"right",
            render(value,record){
                console.log(value)
                let buttons=[<Tooltip key="details-btn" title={intl.formatMessage({id:"global.details"})}>
                            <Button type="text" onClick={()=>{showDetails(record)}} icon={<Binoculars size={14} />} />
                        </Tooltip>,<Tooltip key="edit-btn" title={intl.formatMessage({id:"global.edit"})}>
                            <Button type="text" icon={<SquarePen size={14} />} />
                        </Tooltip>]
                return(
                    <Flex justify="end" align="center">
                        {buttons}                      
                    </Flex>
                )
            }
        },
    ]

    const onExportXls=()=>{
        message.success(intl.formatMessage({id:"visit.export.success"},{"fileName":"20160117.xls"}))
    }

    return(
        <Container mode="panel">
            {detailsDrawer}
            <Flex justify="space-between" gap={token.padding} wrap={xs} style={{marginBlockEnd:token.margin}}>                
                <Space>
                    <Button type="primary" icon={<UserPlus size={14} />}>{intl.formatMessage({id:"user.button.plus"})}</Button>
                </Space>
                <Space>
                    <Space.Compact>
                        <Tooltip title={intl.formatMessage({id:"global.import"})}> 
                            <Button icon={<Upload size={14} />}></Button>
                        </Tooltip>  
                        <Tooltip title={intl.formatMessage({id:"global.export"})}>                            
                            <Button onClick={()=>{onExportXls()}} icon={<Download size={14} />}></Button>
                        </Tooltip>    
                        <Tooltip title={intl.formatMessage({id:"global.print"})}>                            
                            <Button onClick={()=>{printElement(printRef,{})}} icon={<Printer size={14} />}></Button>
                        </Tooltip>                   
                    </Space.Compact>  
                    <Space.Compact>
                        <Tooltip title={intl.formatMessage({id:"global.delete"})}>
                            <Button disabled={selectedRowKeys.length <= 0} icon={<Trash size={14} />} />
                        </Tooltip>
                    </Space.Compact>                 
                </Space>
            </Flex>
            <Table<User>
                ref={printRef}
                bordered={false}
                rowKey={"id"}
                rowSelection={rowSelection}
                columns={columns}
                dataSource={userData}
                scroll={{ x: 'max-content' }}
                />
        </Container>
    )
}