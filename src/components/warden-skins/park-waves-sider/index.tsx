import { defineThemeSkin } from "@adminui-dev/layout"
import { LazyImage } from "@adminui-dev/antd-layout"
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
            <LazyImage style={{...leftStyle,...imgStyles,top:"0px"}} src="/images/skins/park-waves/aside-bg-sider.webp" alt="aisde-bg.webp" />
            <LazyImage style={{...imgStyles,width:"90%",top:"0px",right:"0px"}} src="/images/skins/park-waves/header-bg-light.webp" alt="header-bg.webp" />
            <LazyImage style={{...imgStyles,height:"80px",bottom:"0px",right:"0px"}} src="/images/skins/park-waves/footer-bg-light.webp" alt="header-bg.webp" />
        </div>
    )
}
export default defineThemeSkin({
    "name":"parkWavesSider",    
    "skinType":"custom",
    "layoutConfig":{
        "theme":"light",
        "layoutType":"leftMenu",
        "asideMenuInline":false,
        "asideMenuGroup":true,
        "hideBorder":true,
        "splitMenu":false,        
        "primaryColor":"#4a3a88",
        "containerMargin":12,
        "menuIconSize":16,
        "noneHeader":true,
        "asideBlur":false,
        "asideTransparent":true,
        "largeBrand":true,
        "containerBlur":true,        
        "collapsedPosition":"top",
        "visibleBreadcrumbIcon":"all",
        "menuItemSelectColor":"default",
    },        
    "logo":"/images/skins/park-waves/app-logo-light.webp",
    "icon":"/images/skins/park-waves/skin-icon-sider.webp",
    "backgroundContent":<ImageBackground  />
})