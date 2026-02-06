import { Container, LazyAvatar} from "@adminui-dev/antd-layout";
import {  Button, Flex,  Space, Table, Tag, Grid, theme, Input, Tooltip,App, Select,Typography } from 'antd';
import  type { TableColumnsType, TableColumnType } from 'antd';
import type { OperationLog } from "@/pages/typings";
import { Search,Download,Printer, Filter } from "lucide-react";
import { useRef} from "react";
import { useIntl } from "react-intl";
import { printElement } from "@/utils/printUtil";

const {Text} = Typography
const {useToken} = theme
const { useBreakpoint } = Grid

type DataIndex = keyof OperationLog

const operationLogMap:Record<string,OperationLog[]> = {
    "zh-CN":[
        {id:1,name:'Aneka',avatar:'https://api.dicebear.com/9.x/miniavs/svg?seed=1',ip:"202.98.144.93",createDate:'2022/12/8 23:24',action:'VERIFY',content:(<><Text strong>Aneka </Text><Text type="success">审核</Text><Text> 了一张订单： </Text><Text type="secondary">PSN204823422</Text></>)},
        {id:2,name:'Felix',avatar:'https://api.dicebear.com/9.x/miniavs/svg?seed=2',ip:"202.98.144.93",createDate:'2022/12/8 23:24',action:'DELETE',content:<><Text strong>Felix </Text><Text type="danger">删除</Text><Text> 了订单： </Text><Text type="secondary" delete>PSN49837246</Text></>},
        {id:3,name:'Neutral',avatar:'https://api.dicebear.com/9.x/miniavs/svg?seed=3',ip:"202.98.144.93",createDate:'2022/12/8 23:24',action:'UPDATE',content:<><Text strong>Neutral </Text><Text type="warning">修改</Text><Text> 了用户(173****234)的 </Text><Text type="secondary">登录密码</Text></>},    
        {id:4,name:'Adventurer',avatar:'https://api.dicebear.com/9.x/miniavs/svg?seed=4',ip:"202.98.144.93",createDate:'2022/12/8 23:24',action:'LOGIN',content:<><Text strong>Adventurer </Text><Text> 使用手机端APP </Text><Text type="success">登录</Text><Text type="secondary"> 沃登后台管理系统</Text></>},  
        {id:5,name:'Lorelei',avatar:'https://api.dicebear.com/9.x/miniavs/svg?seed=5',ip:"202.98.144.93",createDate:'2022/12/8 23:24',action:'PUBLISH',content:<><Text strong>Lorelei </Text><Text type="success">发布</Text><Text> 商品信息 </Text><Text type="secondary"> 沃登多功能无人机</Text></>},  
        {id:6,name:'Miniavs',avatar:'https://api.dicebear.com/9.x/miniavs/svg?seed=6',ip:"202.98.144.93",createDate:'2022/12/8 23:24',action:'JOIN',content:<><Text strong>Oracle </Text><Text type="success">加入</Text><Text> 项目 </Text><Text type="secondary"> 产品飞车</Text></>}, 
        {id:7,name:'Apple',avatar:'https://api.dicebear.com/9.x/miniavs/svg?seed=9',ip:"202.98.144.93",createDate:'2022/12/8 23:24',action:'VERIFY',content:(<><Text strong>Apple </Text><Text type="success">审核</Text><Text> 了一张订单： </Text><Text type="secondary">PSN24266234</Text></>)},
    ],
    "en-US":[
        {id:1,name:'Aneka',avatar:'https://api.dicebear.com/9.x/miniavs/svg?seed=1',ip:"202.98.144.93",createDate:'2022/12/8 23:24',action:'VERIFY',content:(<><Text strong>Aneka </Text><Text type="success">Verify</Text><Text> an order： </Text><Text type="secondary">PSN204823422</Text></>)},
        {id:2,name:'Felix',avatar:'https://api.dicebear.com/9.x/miniavs/svg?seed=2',ip:"202.98.144.93",createDate:'2022/12/8 23:24',action:'DELETE',content:<><Text strong>Felix </Text><Text type="danger">Delete</Text><Text> an order： </Text><Text type="secondary" delete>PSN49837246</Text></>},
        {id:3,name:'Neutral',avatar:'https://api.dicebear.com/9.x/miniavs/svg?seed=3',ip:"202.98.144.93",createDate:'2022/12/8 23:24',action:'UPDATE',content:<><Text strong>Neutral </Text><Text type="warning">Modify</Text><Text> user(173****234) is </Text><Text type="secondary">login password</Text></>},    
        {id:4,name:'Adventurer',avatar:'https://api.dicebear.com/9.x/miniavs/svg?seed=4',ip:"202.98.144.93",createDate:'2022/12/8 23:24',action:'LOGIN',content:<><Text strong>Adventurer </Text><Text> use mobile-app </Text><Text type="success">Login</Text><Text type="secondary"> warden system</Text></>},  
        {id:5,name:'Lorelei',avatar:'https://api.dicebear.com/9.x/miniavs/svg?seed=5',ip:"202.98.144.93",createDate:'2022/12/8 23:24',action:'PUBLISH',content:<><Text strong>Lorelei </Text><Text type="success">Publish</Text><Text> product info </Text><Text type="secondary"> warden intelligent UAVs</Text></>},  
        {id:6,name:'Miniavs',avatar:'https://api.dicebear.com/9.x/miniavs/svg?seed=6',ip:"202.98.144.93",createDate:'2022/12/8 23:24',action:'JOIN',content:<><Text strong>Miniavs </Text><Text type="success">Join</Text><Text> project </Text><Text type="secondary"> PM fly up</Text></>}, 
        {id:7,name:'Apple',avatar:'https://api.dicebear.com/9.x/miniavs/svg?seed=9',ip:"202.98.144.93",createDate:'2022/12/8 23:24',action:'VERIFY',content:(<><Text strong>Apple </Text><Text type="success">Verify</Text><Text> an order： </Text><Text type="secondary">PSN24266234</Text></>)},
    ]
}

const filterActionOptions = [
    {text:"VERIFY",value:"VERIFY"},
    {text:"CREATE",value:"CREATE"},
    {text:"UPDATE",value:"UPDATE"},
    {text:"LOGIN",value:"LOGIN"},
    {text:"PUBLISH",value:"PUBLISH"},
    {text:"JOIN",value:"JOIN"},
    {text:"DELETE",value:"DELETE"},
    {text:"DOWNLOAD",value:"DOWNLOAD"},
]

/**
 * Operation log - page
 * @returns 
 */
export default function(){
    const intl = useIntl()
    const { token } = useToken()
    const { xs } = useBreakpoint()
    const { message } = App.useApp()
    const printRef = useRef<any>(null)    
    
    const data = operationLogMap[intl.locale]
    
    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<OperationLog> => ({
    filterDropdown: ({selectedKeys}) => (
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

    const columns: TableColumnsType<OperationLog> = [
        {
            title: 'ID',
            dataIndex: 'avatar',
            width:"60px",
            render(value, record) {
                return(
                    <LazyAvatar key={record.id} size={"small"} src={value} />
                )
            },
        },  
        {
            title: intl.formatMessage({id:"global.column.uid"}),
            dataIndex: 'name',
            filterSearch: true,
            sorter:true,
            ...getColumnSearchProps('name'),  
        },
        {
            title: intl.formatMessage({id:"global.column.ip"}),
            dataIndex: 'ip',
            width:"160px",
            sorter:true,
        },
        {
            title: intl.formatMessage({id:"global.column.content"}),
            dataIndex: 'content',
            sorter:true,
            ...getColumnSearchProps('content'),  
        },
        {
            title: intl.formatMessage({id:"global.column.action"}),
            dataIndex: 'action',
            width:"140px",
            filters:filterActionOptions,
            render(value) {
                return(
                    <Tag>{value}</Tag>
                )
            },
            sorter:true,
        },
        {
            title: intl.formatMessage({id:"global.column.createDate"}),
            dataIndex: 'createDate',
            width:"160px",
            sorter:true,
        },
    ]

    const onExportXls=()=>{
        message.success(intl.formatMessage({id:"visit.export.success"},{"fileName":"20160117.xls"}))
    }

    return(
        <Container mode="panel">
            <Flex justify="space-between" gap={token.padding} wrap={xs} style={{marginBlockEnd:token.margin}}>                
                <Space>
                    <Select style={{minWidth:"100px"}} mode="multiple" maxCount={4} maxTagCount={4} suffixIcon={<Filter size={12} />} placeholder={intl.formatMessage({id:"global.column.action"})} options={filterActionOptions.map(item=>({label:item.text,value:item.text}))} />
                </Space>
                <Space>
                    <Space.Compact>
                        <Tooltip title={intl.formatMessage({id:"global.export"})}>                            
                            <Button onClick={()=>{onExportXls()}} icon={<Download size={14} />}></Button>
                        </Tooltip>    
                        <Tooltip title={intl.formatMessage({id:"global.print"})}>                            
                            <Button onClick={()=>{printElement(printRef,{})}} icon={<Printer size={14} />}></Button>
                        </Tooltip>                   
                    </Space.Compact>                   
                </Space>
            </Flex>
            <Table<OperationLog>
                ref={printRef}
                bordered={false}
                rowKey={"id"}
                columns={columns}
                dataSource={data}
                scroll={{ x: 'max-content' }}
                />
        </Container>
    )
}