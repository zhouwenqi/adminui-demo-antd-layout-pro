import { Container, LazyAvatar} from "@adminui-dev/antd-layout";
import {  Button, Flex,  Space, Table, Tag, Grid, theme, Input, Tooltip,App, Segmented } from 'antd';
import type { TableColumnsType,TableColumnType } from 'antd';
import type { LoginLog } from "@/pages/typings";
import { Search,Download,Printer } from "lucide-react";
import { useRef } from "react";
import { useIntl } from "react-intl";
import { printElement } from "@/utils/printUtil";

const {useToken} = theme
const { useBreakpoint } = Grid

type DataIndex = keyof LoginLog

const data:LoginLog[] = [
    {
        id:1,
        uid:"Apple",
        avatar:"https://api.dicebear.com/9.x/miniavs/svg?seed=1",
        ip:"202.97.18.214",
        location:"ShangHai",
        status:"FAILED",
        os:"ANDROID",
        device:"MOBILE",
        createDate:"2026/01/23 23:41"
    },
    {
        id:2,
        uid:"Aneka",
        avatar:"https://api.dicebear.com/9.x/miniavs/svg?seed=2",
        ip:"132.57.182.33",
        location:"Seoul",
        status:"SUCCESS",
        os:"IOS",
        device:"MOBILE",
        createDate:"2026/01/23 23:41"
    },
    {
        id:3,
        uid:"Felix",
        avatar:"https://api.dicebear.com/9.x/miniavs/svg?seed=3",
        ip:"117.42.128.209",
        location:"Dubai",
        status:"SUCCESS",
        os:"WINDOWS",
        device:"PC",
        createDate:"2026/01/23 23:41"
    },
    {
        id:4,        
        uid:"Adventurer",
        avatar:"https://api.dicebear.com/9.x/miniavs/svg?seed=4",
        ip:"212.37.218.143",
        location:"HongKong",
        status:"SUCCESS",
        os:"OSX",
        device:"MAC",
        createDate:"2026/01/23 23:41"
    },
    {
        id:5,
        uid:"Miniavs",
        avatar:"https://api.dicebear.com/9.x/miniavs/svg?seed=5",
        ip:"211.98.108.94",
        location:"Tokoy",
        status:"FAILED",
        os:"IOS",
        device:"MOBILE",
        createDate:"2026/01/23 23:41"
    }
]

const filterOsOptions = [
    {text:"WINDOWS",value:"WINDOWS"},
    {text:"OSX",value:"OSX"},
    {text:"IOS",value:"IOS"},
    {text:"ANDROID",value:"ANDROID"},
    {text:"LINUX",value:"LINUX"},
    {text:"OTHER",value:"OTHER"}
]
const filterDeviceOptions = [
    {text:"PC",value:"PC"},
    {text:"MAC",value:"MAC"},
    {text:"TABLET",value:"TABLET"},
    {text:"MOBILE",value:"MOBILE"},
    {text:"WATCH",value:"WATCH"},
    {text:"OTHER",value:"OTHER"},
]

/**
 * Login log - page
 * @returns 
 */
export default function(){
    const intl = useIntl()
    const { token } = useToken()
    const { xs } = useBreakpoint()
    const { message } = App.useApp()
    const printRef = useRef<any>(null)    
    

    const statusOptions = [
        {text:intl.formatMessage({id:"global.success"}),value:"SUCCESS"},
        {text:intl.formatMessage({id:"global.failed"}),value:"FAILED"},
    ]
    
    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<LoginLog> => ({
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

    const columns: TableColumnsType<LoginLog> = [
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
            dataIndex: 'uid',
            filterSearch: true,
            sorter:true,
            ...getColumnSearchProps('uid'),  
        },
        {
            title: intl.formatMessage({id:"global.column.ip"}),
            dataIndex: 'ip',
            width:"160px",
            sorter:true,
        },
        {
            title: intl.formatMessage({id:"loginlog.column.location"}),
            dataIndex: 'location',
            sorter:true,
            ...getColumnSearchProps('location'),  
        },
        {
            title: intl.formatMessage({id:"global.column.status"}),
            dataIndex: 'status',
            width:"140px",
            filters:statusOptions,
            render(value) {
                return(
                    <Tag color={value=="SUCCESS" ? "success" : "error"}>{statusOptions.find(item=>item.value==value)?.text}</Tag>
                )
            },
            sorter:true,
        },
       
        {
            title: intl.formatMessage({id:"global.column.device"}),
            dataIndex: 'device',
            width:"140px",
            filters:filterDeviceOptions,
            render(value) {
                return(
                    <Tag>{value}</Tag>
                )
            },
            sorter:true,
        },
        {
            title: intl.formatMessage({id:"global.column.os"}),
            dataIndex: 'os',
            width:"140px",
            filters:filterOsOptions,
            render(value) {
                return(
                    <Tag>{value}</Tag>
                )
            },
            sorter:true,
        }, 
        {
            title: intl.formatMessage({id:"loginlog.column.loginDate"}),
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
                    <Space><Segmented options={statusOptions.map(item=>({value:item.value,label:item.text}))} /></Space>
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
            <Table<LoginLog>
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