import { Container, LazyImage} from "@adminui-dev/antd-layout";
import {  Button, Flex,  Space, Table, Tag, Grid, theme, Input, Tooltip,App} from 'antd';
import  type { TableColumnsType, TableProps,TableColumnType } from 'antd';
import type { Product } from "@/pages/typings";
import { Search,Download,Printer,Trash, Upload,Plus,SquarePen,Binoculars } from "lucide-react";
import { useRef, useState } from "react";
import { useIntl } from "react-intl";
import { printElement } from "@/utils/printUtil";
import { getProductCaties } from "./components";
import { getYesOrNo } from "@/utils/stringUtil";


const {useToken} = theme
const { useBreakpoint } = Grid
type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

type DataIndex = keyof Product

const productData:Product[]=[
    {id:1,sn:"PD0050283",image:"https://picsum.photos/200?random=1",name:"Forza Horizon 5",label:"Forza Horizon 5",price:398,categories:"GAME",stock:800,arrive:true,disabled:false, createDate:"2026/01/17 23:02:29"},
    {id:2,sn:"PD0055323",image:"https://picsum.photos/200?random=2",name:"Minecraft",label:"Minecraft",price:334,categories:"GAME",stock:500,arrive:true,disabled:false, createDate:"2026/01/17 23:02:29"},
    {id:3,sn:"PD0066543",image:"https://picsum.photos/200?random=3",name:"Red Dead Redemption 2",label:"Red Dead Redemption 2",price:380,categories:"BOOK",stock:790,arrive:true,disabled:false, createDate:"2026/01/17 23:02:29"},
    {id:4,sn:"PD0076889",image:"https://picsum.photos/200?random=4",name:"EA Sports FC 26",label:"EA Sports FC 26",price:428,categories:"MUSIC",stock:780,arrive:false,disabled:true, createDate:"2026/01/17 23:02:29"},
    {id:5,sn:"PD0078990",image:"https://picsum.photos/200?random=5",name:"Baldur's Gate 3",label:"Baldur's Gate 3",price:459,categories:"GAME",stock:670,arrive:true,disabled:false, createDate:"2026/01/17 23:02:29"},
    {id:6,sn:"PD0034279",image:"https://picsum.photos/200?random=6",name:"PUBG: BATTLEGROUNDS",label:"PUBG: BATTLEGROUNDS",price:638,categories:"MOVIE",stock:70,arrive:true,disabled:true, createDate:"2026/01/17 23:02:29"},
    {id:7,sn:"PD0046734",image:"https://picsum.photos/200?random=7",name:"Hogwarts Legacy",label:"Hogwarts Legacy",price:590,categories:"GAME",stock:720,arrive:false,disabled:false, createDate:"2026/01/17 23:02:29"},
]

/**
 * Product - page
 * @returns 
 */
export default function(){
    const intl = useIntl()
    const { token } = useToken()
    const { xs } = useBreakpoint()
    const { message } = App.useApp()
    const printRef = useRef<any>(null)    
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const productCaties = getProductCaties(intl)
    const filterProductCaties = productCaties.map(item=>({text:item.label,value:item.value}))
    const yesOrNo = getYesOrNo(intl)
    const filterYesOrNo = yesOrNo.map(item=>({text:item.label,value:item.value}))
 

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    }

    const rowSelection: TableRowSelection<Product> = {
        selectedRowKeys,
        onChange: onSelectChange,
    }
    
    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<Product> => ({
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

    const columns: TableColumnsType<Product> = [  
        {
            title: intl.formatMessage({id:"product.column.image"}),
            dataIndex: 'image',
            filterSearch: true,
            sorter:true,
            render:(value,record)=>{
                return(
                    <a><LazyImage style={{width:"60px"}} src={value} alt={record.name} /></a>
                )
            },
        },       
        {
            title: intl.formatMessage({id:"product.column.sn"}),
            dataIndex: 'sn',
            filterSearch: true,
            sorter:true,
            render:(value)=>{
                return(
                    <a>{value}</a>
                )
            },
            ...getColumnSearchProps('sn'),  
        },
        {
            title: intl.formatMessage({id:"product.column.name"}),
            dataIndex: 'name',
            ...getColumnSearchProps('name'), 
        },
        {
            title: intl.formatMessage({id:"product.column.price"}),
            dataIndex: 'price',
            sorter:true, 
            render:(value)=>{
                return(
                    '$ ' + value
                )
            },
            width:"160px",
        },
        {
            title: intl.formatMessage({id:"product.column.cate"}),
            dataIndex: 'categories',
            width:"160px",
            filters:filterProductCaties,
            render(value) {
                return(
                    <Tag>{productCaties.find(item=>item.value == value)?.label}</Tag>
                )
            },
            sorter:true,
        },
        {
            title: intl.formatMessage({id:"product.column.stock"}),
            dataIndex: 'stock',
            sorter:true,             
        },  
        {
            title: intl.formatMessage({id:"product.column.arrive"}),
            dataIndex: 'arrive',        
            sorter:true,
            filters:filterYesOrNo,
            render(value) {
                return(
                    <Tag color={value ? "green" : "default"}>{yesOrNo.find(item=>item.value == value)?.label}</Tag>
                )
            },
        },      
        {
            title: intl.formatMessage({id:"global.column.disabled"}),
            dataIndex: 'disabled',          
            sorter:true,
            filters:filterYesOrNo,
            render(value) {
                return(
                    <Tag color={value ? "green" : "default"}>{yesOrNo.find(item=>item.value == value)?.label}</Tag>
                )
            },
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
            render(value){
                console.log(value)
                let buttons=[<Tooltip key="details-btn" title={intl.formatMessage({id:"global.details"})}>
                            <Button type="text" icon={<Binoculars size={14} />} />
                        </Tooltip>,<Tooltip key="edit-btn" title={intl.formatMessage({id:"product.button.edit"})}>
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
            <Flex justify="space-between" gap={token.padding} wrap={xs} style={{marginBlockEnd:token.margin}}>                
                <Space>
                    <Button type="primary" icon={<Plus size={14} />}>{intl.formatMessage({id:"product.button.plus"})}</Button>
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
                        <Tooltip title={intl.formatMessage({id:"product.button.delete"})}>
                            <Button disabled={selectedRowKeys.length <= 0} icon={<Trash size={14} />} />
                        </Tooltip>
                    </Space.Compact>                 
                </Space>
            </Flex>
            <Table<Product>
                ref={printRef}
                bordered={false}
                rowKey={"id"}
                rowSelection={rowSelection}
                columns={columns}
                dataSource={productData}
                scroll={{ x: 'max-content' }}
                />
        </Container>
    )
}