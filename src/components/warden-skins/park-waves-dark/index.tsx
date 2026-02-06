import { defineThemeSkin } from "@adminui-dev/layout"
import { LazyImage } from "@adminui-dev/antd-layout"
import { Grid } from "antd"

const { useBreakpoint } = Grid

const skinBgStyles:React.CSSProperties = {
    position:"absolute",
    inset:"0",
    backgroundColor:"#000105",
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
            <LazyImage style={{...leftStyle,...imgStyles,top:"0px"}} src="/images/skins/park-waves/aside-bg-dark.webp" alt="aisde-bg.webp" />
            <LazyImage style={{...imgStyles,width:"90%",top:"0px",right:"0px"}} src="/images/skins/park-waves/header-bg-dark.webp" alt="header-bg.webp" />
            <LazyImage style={{...imgStyles,height:"80px",bottom:"0px",right:"0px"}} src="/images/skins/park-waves/footer-bg-dark.webp" alt="header-bg.webp" />
        </div>
    )
}
export default defineThemeSkin({
    "name":"parkWavesDark",    
    "skinType":"custom",
    "layoutConfig":{
        "theme":"dark",
        "primaryColor":"#9898ff",
        "noneHeader":false,
        "hideBorder":false,
        "asideBlur":true,
        "headerBlur":true,
        "largeBrand":true,
        "containerBlur":true,
        "menuItemSelectColor":"primary",
    },        
    "logo":"/images/skins/park-waves/app-logo-dark.webp",
    "icon":"/images/skins/park-waves/skin-icon-dark.webp",
    "backgroundContent":<ImageBackground  />
})