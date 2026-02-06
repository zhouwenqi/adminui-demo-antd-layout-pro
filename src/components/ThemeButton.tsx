import { Button, Flex, Popover,theme } from "antd"
import { useConfigAction, useConfigState, type Theme } from "@adminui-dev/antd-layout"
import { Sun,Moon,SunMoon } from "lucide-react"
import { useIntl } from "react-intl"
import { useState } from "react"

const { useToken } = theme

interface ThemeData {
    value:Theme,
    icon:React.ReactNode,
    label:string
}
/**
 * header toolbar button - theme
 * To maintain a consistent style, it is recommended to use antd's button component
 * @returns 
 */
function ThemeButton(){
    const { layoutConfig } = useConfigState()
    const { setLayoutConfig } = useConfigAction()
    const [open,setOpen] = useState<boolean>(false)
    const intl = useIntl()
    const {token} = useToken()
  
    const onChangeTheme=(data:ThemeData)=>{        
        setOpen(false)
        setLayoutConfig({...layoutConfig,theme:data.value})
    }

    const themeOptions:ThemeData[] = [
        { value: 'light', icon: <Sun size={16} />,label:intl.formatMessage({id:"setting.theme.light"})},
        { value: 'dark', icon: <Moon size={16} />,label:intl.formatMessage({id:"setting.theme.dark"})},
        { value: 'system', icon:<SunMoon size={16} />,label:intl.formatMessage({id:"setting.theme.system"})}
    ]

    let buttons:React.ReactNode[]=[]
    let currentTheme = themeOptions[0]
    themeOptions.forEach((item,index)=>{
        let btnStyle:React.CSSProperties = {
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            width:"100%"
        }
        if(layoutConfig.theme == item.value){
            currentTheme = item
            btnStyle = {...btnStyle, backgroundColor:token.colorBgLayout}
        }
        buttons.push(<Button iconPlacement="end" key={index} type="text" icon={item.icon} onClick={()=>{onChangeTheme(item)}} style={btnStyle} >{item.label}</Button>)
        
    })

    const popoverContent = (
        <Flex align="center" orientation="vertical">
            {buttons}
        </Flex>
    )

    if(layoutConfig.skinName){
        return <></>
    }
       
    return(
        <Popover open={open} onOpenChange={setOpen} placement="bottomLeft" content={popoverContent}>
            <Button title={currentTheme.label} type="text" icon={currentTheme.icon}></Button>
        </Popover>
        
    )
}


export {ThemeButton}