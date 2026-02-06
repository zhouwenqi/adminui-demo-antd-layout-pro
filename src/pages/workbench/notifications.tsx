import { Container, LazyAvatar} from "@adminui-dev/antd-layout";
import { Badge, Button, Dropdown, Flex, Segmented, Space, Table, Tag, Popconfirm,Grid, theme, App } from 'antd';
import type { TableColumnsType, TableProps,MenuProps,PopconfirmProps } from 'antd';
import type { Message } from "../typings";
import {Ellipsis} from "lucide-react";
import { useState } from "react";
import { useIntl } from "react-intl";

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
const {useToken} = theme
const { useBreakpoint } = Grid

const data: Message[] = [
  {
    id:1,
    avatar:"https://api.dicebear.com/9.x/miniavs/svg?seed=1",
    uid: 'John Brown',   
    content: 'New York No. 1 Lake Park',
    msgType:"NOTICE",
    createDate:"2026/01/23 23:02"
  },
  {
    id:2,
    uid: 'Jim Green',
    avatar:"https://api.dicebear.com/9.x/miniavs/svg?seed=2",
    content: 'London No. 1 Lake Park',
    msgType:"EVENT",
    createDate:"2026/01/23 23:02"
  },
  {
    id:3,
    uid: 'Joe Black',
    avatar:"https://api.dicebear.com/9.x/miniavs/svg?seed=3",   
    content: 'Sydney No. 1 Lake Park',
    msgType:"EVENT",
    read:true,
    createDate:"2026/01/23 23:02"
  },
  {
    id:4,
    avatar:"https://api.dicebear.com/9.x/miniavs/svg?seed=4",
    uid: 'Jake White',   
    content: 'New York No. 1 Lake Park',
    msgType:"EVENT",
    createDate:"2026/01/23 23:02"
  },
  {
    id:5,
    uid: 'Jim Red',
    avatar:"https://api.dicebear.com/9.x/miniavs/svg?seed=5",
    content: 'London No. 1 Lake Park',
    msgType:"EVENT",
    createDate:"2026/01/23 23:02"
  },
  {
    id:6,
    uid: 'Edward King',
    avatar:"https://api.dicebear.com/9.x/miniavs/svg?seed=6",   
    content: 'Sydney No. 1 Lake Park',
    msgType:"TODO",
    createDate:"2026/01/23 23:02"
  },
]

/**
 * Notifications - page
 * @returns 
 */
export default function(){
    const {token} = useToken()
    const { message } = App.useApp()
    const intl = useIntl()
    const {xs} = useBreakpoint()
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])    
    const readMenuOptions=[
        {key:"selected",label:intl.formatMessage({id:"notifications.action.option.selected"})},
        {key:"all",label:intl.formatMessage({id:"notifications.action.option.all"})},
    ]

    const msgTypeOptions = [
        {value:"NOTICE",label:intl.formatMessage({id:"notifications.type.notice"})},
        {value:"EVENT",label:intl.formatMessage({id:"notifications.type.event"})},
        {value:"TODO",label:intl.formatMessage({id:"notifications.type.todo"})},
    ]

    const msgTypeFilters = msgTypeOptions.map(item => ({text:item.label,value:item.value}))

    const columns: TableColumnsType<Message> = [
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
        },
        {
            title: intl.formatMessage({id:"global.column.type"}),
            dataIndex: 'msgType',
            width:"140px",
            render(value) {
                return(
                    <Tag>{msgTypeOptions.find(item=>item.value==value)?.label}</Tag>
                )
            },
            filters:msgTypeFilters
        },
        {
            title: intl.formatMessage({id:"global.column.content"}),
            dataIndex: 'content',
            render(value, record) {
                return(
                    <span><Badge style={{marginRight:"8px"}} status={record.read ? "default" : "processing"} />{value}</span>
                )
            },
        },  
        {
            title: intl.formatMessage({id:"global.column.createDate"}),
            dataIndex: 'createDate',
            width:"160px",
            sorter:true,
        },
    ]

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection: TableRowSelection<Message> = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

    const onMenuClick: MenuProps['onClick'] = (e) => {
        console.log('click', e);
    }

    const onConfirmClean:PopconfirmProps["onConfirm"]=(e)=>{
        console.log(e)
        message.success(intl.formatMessage({id:"notifications.clean.confirm.success"}))        
    }
    const btnDisable = selectedRowKeys.length <= 0

    return(
        <Container mode="panel">
            <Flex justify="space-between" gap={token.padding} wrap={xs} style={{marginBlockEnd:token.margin}}>                
                <Space><Segmented options={msgTypeOptions} /></Space>
                <Space>
                    <Space.Compact>
                        <Button disabled={btnDisable}>{intl.formatMessage({id:"notifications.button.read"})}</Button>
                        <Dropdown disabled={btnDisable} menu={{items:readMenuOptions,onClick:onMenuClick}}>
                            <Button icon={<Ellipsis size={14} />} />
                        </Dropdown>
                    </Space.Compact>
                    <Popconfirm onConfirm={onConfirmClean} title={intl.formatMessage({id:"notifications.clean.confirm.title"})} description={intl.formatMessage({id:"notifications.clean.confirm.description"})}>
                        <Button danger>{intl.formatMessage({id:"notifications.button.clean"})}</Button>
                    </Popconfirm>                    
                </Space>
            </Flex>
            <Table<Message>
                bordered={false}
                rowKey={"id"}
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
                scroll={{ x: 'max-content' }}
                />
        </Container>
    )
}