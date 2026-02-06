import { LazyImage, useBlurStyles, useConfigState, useTheme } from "@adminui-dev/antd-layout"
import { Carousel,Grid, theme as antdTheme } from "antd"

const {useToken} = antdTheme
const { useBreakpoint } = Grid
type LayoutSize = "small" | "middle" | "large"

interface LoginProps {
    layoutSize?:LayoutSize,
    children?:React.ReactNode
}
const appStyle:React.CSSProperties = {
    width:"100%",
    height:"100%",
    minWidth:"100vw",
    minHeight:"100vh",
    overflow:"hidden"
}


const frameStyle:React.CSSProperties = {
    position:"absolute",
    zIndex:"1",
    inset:"0",
    display:"flex",
    flexFlow:"column",
    justifyContent:"center",
    alignItems:"center",
}

const frameLeft:React.CSSProperties = {
    width:"500px",
    borderRadius:"10px",
    backgroundClip: "border-box",
    backgroundSize: "cover",
    overflow: "hidden",
}
const frameRight:React.CSSProperties = {
    flex:"1",
    display:"flex",
    flexFlow:"column",
    justifyContent:"center",
    alignItems:"center",
    padding:"1rem"
}
const imgStyles:React.CSSProperties = {
    position:"absolute",
    transition:"width 0.3s, height 0.3s, opaticy 0.3s"
}

const formTItle:React.CSSProperties = {
    textAlign:"center",
    display:"flex",
    flexFlow:"column",
    justifyContent:"center",
    alignItems:"center"
}


export default function AppLogin(props:LoginProps){
    const { children }  = props
    const { token } = useToken()
    const theme = useTheme()
    const { layoutConfig } = useConfigState()
    const { md } = useBreakpoint()
    const { brandInfo } = layoutConfig    
    const bgColor = theme == "dark" ? "#000105" : "#dae4ea"
    const backStyle:React.CSSProperties = {
        position:"absolute",
        inset:"0",
        zIndex:"-1",
        backgroundColor:bgColor,
    }
    const cardStyles = useBlurStyles(token.colorBgContainer)
    const frameFrom:React.CSSProperties = {
        ...cardStyles,
        width:"80%",
        maxWidth:"1000px",
        minHeight:"0px",
        display:"flex",
        alignItems:"stretch",
        padding:token.padding,
        borderRadius:"16px",
        border:`solid 1px ${token.colorBorderSecondary}`
    }

    let logoElement:React.ReactNode = <></>
    if(brandInfo?.logo){
        if(typeof brandInfo.logo == "string"){
            logoElement = <LazyImage style={{ width:60,minWidth:60}} src={brandInfo.logo} alt={brandInfo.name} />
        }else{
            logoElement = brandInfo.logo
        }
    }

    const bgSrc = theme == "dark" ? "/images/skins/park-waves/skin-login-dark.webp" : "/images/skins/park-waves/skin-login-light.webp"
    const carouselSrcs = ["/images/login-screen-1.webp","/images/login-screen-2.webp","/images/login-screen-3.webp"] 

    const formLeftPanel = md ? (<div style={frameLeft}>
                        <Carousel autoplay fade>
                            <LazyImage src={carouselSrcs[0]} alt="Carousel-1" />
                            <LazyImage src={carouselSrcs[1]} alt="Carousel-2" />
                            <LazyImage src={carouselSrcs[2]}alt="Carousel-3" />
                        </Carousel>
                    </div>) : <></>

    return(
        <div style={appStyle}>
            <div style={backStyle}>
                <LazyImage hasChild style={{...imgStyles,maxWidth:"1200px",width:"100%",top:"50%",left:"50%",transform:"translate(-50%, -50%)"}} src={bgSrc} alt="skin-login.webp" />
            </div>
            <div style={frameStyle}>                
                <div style={frameFrom}>
                    {formLeftPanel}
                    <div style={frameRight}>    
                        <div style={formTItle}>
                            <a href={brandInfo?.url}>{logoElement}</a>
                            <h3 style={{marginBlockStart:"0.6rem",marginBlockEnd:"0.1rem"}}>{brandInfo?.name}</h3>
                            <span style={{marginBlockEnd:"1rem",color:token.colorTextSecondary}}>{brandInfo?.title}</span>                            
                        </div>                    
                        {children}     
                    </div>
                </div>
            </div>
        </div>
    )
}