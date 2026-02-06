import { Container} from "@adminui-dev/antd-layout";
import {  Button, Flex,  Space, Table, Tag, Grid, theme, Input, Tooltip,App, Tree,Segmented} from 'antd';
import  type { TableColumnsType, TableProps,TableColumnType,TreeProps,TreeDataNode } from 'antd';
import type { Permission } from "@/pages/typings";
import { Search,Download,Printer,Trash, Upload,Plus,SquarePen,Binoculars,TableIcon,FolderTree } from "lucide-react";
import { useRef, useState } from "react";
import { useIntl } from "react-intl";
import { printElement } from "@/utils/printUtil";
import { transformTreeData, getYesOrNo } from "@/utils/stringUtil";
import { usePermissionDrawer,permissionData } from "./components";


const {useToken} = theme
const { useBreakpoint } = Grid
type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection']

type DataIndex = keyof Permission
type ViewType = "tree" | "table"

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
    const [viewType,setViewType] = useState<ViewType>("table")
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const {detailsDrawer,showDetails} = usePermissionDrawer()
 
    const yesOrNo = getYesOrNo(intl)
    const filterYesOrNo = yesOrNo.map(item=>({text:item.label,value:item.value}))

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    }

    const rowSelection: TableRowSelection<Permission> = {
        selectedRowKeys,
        onChange: onSelectChange,
    }
    
    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<Permission> => ({
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

    const columns: TableColumnsType<Permission> = [ 
        {
            title: "ID",
            dataIndex: 'id',
            width:"80px"
        },
        {
            title: intl.formatMessage({id:"permission.column.name"}),
            dataIndex: 'name',
            filterSearch: true,
            sorter:true,
            render:(value,record)=>{
                return(
                    <a onClick={()=>{showDetails(record)}}>{value}</a>
                )
            },
            ...getColumnSearchProps('name'),  
        },
        {
            title: intl.formatMessage({id:"permission.column.value"}),
            dataIndex: 'value',
            filterSearch: true,
            sorter:true,
            render:(value)=>{
                return(
                    <Tag>{value}</Tag>
                )
            },
            ...getColumnSearchProps('name'),  
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

    const showTypeOptions=[
        {tooltip:intl.formatMessage({id:"global.table"}),value:"table",icon:<TableIcon size={14} />},
        {tooltip:intl.formatMessage({id:"global.tree"}),value:"tree",icon:<FolderTree size={14} />},
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
                    <Space.Compact>
                        <Segmented styles={{"label":{display:"flex",alignItems:"center"},"icon":{display:"flex"}}} options={showTypeOptions} defaultValue={viewType} value={viewType} onChange={(e)=>{setViewType(e as ViewType)}} />
                    </Space.Compact> 
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
            {viewType=="table" ? 
            <Table<Permission>
                ref={printRef}
                bordered={false}
                rowKey={"id"}
                pagination={false}
                rowSelection={rowSelection}
                columns={columns}
                dataSource={permissionData}
                scroll={{ x: 'max-content' }}
                />
            : <PermissionTreePanel onOpenDetails={showDetails} />}
        </Container>
    )
}

/**
 * Panel - permission tree
 * @returns 
 */
function PermissionTreePanel(props:{onOpenDetails:(dept?:Permission)=>void}){
    const treeData = transformTreeData(permissionData)  
    const [gData, setGData] = useState(treeData);
    const [expandedKeys] = useState([]);
    const onDragEnter: TreeProps['onDragEnter'] = (info) => {
        console.log(info);
    }

    const onDrop: TreeProps['onDrop'] = (info) => {
        console.log(info);
        const dropKey = info.node.key;
        const dragKey = info.dragNode.key;
        const dropPos = info.node.pos.split('-');
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

        const loop = (
        data: TreeDataNode[],
        key: React.Key,
        callback: (node: TreeDataNode, i: number, data: TreeDataNode[]) => void,
        ) => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].key === key) {
            return callback(data[i], i, data);
            }
            if (data[i].children) {
            loop(data[i].children!, key, callback);
            }
        }
        };
        const data = [...gData]
        let dragObj: TreeDataNode
        loop(data, dragKey, (item, index, arr) => {
        arr.splice(index, 1);
        dragObj = item;
        });

        if (!info.dropToGap) {
        loop(data, dropKey, (item) => {
            item.children = item.children || [];
            item.children.unshift(dragObj)
        });
        } else {
        let ar: TreeDataNode[] = [];
        let i: number;
        loop(data, dropKey, (_item, index, arr) => {
            ar = arr;
            i = index;
        });
        if (dropPosition === -1) {
            ar.splice(i!, 0, dragObj!)
        } else {
            ar.splice(i! + 1, 0, dragObj!)
        }
        }
        setGData(data);
    }

    const onSelectDept=(e:React.Key[])=>{
        const dept = permissionData.find(item=>item.id==e[0])
        props.onOpenDetails(dept)
    }

    return (
        <Tree
            styles={{"root":{backgroundColor:"transparent"}}}
            onSelect={onSelectDept}
            defaultExpandedKeys={expandedKeys}
            draggable
            blockNode
            defaultExpandAll
            onDragEnter={onDragEnter}
            onDrop={onDrop}
            treeData={gData}
            />
    )

}