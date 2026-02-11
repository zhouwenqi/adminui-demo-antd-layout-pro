import { defineThemeSkin } from "@adminui-dev/layout"

const skinBgStyles:React.CSSProperties = {
    position:"absolute",
    inset:"0",
    backgroundColor:"transparent",
}

const ImageBackground=()=>{  
    return (
       <div style={skinBgStyles}>
        </div>
    )
}
export default defineThemeSkin({
    "name":"parkWavesNone",    
    "skinType":"custom",
    "layoutConfig":{
        "theme":"light",
        "layoutType":"leftMenu",
        "asideMenuInline":false,
        "asideMenuGroup":true,
        "hideBorder":true,
        "splitMenu":false,        
        "primaryColor":"#161616",
        "containerMargin":12,
        "menuIconSize":16,
        "noneHeader":true,
        "asideBlur":false,
        "asideTransparent":true,
        "containerBlur":false,
        "hideTitle":true,
        "largeBrand":true,    
        "visibleBreadcrumbIcon":"all",
        "collapsedPosition":"top",
        "menuItemSelectColor":"invert",
    },        
    "logo":"/images/skins/park-waves/app-logo-none.webp",
    "icon":"/images/skins/park-waves/skin-icon-none.webp",
    "backgroundContent":<ImageBackground  />
})