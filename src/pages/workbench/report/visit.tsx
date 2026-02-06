import { Container} from "@adminui-dev/antd-layout";
import {  Button, Flex,  Space, Table, Tag, Grid, theme, Input, Tooltip,App } from 'antd';
import type { TableColumnsType, TableColumnType } from 'antd';
import type { Visit } from "@/pages/typings";
import { Search,Download,Printer,ChartPie } from "lucide-react";
import { useRef } from "react";
import { useIntl } from "react-intl";
import { printElement } from "@/utils/printUtil";
import useVisitChart from "./components";

const {useToken} = theme
const { useBreakpoint } = Grid

type DataIndex = keyof Visit

const data:Visit[] = [
    {
        id:1,
        uuid:"028e3-1a4n2-20a7e",
        uid:"Apple",
        ip:"202.97.18.214",
        content:"https://www.microwarp.com/doc/32.html",
        os:"ANDROID",
        device:"MOBILE",
        createDate:"2026/01/23 23:41"
    },
    {
        id:2,
        uuid:"028e3-1a4n2-20a7e",
        uid:"Aneka",
        ip:"202.97.18.214",
        content:"https://www.microwarp.com/doc/32.html",
        os:"IOS",
        device:"MOBILE",
        createDate:"2026/01/23 23:41"
    },
    {
        id:3,
        uuid:"028e3-1a4n2-20a7e",
        uid:"Felix",
        ip:"202.97.18.214",
        content:"https://www.microwarp.com/login.html",
        os:"WINDOWS",
        device:"PC",
        createDate:"2026/01/23 23:41"
    },
    {
        id:4,
        uuid:"028e3-1a4n2-20a7e",
        uid:"Adventurer",
        ip:"202.97.18.214",
        content:"https://www.microwarp.com/prodjct/45.html",
        os:"OSX",
        device:"MAC",
        createDate:"2026/01/23 23:41"
    },
    {
        id:5,
        uuid:"028e3-1a4n2-20a7e",
        uid:"Miniavs",
        ip:"202.97.18.214",
        content:"/register",
        os:"IOS",
        device:"MOBILE",
        createDate:"2026/01/23 23:41"
    }
]

/**
 * Visit report - page
 * @returns 
 */
export default function(){
    const intl = useIntl()
    const { token } = useToken()
    const { xs } = useBreakpoint()
    const { message } = App.useApp()
    const printRef = useRef<any>(null)
    const {showDetails,detailsDrawer} = useVisitChart()
    
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
    
    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<Visit> => ({
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

    const columns: TableColumnsType<Visit> = [
        {
            title: 'ID',
            dataIndex: 'id',
            width:"30px",                
        },  
        {
            title: intl.formatMessage({id:"global.column.uid"}),
            dataIndex: 'uid',
            filterSearch: true,
            sorter:true,
        },
        {
            title: intl.formatMessage({id:"global.column.ip"}),
            dataIndex: 'ip',
            width:"160px",
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
            title: intl.formatMessage({id:"global.column.content"}),
            dataIndex: 'content',  
            ...getColumnSearchProps('content'),              
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
            {detailsDrawer}
            <Flex justify="space-between" gap={token.padding} wrap={xs} style={{marginBlockEnd:token.margin}}>                
                <div></div>
                <Space>
                    <Space.Compact>
                        <Tooltip title={intl.formatMessage({id:"global.export"})}>                            
                            <Button onClick={()=>{onExportXls()}} icon={<Download size={14} />}></Button>
                        </Tooltip>    
                        <Tooltip title={intl.formatMessage({id:"global.print"})}>                            
                            <Button onClick={()=>{printElement(printRef,{})}} icon={<Printer size={14} />}></Button>
                        </Tooltip>   
                        <Tooltip title={intl.formatMessage({id:"global.chart"})}>                            
                            <Button onClick={()=>{showDetails()}} icon={<ChartPie size={14} />}></Button>
                        </Tooltip>                   
                    </Space.Compact>                   
                </Space>
            </Flex>
            <Table<Visit>
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