export type Device = "PC" | "MAC" | "TABLET" | "MOBILE" | "WATCH" | "OTHER"
export type OS = "WINDOWS" | "OSX" | "IOS" | "ANDROID" | "LINUX" | "OTHER"
export type Platform = "WEB" | "APP" | "MICROPROGRAM" | "DESKTOP"
export type OrderStatus = "PENDING" | "APPROVED" | "CANCELED" | "COMPLETED"
export type PaymentStatus = "UNPAID" | "PAID"
export type PaymentChannel = "APPLE_PAY" | "PAYPAL" | "GOOGLE_PAY" | "WEIXIN_PAY" | "ALIPAY" | "CREDIT_CARD"
export type ProductCate = "BOOK" | "MOVIE" | "MUSIC" | "GAME"

export type User = {
    id:number,
    uid:string,
    realName:string,
    avatarUrl:string,
    deptName?:string,
    deptId?:number,
    roleName?:string,
    roleId?:number,
    email?:string,
    disabled?:boolean,
    lastDate?:string,
    createDate:string,
}
export type Project = {
    id:number,
    name:string,    
    code?:string,
    icon?:string,
    color?:string,
    description:string,
    memberCount:number,
    speedCount:number,
    testCount:number,
    createDate:string
}

export type Order = {
    id:number,
    sn:string,
    userId?:number,
    userName?:string,
    orderAmount:number,
    paymentAmount?:number,
    orderStatus:OrderStatus,
    paymentSn?:string,
    paymentStatus:PaymentStatus,
    paymentChannel?:PaymentChannel,
    description?:string,
    paymentDate?:string,
    createDate?:string,
}

export type Product = {
    id:number,
    sn:string,
    name:string,
    image:string,
    price:number,
    stock:number,
    categories:ProductCate,
    label?:string,
    arrive:boolean,
    disabled:boolean,
    description?:string,
    createDate?:string,
}

export type Dept = {
    id:number,
    name:string,
    parentId?:number,
    parentName?:string,
    members?:number,
    code?:string,
    desciption:string,
    createDate:string,
}

export type Role = {
    id:number,
    name:string,
    value:string,
    disabled:boolean,
    permissionIds?:number[]
    description?:string,
    createDate?:string,
}

export type Firewall = {
    id:number,
    ip:string[],
    disabled?:boolean,
    description?:string,
    createDate?:string,
}

export type Permission = {
    id:number,
    name:string,
    value:string,
    parentId?:number,
    parentName?:string,
    disabled?:boolean,
    description?:string,
    createDate?:string,
}

export type OperationLog = {
    id:number,
    avatar?:string,
    name:string,
    title?:string,
    ip?:string,
    content?:string | React.ReactNode,
    action:'CREATE'|'UPDATE'|'DELETE'|'VERIFY'|'PUBLISH'|'JOIN'|'REMOVE'|'EXIT'|'UPLOAD'|'DOWNLOAD'|'LOGIN',
    createDate:string,
}

export type LoginLog = {
    id:number,    
    uid:string,
    avatar?:string,
    status:"SUCCESS" | "FAILED",
    ip?:string,
    os:OS,
    device:Device,
    location?:string,
    createDate:string,
}

export interface Message {
    id:React.Key,    
    uid:string,
    avatar?:string,
    title?:string,
    content?:string,
    read?:boolean,
    msgType:"NOTICE" | "EVENT" | "TODO",
    createDate:string,

}

export interface AreaSales{
    name:string,
    value:number,
    time:string,
    area?:string,
    color?:string
}

export interface AgentTotal{
    pv:number,
    uv:number,
    ip:number,
    time:string
}

export interface Visit {
    id:number,
    uuid:string,
    uid:string,
    ip?:string,
    content?:string,
    device:Device,
    os:OS,
    createDate:string,
}