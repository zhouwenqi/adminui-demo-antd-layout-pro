import { Container} from "@adminui-dev/antd-layout";
import {  Button, Flex,  Space, Table, Tag, Grid, theme, Input, Tooltip,App} from 'antd';
import  type { TableColumnsType, TableProps,TableColumnType } from 'antd';
import type { Firewall } from "@/pages/typings";
import { Search,Download,Printer,Trash, Upload,Plus,SquarePen,Binoculars } from "lucide-react";
import { useRef, useState } from "react";
import { useIntl } from "react-intl";
import { printElement } from "@/utils/printUtil";
import { getYesOrNo } from "@/utils/stringUtil";
import { useFirewallDrawer } from "./components";


const {useToken} = theme
const { useBreakpoint } = Grid
type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

type DataIndex = keyof Firewall

const firewallData:Firewall[]=[
    {id:1,ip:["202.98.204.71"],disabled:false,description:"office",createDate:"2016/02/12 23:18:49"},
    {id:2,ip:["211.97.139.251"],disabled:false,description:"home",createDate:"2016/02/12 23:18:49"},
    {id:3,ip:["211.97.139.251","211.97.140.255"],disabled:false,description:"company",createDate:"2016/02/12 23:18:49"},
    {id:4,ip:["39.197.206.79","39.180.205.117"],disabled:true,description:"comRisk control address",createDate:"2016/02/12 23:18:49"},
]

/**
 * Role - page
 * @returns 
 */
export default function(){
    const intl = useIntl()
    const { token } = useToken()
    const { xs } = useBreakpoint()
    const { message } = App.useApp()
    const printRef = useRef<any>(null)    
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const {detailsDrawer,showDetails} = useFirewallDrawer()
 
    const yesOrNo = getYesOrNo(intl)
    const filterYesOrNo = yesOrNo.map(item=>({text:item.label,value:item.value}))

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    }

    const rowSelection: TableRowSelection<Firewall> = {
        selectedRowKeys,
        onChange: onSelectChange,
    }
    
    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<Firewall> => ({
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

    const columns: TableColumnsType<Firewall> = [ 
        {
            title: "ID",
            dataIndex: 'id',
            width:"80px"
        },
        {
            title: intl.formatMessage({id:"firewall.column.ip"}),
            dataIndex: 'ip',
            filterSearch: true,
            sorter:true,
            render:(value,record)=>{
                let sip = value[0] || ""
                if(value.length>1){
                    sip += " - " + value[value.length-1]
                }
                return(
                    <a onClick={()=>{showDetails(record)}}>{sip}</a>
                )
            },
            ...getColumnSearchProps('ip'),  
        },
        {
            title: intl.formatMessage({id:"global.column.description"}),
            dataIndex: 'description',
            filterSearch: true,
            sorter:true,
            render:(value)=>{
                return(
                    <Tag>{value}</Tag>
                )
            },
            ...getColumnSearchProps('description'),  
        },
        {
            title: intl.formatMessage({id:"global.column.disabled"}),
            dataIndex: 'disabled',
            width:"160px",
            sorter:true,
            filters:filterYesOrNo,
            render(value) {
                return(
                    <Tag color={value ? "red" : "green" }>{yesOrNo.find(item=>item.value == value)?.label}</Tag>
                )
            }

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
                let buttons=[
                    <Tooltip key="details-btn" title={intl.formatMessage({id:"global.details"})}>
                        <Button type="text" onClick={()=>{showDetails(record)}} icon={<Binoculars size={14} />} />
                    </Tooltip>,
                    <Tooltip key="edit-btn" title={intl.formatMessage({id:"global.edit"})}>
                        <Button type="text" icon={<SquarePen size={14} />} />
                    </Tooltip>
                ]
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
                    <Button type="primary" icon={<Plus size={14} />}>{intl.formatMessage({id:"global.add"})}</Button>
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
            <Table<Firewall>
                ref={printRef}
                bordered={false}
                rowKey={"id"}
                rowSelection={rowSelection}
                columns={columns}
                dataSource={firewallData}
                scroll={{ x: 'max-content' }}
                />
        </Container>
    )
}