import { Container} from "@adminui-dev/antd-layout";
import {  Button, Flex,  Space, Table,  Grid, theme, Input, Tooltip,App, Segmented,Tag, Tree} from 'antd';
import  type { TableColumnsType, TableProps,TableColumnType,TreeDataNode, TreeProps } from 'antd';
import type { Dept } from "@/pages/typings";
import { Search,Download,FolderTree,Trash, Upload,Plus,TableIcon,SquarePen,Binoculars } from "lucide-react";
import { useRef, useState } from "react";
import { useIntl } from "react-intl";
import { useDeptDrawer } from "./components";
import { transformTreeData } from "@/utils/stringUtil";


const {useToken} = theme
const { useBreakpoint } = Grid
type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

type DataIndex = keyof Dept
type ViewType = "tree" | "table"

const deptData:Dept[]=[
    {id:1,name:"Administration",code:"D0001",members:8,desciption:"Administration Department",createDate:"2016/01/15 22:05:39"},
    {id:2,name:"Finance",members:12,parentId:1,parentName:"Administration",code:"D0002",desciption:"Finance Department",createDate:"2016/01/15 22:05:39"},
    {id:3,name:"Marketing",members:59,code:"D0003",parentId:9,parentName:"Business",desciption:"Marketing Department",createDate:"2016/01/15 22:05:39"},
    {id:4,name:"Development",members:19,code:"D0004",desciption:"Research and Development Department",createDate:"2016/01/15 22:05:39"},
    {id:5,name:"After-sales service",members:14,code:"D0005",parentId:9,parentName:"Business",desciption:"After-sales service department",createDate:"2016/01/15 22:05:39"},
    {id:6,name:"Sales",code:"D0006",members:20,parentId:9,parentName:"Business",desciption:"Sales Department",createDate:"2016/01/15 22:05:39"},
    {id:7,name:"Operations",code:"D0007",members:18,parentId:9,parentName:"Business",desciption:"Operations Department",createDate:"2016/01/15 22:05:39"},
    {id:8,name:"Testing",code:"D0008",members:7,parentId:4,parentName:"Development",desciption:"Testing Department",createDate:"2016/01/15 22:05:39"},
    {id:9,name:"Business",code:"D0009",members:12,desciption:"Business Department",createDate:"2016/01/15 22:05:39"},
    {id:10,name:"Database",code:"D0010",members:13,parentId:4,parentName:"Development",desciption:"Business Department",createDate:"2016/01/15 22:05:39"},
]


/**
 * Dept - page
 * @returns 
 */
export default function(){
    const intl = useIntl()
    const { token } = useToken()
    const { xs } = useBreakpoint()
    const { message } = App.useApp()
    const printRef = useRef<any>(null)    
    const [viewType,setViewType] = useState<ViewType>("table")
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const {detailsDrawer,showDetails} = useDeptDrawer()

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    }

    const rowSelection: TableRowSelection<Dept> = {
        selectedRowKeys,
        onChange: onSelectChange,
    }
    
    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<Dept> => ({
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

    const columns: TableColumnsType<Dept> = [        
        {
            title: intl.formatMessage({id:"dept.column.name"}),
            dataIndex: 'name',
            render(value, record) {
                return(<a onClick={()=>{showDetails(record)}}>{value}</a>)
            },
            ...getColumnSearchProps('name'), 
        }, 
        {
            title: intl.formatMessage({id:"global.column.code"}),
            dataIndex: 'code',
            filterSearch: true,
            sorter:true,            
            width:"160px",
            render:(value)=>{
                return(
                    <Tag>{value}</Tag>
                )
            },
            ...getColumnSearchProps('code'),  
        },
        {
            title: intl.formatMessage({id:"dept.column.parent"}),
            dataIndex: 'parentName',
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
            render(value,record){
              console.log(value)
                let buttons=[<Tooltip  key="details-btn" title={intl.formatMessage({id:"global.details"})}>
                            <Button onClick={()=>{showDetails(record)}} type="text" icon={<Binoculars size={14} />} />
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

    const showTypeOptions=[
        {tooltip:intl.formatMessage({id:"global.table"}),value:"table",icon:<TableIcon size={14} />},
        {tooltip:intl.formatMessage({id:"global.tree"}),value:"tree",icon:<FolderTree size={14} />},
    ]

    return(
        <Container mode="panel">
            {detailsDrawer}
            <Flex justify="space-between" gap={token.padding} wrap={xs} style={{marginBlockEnd:token.margin}}>                
                <Space>
                    <Button type="primary" icon={<Plus size={14} />}>{intl.formatMessage({id:"global.create"})}</Button>
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
                    </Space.Compact>  
                    <Space.Compact>
                        <Tooltip title={intl.formatMessage({id:"global.delete"})}>
                            <Button disabled={selectedRowKeys.length <= 0} icon={<Trash size={14} />} />
                        </Tooltip>
                    </Space.Compact>                 
                </Space>
            </Flex>
            { viewType=="table" ?
            <Table<Dept>
                ref={printRef}
                bordered={false}
                rowKey={"id"}
                rowSelection={rowSelection}
                columns={columns}
                pagination={false}
                dataSource={deptData}
                scroll={{ x: 'max-content' }}
                /> : <DeptTreePanel onOpenDetails={showDetails} />}
        </Container>
    )
}


/**
 * Panel - dept tree
 * @returns 
 */
function DeptTreePanel(props:{onOpenDetails:(dept?:Dept)=>void}){
    const treeData = transformTreeData(deptData)

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
    const dept = deptData.find(item=>item.id==e[0])
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