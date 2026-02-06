import WardenLogo from '@/components/WardenLogo';
import { Container, LazyImage, setSkinConfig, useConfigAction, useConfigState } from '@adminui-dev/antd-layout';
import type { LayoutConfig, AvatarPosition, BreadcrumbIconVisible, LayoutType, Position, Theme, ThemeSkin } from '@adminui-dev/antd-layout';
import { ColorPicker, Segmented, Select, Switch, theme } from 'antd';
import { Sun,Moon,SunMoon,LayoutPanelLeft,LayoutPanelTop } from "lucide-react"
import { useIntl } from 'react-intl';

const {useToken} = theme

interface ConfigData {
    title:string,
    element:React.ReactNode
}
const itemStyles:React.CSSProperties = {
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    width:"100%",
    height:"46px",
    minHeight:"46px",
    gap:"10px"
}
const boxStyles:React.CSSProperties = {
    width:"100%",
    padding:"12px"
}
const titleStyles:React.CSSProperties = {
    fontWeight:"600",
    paddingBottom:"8px",
}
const footerStyles:React.CSSProperties = {
    paddingTop:"8px",
    textAlign:"right"
}
const segmentItem:React.CSSProperties = {
    display:"flex",
    alignItems:"center",
    height:"100%"
}

const segmentIcon:React.CSSProperties = {
    display:"flex",
    alignItems:"center",
}

const initConfig:LayoutConfig = {    
    menuIconSize:16,
    layoutType:"leftMenu",
    headerHeight:50,
    asideWidth:260,
    theme:"system",
    asideMenuInline:true,
    hideAsideMenuDataEmpty:true,
    largeBrand:true,
    primaryColor:"#417ffb",
    collapsedPosition:"center",
    brandInfo:{
        logo:<WardenLogo />,
        name:"Warden.vip",
        title:"Web build frameworks"
    },
    userInfo:{
        uid:"Scapegoat",
        title:"zhouwenqi@me.com",
        avatar:"https://api.dicebear.com/9.x/miniavs/svg?seed=8"
    }
}

export default function(){
    const { token } = useToken()
    const intl = useIntl()
    const { setLayoutConfig,setLocale } = useConfigAction()
    const { layoutConfig,languages,locale,themeSkinMap } = useConfigState()

    const themeOptions = [
        { value: 'light', icon: <Sun size={16} />,tooltip:intl.formatMessage({id:"setting.theme.light"})},
        { value: 'dark', icon: <Moon size={16} />,tooltip:intl.formatMessage({id:"setting.theme.dark"})},
        { value: 'system', icon: <SunMoon size={16} />,tooltip:intl.formatMessage({id:"setting.theme.system"})}
    ]

    // skin label locale    
    themeSkinMap["custom"].forEach((item)=>{
        item.label = intl.formatMessage({id:`skin.${item.name}.label`})
    })

    let skinOptions = themeSkinMap["custom"].map(item=>({label:<SkinItem data={item} />,value:item.name,tooltip:item.label}))

    // language list
    let languageOptions:any[] = []
    languages.forEach((item)=>{
        languageOptions.push({
            label:item.name,
            value:item.locale
        })
    })

    // layout type
    const layoutTypes = [
        { value: 'leftMenu', icon:<LayoutPanelLeft size={16} />,tooltip:intl.formatMessage({id:"setting.layout.leftMenu"}) },
        { value: 'headMenu', icon:<LayoutPanelTop size={16} />, tooltip:intl.formatMessage({id:"setting.layout.headMenu"}) }
    ]
        

    // collapsed position
    const collapsedPostions = [
        { value: 'top', label:intl.formatMessage({id:"setting.collapsedPosition.option.top"})},
        { value: 'center', label:intl.formatMessage({id:"setting.collapsedPosition.option.center"}) },
        { value: 'bottom', label:intl.formatMessage({id:"setting.collapsedPosition.option.bottom"})}
    ]

    // avatar position
    const avatarPostions = [
        { value: 'rightTop', label:intl.formatMessage({id:"setting.avatarPosition.option.rightTop"}) },
        { value: 'leftBottom', label:intl.formatMessage({id:"setting.avatarPosition.option.leftBottom"}) },
        { value: 'none', label:intl.formatMessage({id:"setting.avatarPosition.option.none"})}
    ]

    // Breadcrumb icon visible
    const breadcrumbIconOptions = [
        { value: 'none', label:intl.formatMessage({id:"setting.visibleBreadcrumbIcon.option.none"}) },
        { value: 'first', label:intl.formatMessage({id:"setting.visibleBreadcrumbIcon.option.first"}) },
        { value: 'all', label:intl.formatMessage({id:"setting.visibleBreadcrumbIcon.option.all"})}
    ]    

    // change skin
    const onChangeSkin=(e:string)=>{
        if(e){
            const skin = themeSkinMap["custom"].find(item=>item.name==e)
            if(!skin){
                return
            }

            const config = setSkinConfig(layoutConfig,skin)          
            setLayoutConfig({
                ...config,
                skinName:e
            })
        }else{
            setLayoutConfig({               
                ...initConfig,
                layoutType:"leftMenu",
                noneHeader:false,
                hideBorder:false,
                skinName:""
            })
        }
    }

    const onChangeColor=(e:string)=>{
        setLayoutConfig({
            ...layoutConfig,
            noneHeader:false,
            hideBorder:false,
            primaryColor:e,
            skinName:""
        })
    }

    const defaultSkinName = layoutConfig.skinName || undefined

    const isSkin:boolean = Boolean(layoutConfig.skinName)

    const data:ConfigData[]=[
        {title:intl.formatMessage({id:"setting.theme.title"}),element:(<Segmented disabled={isSkin} styles={{label:segmentItem,icon:segmentIcon}} options={themeOptions} defaultValue={layoutConfig.theme} value={layoutConfig.theme} onChange={(e)=>{setLayoutConfig({...layoutConfig,theme: e as Theme})}} />)},
        {title:intl.formatMessage({id:"setting.skin.title"}),element:(<Select defaultValue={defaultSkinName} placeholder={intl.formatMessage({id:"skin.none.label"})} allowClear options={skinOptions} value={defaultSkinName} onChange={onChangeSkin} onClear={()=>{onChangeSkin("")}} />)},
        {title:intl.formatMessage({id:"setting.layout.title"}),element:(<Segmented styles={{label:segmentItem,icon:segmentIcon}} options={layoutTypes} defaultValue={layoutConfig.layoutType} value={layoutConfig.layoutType} onChange={(e)=>{setLayoutConfig({...layoutConfig,layoutType: e as LayoutType})}} />)},
        {title:intl.formatMessage({id:"setting.theme.color"}),element:(<ColorPicker defaultValue={layoutConfig.primaryColor} value={layoutConfig.primaryColor} onChange={(e)=>{onChangeColor(e.toHexString())}} />)},
        {title:intl.formatMessage({id:"setting.language.title"}),element:(<Segmented options={languageOptions} defaultValue={locale} value={locale} onChange={(e)=>setLocale(e)} />)},
        {title:intl.formatMessage({id:"setting.largeBrand.title"}),element:(<Switch defaultChecked={layoutConfig.largeBrand} checked={layoutConfig.largeBrand} onChange={(e)=>{setLayoutConfig({...layoutConfig,largeBrand:e})}} />)},
        {title:intl.formatMessage({id:"setting.asideMenuInline.title"}),element:(<Switch defaultChecked={layoutConfig.asideMenuInline} checked={layoutConfig.asideMenuInline} onChange={(e)=>{setLayoutConfig({...layoutConfig,asideMenuInline:e})}} />)},
        {title:intl.formatMessage({id:"setting.splitMenu.title"}),element:(<Switch defaultChecked={layoutConfig.splitMenu} checked={layoutConfig.splitMenu} onChange={(e)=>{setLayoutConfig({...layoutConfig,splitMenu:e})}} />)},
        {title:intl.formatMessage({id:"setting.flated.title"}),element:(<Switch defaultChecked={layoutConfig.flated} checked={layoutConfig.flated} onChange={(e)=>{setLayoutConfig({...layoutConfig,flated:e})}} />)},
        {title:intl.formatMessage({id:"setting.collapsedPosition.title"}),element:(<Segmented options={collapsedPostions} defaultValue={layoutConfig.collapsedPosition} value={layoutConfig.collapsedPosition} onChange={(e)=>{setLayoutConfig({...layoutConfig,collapsedPosition: e as Position})}} />)},
        {title:intl.formatMessage({id:"setting.avatarPosition.title"}),element:(<Segmented options={avatarPostions} defaultValue={layoutConfig.avatarPosition} value={layoutConfig.avatarPosition} onChange={(e)=>{setLayoutConfig({...layoutConfig,avatarPosition: e as AvatarPosition})}} />)},
        {title:intl.formatMessage({id:"setting.visibleBreadcrumbIcon.title"}),element:(<Segmented options={breadcrumbIconOptions} defaultValue={layoutConfig.visibleBreadcrumbIcon} value={layoutConfig.visibleBreadcrumbIcon} onChange={(e)=>{setLayoutConfig({...layoutConfig,visibleBreadcrumbIcon: e as BreadcrumbIconVisible})}} />)},
    ]    

    let items:React.ReactNode[]=[]
    data.forEach((item,index)=>{
        items.push(<ConfigItem data={item} key={index} style={{borderBottom:`solid 1px ${token.colorBorderSecondary}`}} />)
    })

    return(
        <Container mode='panel'>
            <div style={boxStyles}>
                <div style={{...titleStyles,borderBottom:`solid 1px ${token.colorBorderSecondary}`}}>🗼{intl.formatMessage({id:"settings.list.title"})}</div>
                { items }
                <div style={{...footerStyles,color:token.colorTextSecondary}}>{intl.formatMessage({id:"settings.footer.title"})}<a href='https://github.com/zhouwenqi/adminui-antd-layout' target='_blank'>{intl.formatMessage({id:"global.here"})}</a> </div>
            </div>           
        </Container>
    )
}

function SkinItem(props:{data:ThemeSkin}){
    const { data } = props
    return(
        <div style={{padding:"2px",display:"flex",alignItems:"center",gap:"10px"}}>
            <LazyImage src={ data.icon } style={{width:"16px",borderRadius:"4px"}} /><span>{data.label}</span>
        </div>
    )
}

function ConfigItem(props:{data:ConfigData} & React.HTMLAttributes<HTMLDivElement>){
    const {data} = props
    return(
        <div style={{...itemStyles,...props.style}}>
            <span>{data.title}</span>
            <div>{data.element}</div>
        </div>
    )
}