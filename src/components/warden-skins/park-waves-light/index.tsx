import { LazyImage} from "@adminui-dev/antd-layout"
import type { ThemeSkin }  from "@adminui-dev/antd-layout"
import { Grid } from "antd"

const { useBreakpoint } = Grid

const skinBgStyles:React.CSSProperties = {
    position:"absolute",
    inset:"0",
    backgroundColor:"#dae4ea",
}
const imgStyles:React.CSSProperties = {
    position:"absolute",
    transition:"width 0.3s, height 0.3s, opaticy 0.3s"
}
const ImageBackground=()=>{  
    const { xs } = useBreakpoint()
    const leftStyle = xs ? {"height":"100%"} : {"width:":"260px"}    
    return (
       <div style={skinBgStyles}>
            <LazyImage style={{...leftStyle,...imgStyles,top:"0px"}} src="/images/skins/park-waves-light/aside-bg-light.webp" alt="aisde-bg.webp" />
            <LazyImage style={{...imgStyles,width:"90%",top:"0px",right:"0px"}} src="/images/skins/park-waves-light/header-bg-light.webp" alt="header-bg.webp" />
            <LazyImage style={{...imgStyles,height:"80px",bottom:"0px",right:"0px"}} src="/images/skins/park-waves-light/footer-bg-light.webp" alt="header-bg.webp" />
        </div>
    )
}
const skin:ThemeSkin = {
    "name":"parkWavesLight",    
    "skinType":"custom",
    "layoutConfig":{
        "theme":"light",
        "primaryColor":"#4a3a88",
        "noneHeader":false,
        "hideBorder":false,
        "asideBlur":true,
        "headerBlur":true,
        "largeBrand":true,
        "containerBlur":true,
        "menuItemSelectColor":"primary",
    },        
    "logo":"/images/skins/park-waves-light/app-logo-light.webp",
    "icon":"/images/skins/park-waves-light/skin-icon-light.webp",
    "backgroundContent":<ImageBackground  />
}
export default skin