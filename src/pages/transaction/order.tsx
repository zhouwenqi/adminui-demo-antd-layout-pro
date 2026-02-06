import { Container } from "@adminui-dev/antd-layout";
import {  Button, Flex,  Space, Table, Tag, Grid, theme, Input, Tooltip,App, Popconfirm } from 'antd';
import  type { TableColumnsType, TableProps,TableColumnType,PopconfirmProps } from 'antd';
import type { Order } from "@/pages/typings";
import { Search,Download,Printer,Trash, PackageCheck,Plus,Check,SquarePen,Binoculars,WalletCards } from "lucide-react";
import { useRef, useState } from "react";
import { useIntl } from "react-intl";
import { printElement } from "@/utils/printUtil";
import { getOrderStatus, getOrderStatusColor, getPaymentStatus, useOrderModel } from "./components";


const {useToken} = theme
const { useBreakpoint } = Grid
type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

type DataIndex = keyof Order


const orderData:Order[]=[
    {id:1,sn:"MS203899324",userId:1,userName:"Aneka",orderAmount:3698, paymentAmount:0, orderStatus:"APPROVED", paymentStatus:"UNPAID",createDate:"2026/01/17 23:02:29"},
    {id:2,sn:"MS203389593",userId:1,userName:"Aneka",orderAmount:1789, paymentAmount:1789, orderStatus:"COMPLETED", paymentStatus:"PAID", paymentChannel:"ALIPAY",paymentDate:"2026/01/18 02:22:45",createDate:"2026/01/18 02:20:45"},
    {id:3,sn:"MS203358562",userId:2,userName:"Felix",orderAmount:4798, paymentAmount:0, orderStatus:"CANCELED", paymentStatus:"UNPAID",createDate:"2026/01/18 23:02:29"},
    {id:4,sn:"MS203408543",userId:2,userName:"Felix",orderAmount:898, paymentAmount:0, orderStatus:"APPROVED", paymentStatus:"UNPAID",createDate:"2026/01/18 23:02:29"},
    {id:5,sn:"MS203304930",userId:2,userName:"Felix",orderAmount:5680, paymentAmount:5680, orderStatus:"COMPLETED", paymentStatus:"PAID",paymentChannel:"APPLE_PAY",paymentDate:"2026/01/18 03:28:18", createDate:"2026/01/18 03:28:13"},
    {id:6,sn:"MS203940960",userId:3,userName:"Neutral",orderAmount:4580, paymentAmount:0, orderStatus:"PENDING", paymentStatus:"UNPAID",createDate:"2026/01/18 23:02:29"},
    {id:7,sn:"MS204550394",userId:4,userName:"Lorelei",orderAmount:5423, paymentAmount:0, orderStatus:"APPROVED", paymentStatus:"UNPAID",createDate:"2026/01/18 23:02:29"},
    {id:8,sn:"MS200949504",userId:5,userName:"Miniavs",orderAmount:3455, paymentAmount:0, orderStatus:"APPROVED", paymentStatus:"UNPAID",createDate:"2026/01/18 23:02:29"},
    {id:9,sn:"MS200490495",userId:6,userName:"Apple",orderAmount:4299, paymentAmount:0, orderStatus:"CANCELED", paymentStatus:"UNPAID",createDate:"2026/01/18 23:02:29"},
    {id:10,sn:"MS204059005",userId:7,userName:"Adventurer",orderAmount:1183, paymentAmount:1183, orderStatus:"COMPLETED", paymentStatus:"PAID",paymentChannel:"WEIXIN_PAY",paymentDate:"2026/01/18 01:18:38", createDate:"2026/01/18 01:18:09"}
]


/**
 * Order - page
 * @returns 
 */
export default function(){
    const intl = useIntl()
    const { token } = useToken()
    const { xs } = useBreakpoint()
    const { message } = App.useApp()
    const printRef = useRef<any>(null)    
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const {showDetailsDrawer,detailsDrawer,showCreateDrawer,createDrawer,showEditDrawer,editDrawer,showPaymentModal, paymentModal} = useOrderModel()

    const orderStatus = getOrderStatus(intl)
    const paymentStatus = getPaymentStatus(intl)

    const filterOrderStatus = orderStatus.map(item=>({text:item.label,value:item.value}))
    const filterPaymentStatus = paymentStatus.map(item=>({text:item.label,value:item.value}))
 

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection: TableRowSelection<Order> = {
        selectedRowKeys,
        onChange: onSelectChange,
    }
    

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<Order> => ({
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

    const columns: TableColumnsType<Order> = [         
        {
            title: intl.formatMessage({id:"global.column.uid"}),
            dataIndex: 'sn',
            filterSearch: true,
            sorter:true,
            render:(value,record)=>{
                return(
                    <a onClick={()=>{showOrderDetails(record)}}>{value}</a>
                )
            },
            ...getColumnSearchProps('sn'),  
        },
        {
            title: intl.formatMessage({id:"order.column.userName"}),
            dataIndex: 'userName',
            ...getColumnSearchProps('userName'), 
        },
        {
            title: intl.formatMessage({id:"order.column.amount"}),
            dataIndex: 'orderAmount',
            sorter:true, 
            render:(value)=>{
                return(
                    '$ ' + value
                )
            },
            width:"160px",
        },
        {
            title: intl.formatMessage({id:"global.column.status"}),
            dataIndex: 'orderStatus',
            width:"160px",
            filters:filterOrderStatus,
            render(value) {
                return(
                    <Tag color={getOrderStatusColor(value)} >{filterOrderStatus.find(item=>item.value == value)?.text}</Tag>
                )
            },
            sorter:true,
        },
        {
            title: intl.formatMessage({id:"payment.column.amount"}),
            dataIndex: 'paymentAmount',
            sorter:true, 
            render:(value)=>{
                return(
                    value > 0 ? '$ ' + value : "-"
                )
            },
            
        },     
        {
            title: intl.formatMessage({id:"payment.column.status"}),
            dataIndex: 'paymentStatus',
            width:"180px",
            filters:filterPaymentStatus,
            render(value) {
                const tagValue = filterPaymentStatus.find(item=>item.value == value)?.text
                return(
                    value=="PAID" ? <Tag color={"green"} style={{display:"inline-flex", alignItems:"center",gap:"2px"}} icon={<Check size={14} />} >{tagValue}</Tag> : <Tag>{tagValue}</Tag>
                )
            },
            sorter:true,
        },   
        {
            title: intl.formatMessage({id:"order.column.createDate"}),
            dataIndex: 'createDate',
            width:"160px",
            sorter:true,
        },
        {
            title: intl.formatMessage({id:"global.column.action"}),
            dataIndex: 'id',
            width:"160px",
            align:"right",
            render(record){
                let buttons=[<Tooltip key="details-btn" title={intl.formatMessage({id:"order.drawer.details.title"})}>
                            <Button onClick={()=>{showOrderDetails(record)}} type="text" icon={<Binoculars size={14} />} />
                        </Tooltip>]
                if(record.orderStatus == "APPROVED" || record.orderStatus == "PENDING"){
                    buttons.unshift(<Tooltip key="edit-btn" title={intl.formatMessage({id:"order.button.edit"})}>
                            <Button type="text" onClick={()=>{showEditDrawer(record)}} icon={<SquarePen size={14} />} />
                        </Tooltip> )
                }
                if(record.paymentStatus=="UNPAID"){
                    buttons.unshift(<Tooltip key="payment-btn" title={intl.formatMessage({id:"order.button.payment"})}>
                            <Button type="text" onClick={()=>{showPaymentModal(record)}} icon={<WalletCards size={14} />} />
                        </Tooltip> )
                }
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

    const onConfirmDelete:PopconfirmProps["onConfirm"]=(e)=>{
        console.log(e)
        message.success(intl.formatMessage({id:"order.confirm.create.success"}))        
    }

    const onVerifyOrder=()=>{
        message.info(intl.formatMessage({id:"order.confirm.verify.completed"}))
    }

    const showOrderDetails=(order:Order)=>{
        showDetailsDrawer(order)
    }

    return(
        <Container mode="panel">
            {detailsDrawer}{createDrawer}{editDrawer}{paymentModal}
            <Flex justify="space-between" gap={token.padding} wrap={xs} style={{marginBlockEnd:token.margin}}>                
                <Space>
                    <Button key="create-btn" type="primary" onClick={()=>{showCreateDrawer()}} icon={<Plus size={14} />}>{intl.formatMessage({id:"order.button.create"})}</Button>
                </Space>
                <Space>
                    <Space.Compact key="compact-left">
                        <Tooltip title={intl.formatMessage({id:"global.export"})}>                            
                            <Button key="export-btn" onClick={()=>{onExportXls()}} icon={<Download size={14} />}></Button>
                        </Tooltip>    
                        <Tooltip title={intl.formatMessage({id:"global.print"})}>                            
                            <Button key="print-btn" onClick={()=>{printElement(printRef,{})}} icon={<Printer size={14} />}></Button>
                        </Tooltip>                   
                    </Space.Compact>  
                    <Space.Compact key="compact-right">                        
                        <Popconfirm onConfirm={onVerifyOrder} title={intl.formatMessage({id:"order.confirm.verify.title"})} description={intl.formatMessage({id:"order.confirm.verify.content"})}>
                            <Tooltip title={intl.formatMessage({id:"order.button.verify"})}>
                                <Button key="verify-btn" disabled={selectedRowKeys.length <= 0} icon={<PackageCheck size={14} />} />
                            </Tooltip>
                        </Popconfirm> 
                        <Popconfirm onConfirm={onConfirmDelete} title={intl.formatMessage({id:"order.confirm.delete.title"})} description={intl.formatMessage({id:"order.confirm.delete.content"})}>
                            <Tooltip title={intl.formatMessage({id:"order.button.delete"})}>
                                <Button key="delete-btn" disabled={selectedRowKeys.length <= 0} icon={<Trash size={14} />} />
                            </Tooltip>
                        </Popconfirm>
                    </Space.Compact>                 
                </Space>
            </Flex>
            <Table<Order>
                ref={printRef}
                bordered={false}
                rowKey={"id"}
                rowSelection={rowSelection}
                columns={columns}
                dataSource={orderData}
                scroll={{ x: 'max-content' }}
                />
        </Container>
    )
}