import { Button, Flex, Popover,theme } from "antd"
import { useConfigAction, useConfigState } from "@adminui-dev/antd-layout"
import { Languages } from "lucide-react"
import { useState } from "react"
const {useToken} = theme


/**
 * header toolbar button - demo
 * To maintain a consistent style, it is recommended to use antd's button component
 * @returns 
 */
function LanguageButton(){
    const {locale,languages} = useConfigState()
    const {setLocale} = useConfigAction()
    const [open,setOpen] = useState<boolean>(false)
    const {token} = useToken()
    const onChangeLanguage=(value:string)=>{
        setOpen(false)
        setLocale(value)
    }

    // language list
    let buttons:React.ReactNode[] =[]
    let currentLanguage = languages[0]
    languages.forEach((item,index)=>{
        let btnStyle:React.CSSProperties = {
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            width:"100%"
        }
        if(locale == item.locale){
            currentLanguage = item
            btnStyle = { ...btnStyle,backgroundColor:token.colorBgLayout}
        }
        buttons.push(<Button block  key={index} type="text" onClick={()=>{onChangeLanguage(item.locale)}} style={btnStyle} >{item.name}<span>{item.flag}</span></Button>)
    })

    const popoverContent = (
        <Flex align="center" orientation="vertical">
            {buttons}
        </Flex>
    )

    return(
        <Popover open={open} onOpenChange={setOpen} placement="bottomLeft" content={popoverContent}>
            <Button title={currentLanguage.name} type="text" icon={<Languages size={14} />}></Button>
        </Popover>
        
    )

}
export { LanguageButton }