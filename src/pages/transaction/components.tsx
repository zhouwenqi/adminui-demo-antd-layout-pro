import { useIntl, type IntlShape } from "react-intl";
import type { Order, OrderStatus } from "../typings";
import type {DrawerProps,DescriptionsProps,ModalProps } from "antd";
import {Drawer,Button,Space,Descriptions, Tag, Form, Input, InputNumber, Select,App, Modal} from "antd";
import {Check,SquarePen,Trash,WalletCards,PackageCheck} from "lucide-react";
import { useState } from "react";

const {TextArea} = Input

export const getOrderStatus=(intl:IntlShape)=>{
    return [
        {label:intl.formatMessage({id:"order.status.option.pending"}),value:"PENDING"},
        {label:intl.formatMessage({id:"order.status.option.approved"}),value:"APPROVED"},
        {label:intl.formatMessage({id:"order.status.option.canceled"}),value:"CANCELED"},
        {label:intl.formatMessage({id:"order.status.option.completed"}),value:"COMPLETED"}
    ]
}

export const getPaymentStatus=(intl:IntlShape)=>{
    return [
        {label:intl.formatMessage({id:"payment.status.option.paid"}),value:"PAID"},
        {label:intl.formatMessage({id:"payment.status.option.unpaid"}),value:"UNPAID"},
    ]
}

export const getPaymentChannel=(intl:IntlShape)=>{
    return [
        {label:intl.formatMessage({id:"payment.channel.option.applepay"}),value:"APPLE_PAY"},
        {label:intl.formatMessage({id:"payment.channel.option.applepay"}),value:"GOOGLE_PAY"},
        {label:intl.formatMessage({id:"payment.channel.option.weixinpay"}),value:"WEIXIN_PAY"},
        {label:intl.formatMessage({id:"payment.channel.option.alipay"}),value:"ALIPAY"},
        {label:intl.formatMessage({id:"payment.channel.option.paypal"}),value:"PAYPAL"},
        {label:intl.formatMessage({id:"payment.channel.option.creditcard"}),value:"CREDIT_CARD"},
    ]
}
export const getProductCaties=(intl:IntlShape)=>{
    return [
        {label:intl.formatMessage({id:"product.cate.option.book"}),value:"BOOK"},
        {label:intl.formatMessage({id:"product.cate.option.movie"}),value:"MOVIE"},
        {label:intl.formatMessage({id:"product.cate.option.music"}),value:"MUSIC"},
        {label:intl.formatMessage({id:"product.cate.option.game"}),value:"GAME"},
    ]
}

export const getOrderStatusColor=(status:OrderStatus)=>{
    let color = "cyan"
    switch(status){
        case "COMPLETED":
            color = "green"
            break
        case "CANCELED":
            color = "default"
            break
        case "APPROVED":
            color = "blue"
            break
        default:
            color = "cyan"
    }  
    return color  
}
interface OrderDrawerProps extends DrawerProps {
    order?:Order,
    onEdit?:(order:Order)=>void,
    onDelete?:(order:Order)=>void,
    onPayment?:(order:Order)=>void,
    onVerify?:(order:Order)=>void
}

/**
 * Drawer - order details
 * @param props 
 * @returns 
 */
function OrderDetailsDrawer(props:OrderDrawerProps){
    const { order } = props
    const intl =  useIntl()
    if(!order){
        return <></>
    }

    const orderStatus = getOrderStatus(intl)
    const paymentStatus = getPaymentStatus(intl)
    const paymentChannel = getPaymentChannel(intl)

    const items: DescriptionsProps['items'] = [
        {
            key: '1',            
            label: intl.formatMessage({id:"order.column.sn"}),
            children: order.sn,
            span:"filled",
        },
        {
            key: '2',
            label: intl.formatMessage({id:"order.column.userName"}),
            children: order.userName,
            span:"filled",
        },
        {
            key: '3',
            label: intl.formatMessage({id:"order.column.amount"}),
            children: '$' + order.orderAmount,
            span:"filled",
        },
        {
            key: '4',
            label: intl.formatMessage({id:"payment.column.amount"}),
            children:'$' + order.paymentAmount,
            span:"filled",
        },
        {
            key: '5',
            label: intl.formatMessage({id:"order.column.status"}),
            children: <Tag color={getOrderStatusColor(order.orderStatus)} >{orderStatus.find(item=>item.value == order.orderStatus)?.label}</Tag>,
            span:"filled",
        },
        {
            key: '6',
            label: intl.formatMessage({id:"payment.column.status"}),
            children: <Tag color={ order.paymentStatus == "PAID" ? "green" : "default"} style={{display:"inline-flex", alignItems:"center",gap:"2px"}} icon={order.paymentStatus == "PAID" ? <Check size={14} /> : undefined}>{paymentStatus.find(item=>item.value == order.paymentStatus)?.label}</Tag>,
            span:"filled",
        },
        {
            key: '7',
            label: intl.formatMessage({id:"payment.column.channel"}),
            children: <Tag>{paymentChannel.find(item=>item.value == order.paymentChannel)?.label}</Tag>,
            span:"filled",
        },
        {
            key: '8',            
            label: intl.formatMessage({id:"payment.column.sn"}),
            children: order.paymentSn,
            span:"filled",
        },
        {
            key: '9',
            label: intl.formatMessage({id:"payment.column.paymentDate"}),
            children: order.paymentDate,
            span:"filled",
        },
        {
            key: '10',
            label: intl.formatMessage({id:"order.column.createDate"}),
            children: order.createDate,
            span:"filled",
        },
    ]
    let extraButtons:React.ReactNode[]=[]
    if(order.orderStatus != "COMPLETED" && order.orderStatus != "CANCELED"){
        extraButtons.push(<Button key="edit-btn" onClick={()=>props.onEdit!(order)} icon={<SquarePen size={14} />}>{intl.formatMessage({id:"order.button.edit"})}</Button>)
    }
    if(order.orderStatus != "COMPLETED"){
        extraButtons.push(<Button key="delete-btn" onClick={()=>props.onDelete!(order)} icon={<Trash size={14} />} danger>{intl.formatMessage({id:"order.button.delete"})}</Button>)
    }  
    let footerButtons:React.ReactNode[]=[]
    if(order.paymentStatus=="UNPAID"){
        footerButtons.push(<Button onClick={()=>props.onPayment!(order)} icon={<WalletCards size={14} />} key="payment-btn">{intl.formatMessage({id:"order.button.payment"})}</Button>)
    }
    if(order.orderStatus == "PENDING"){
        footerButtons.push(<Button onClick={()=>props.onVerify!(order)} icon={<PackageCheck size={14} />} key="verify-btn">{intl.formatMessage({id:"order.button.verify"})}</Button>)
    }
    return(
        <>
        <Drawer {...props} title={intl.formatMessage({id:"order.drawer.details.title"})} extra={<Space>{extraButtons}</Space>} footer={footerButtons.length>0?<Space>{footerButtons}</Space>:undefined}>
            <Descriptions bordered items={items} />
        </Drawer>
        </>
    )
}

const userList=[
    {label:"Aneka",value:1},
    {label:"Felix",value:2},
    {label:"Neutral",value:3},
    {label:"Lorelei",value:4},
    {label:"Miniavs",value:5},
    {label:"Apple",value:6},
    {label:"Adventurer",value:7},
]

/**
 * Drawer create order
 * @param props 
 * @returns 
 */
function OrderCreateDrawer(props:DrawerProps){ 
    const intl =  useIntl()
    const [form] = Form.useForm();
    const {message} = App.useApp()

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        message.success(intl.formatMessage({id:"order.create.success"}),undefined,()=>{form.resetFields()})
    }
       
    return(
        <>
        <Drawer {...props} title={intl.formatMessage({id:"order.drawer.create.title"})} extra={<Space><Button type="primary" onClick={()=>{form.submit()}}>{intl.formatMessage({id:"global.save"})}</Button><Button onClick={()=>{form.resetFields()}}>{intl.formatMessage({id:"global.reset"})}</Button></Space>}>
            <Form
                form={form}
                onFinish={onFinish}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}                
                layout="horizontal"
                style={{ maxWidth: 600 }}
                >
                <Form.Item
                label={intl.formatMessage({id:"order.column.sn"})}
                name="sn"
                rules={[{ required: true, message: intl.formatMessage({id:"order.sn.require"}) }]}
                >
                    <Input maxLength={16} minLength={6} placeholder={intl.formatMessage({id:"order.sn.placeholder"})} />
                </Form.Item>
                <Form.Item
                label={intl.formatMessage({id:"order.column.userName"})}
                name="userId"
                rules={[{ required: true, message: intl.formatMessage({id:"order.userId.require"}) }]}
                >
                    <Select allowClear placeholder={intl.formatMessage({id:"order.userId.placeholder"})} options={userList} />
                </Form.Item>
                <Form.Item
                label={intl.formatMessage({id:"order.column.amount"})}
                name="orderAmount"
                rules={[{ required: true, message: intl.formatMessage({id:"order.amount.require"}) }]}
                >
                    <InputNumber min={1} max={9999} value={100} placeholder={intl.formatMessage({id:"order.amount.placeholder"})} />
                </Form.Item>
                <Form.Item
                label={intl.formatMessage({id:"order.column.description"})}
                name="description"
                >
                    <TextArea maxLength={200} rows={5} placeholder={intl.formatMessage({id:"order.description.placeholder"})} />
                </Form.Item>
            </Form>
            
        </Drawer>
        </>
    )
}

/**
 * Drawer order editor
 * @param props 
 * @returns 
 */
function OrderEditDrawer(props:DrawerProps&{order?:Order}){ 
    const intl =  useIntl()
    const {order} = props
    if(!order){
        return <></>
    }
    const [form] = Form.useForm()
    const {message} = App.useApp()

    form.setFieldsValue(order)

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        message.success(intl.formatMessage({id:"order.update.success"}),undefined,()=>{form.resetFields()})
    }
       
    return(
        <>
        <Drawer {...props} title={intl.formatMessage({id:"order.drawer.edit.title"})} extra={<Space><Button type="primary" onClick={()=>{form.submit()}}>{intl.formatMessage({id:"global.save"})}</Button><Button onClick={()=>{form.setFieldsValue(order)}}>{intl.formatMessage({id:"global.reset"})}</Button></Space>}>
            <Form
                form={form}
                onFinish={onFinish}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}                
                layout="horizontal"
                style={{ maxWidth: 600 }}
                >
                <Form.Item
                label={intl.formatMessage({id:"order.column.sn"})}
                name="sn"
                rules={[{ required: true, message: intl.formatMessage({id:"order.sn.require"}) }]}
                >
                    <Input maxLength={16} minLength={6} placeholder={intl.formatMessage({id:"order.sn.placeholder"})} />
                </Form.Item>
                <Form.Item
                label={intl.formatMessage({id:"order.column.userName"})}
                name="userId"
                rules={[{ required: true, message: intl.formatMessage({id:"order.userId.require"}) }]}
                >
                    <Select allowClear placeholder={intl.formatMessage({id:"order.userId.placeholder"})} options={userList} />
                </Form.Item>
                <Form.Item
                label={intl.formatMessage({id:"order.column.amount"})}
                name="orderAmount"
                rules={[{ required: true, message: intl.formatMessage({id:"order.amount.require"}) }]}
                >
                    <InputNumber min={1} max={9999} value={100} placeholder={intl.formatMessage({id:"order.amount.placeholder"})} />
                </Form.Item>
                <Form.Item
                label={intl.formatMessage({id:"order.column.amount"})}
                name="orderAmount"
                rules={[{ required: true, message: intl.formatMessage({id:"order.amount.require"}) }]}
                >
                    <InputNumber min={1} max={9999} value={100} placeholder={intl.formatMessage({id:"order.amount.placeholder"})} />
                </Form.Item>
                <Form.Item
                label={intl.formatMessage({id:"order.column.description"})}
                name="description"
                >
                    <TextArea maxLength={200} rows={5} placeholder={intl.formatMessage({id:"order.description.placeholder"})} />
                </Form.Item>
            </Form>
            
        </Drawer>
        </>
    )
}

/**
 * Modal - order payment
 * @param props 
 * @returns 
 */
function OrderPaymentModal(props:ModalProps&{order?:Order}){
    const { order } = props

    if(!order){
        return <></>
    }
    
    const intl = useIntl()
    const [form] = Form.useForm()
    const {message} = App.useApp()

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        message.success(intl.formatMessage({id:"order.update.success"}),undefined,()=>{form.resetFields()})
    }
    
    form.setFieldValue("sn",order.sn)
    form.setFieldValue("paymentAmount",order.orderAmount)
    const paymentChannel = getPaymentChannel(intl)
    return(
        <Modal {...props} title={intl.formatMessage({id:"payment.modal.title"})}>
            <Form
                form={form}
                onFinish={onFinish}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}                
                layout="horizontal"
                style={{ maxWidth: 600 }}
                >
                <Form.Item
                label={intl.formatMessage({id:"order.column.sn"})}
                name="sn"
                rules={[{ required: true, message: intl.formatMessage({id:"order.sn.require"}) }]}
                >
                    <Input disabled={true} maxLength={16} minLength={6} placeholder={intl.formatMessage({id:"order.sn.placeholder"})} />
                </Form.Item>
                <Form.Item
                label={intl.formatMessage({id:"payment.column.channel"})}
                name="paymentChannel"
                >
                    <Select defaultValue={"CREDIT_CARD"} placeholder={intl.formatMessage({id:"order.userId.placeholder"})} options={paymentChannel} />
                </Form.Item>
                <Form.Item
                label={intl.formatMessage({id:"payment.column.amount"})}
                name="paymentAmount"
                rules={[{ required: true, message: intl.formatMessage({id:"payment.amount.require"}) }]}
                >
                    <InputNumber min={0} max={9999} placeholder={intl.formatMessage({id:"payment.amount.placeholder"})} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export function useOrderModel(){
    const intl = useIntl()
    const {message} = App.useApp()
    const [openDetails,setOpenDetails] = useState<boolean>(false)
    const [detailsRecord,setDetailsRecord] = useState<Order>()
    const [openEdit,setOpenEdit] = useState<boolean>(false)
    const [openCreate,setOpenCreate] = useState<boolean>(false)
    const [openPayment,setOpenPayment] = useState<boolean>(false)
    const showDetailsDrawer=(order?:Order)=>{
        setDetailsRecord(order)
        setOpenDetails(true)
    }   
    const showCreateDrawer=()=>{        
        setOpenCreate(true)
    }
    const showEditDrawer=(order?:Order)=>{
        setDetailsRecord(order)
        setOpenEdit(true)
    }
    const showPaymentModal=(order?:Order)=>{
        setDetailsRecord(order)
        setOpenPayment(true)
    }
    const deleteOrder=(order:Order)=>{
        console.log(order)
        message.success(intl.formatMessage({id:"order.confirm.create.success"}))        
    }

    const verifyOrder=(order:Order)=>{        
        console.log(order)
        message.info(intl.formatMessage({id:"order.confirm.verify.completed"}))
    }
    const detailsDrawer = <OrderDetailsDrawer zIndex={1} order={detailsRecord} size={500} open={openDetails} onClose={()=>{setOpenDetails(false)}} onEdit={showEditDrawer} onDelete={deleteOrder} onPayment={showPaymentModal} onVerify={verifyOrder} />    
    const createDrawer = <OrderCreateDrawer zIndex={2} size={500} open={openCreate} onClose={()=>{setOpenCreate(false)}} />
    const editDrawer = <OrderEditDrawer zIndex={3} order={detailsRecord} size={500} open={openEdit} onClose={()=>{setOpenEdit(false)}} />
    const paymentModal = <OrderPaymentModal zIndex={4} order={detailsRecord} open={openPayment} onCancel={()=>{setOpenPayment(false)}} />
    return { showDetailsDrawer, showCreateDrawer,showEditDrawer,showPaymentModal, detailsDrawer,createDrawer,editDrawer,paymentModal }
}