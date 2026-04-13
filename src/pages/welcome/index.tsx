import { Col, theme, Row } from "antd"
import { GridPanel, LogsPanel, PaymentChannelPanel, ProjectPanel, WelcomeHeaderPanel } from "./components"
import styles from "./index.module.css"
import { useConfigState } from "@adminui-dev/antd-layout"
const {useToken} = theme

/**
 * Webcome - page
 * @returns 
 */
export default function(){  
    const  {token} = useToken()
    const { layoutConfig } = useConfigState()
    const rowStyle:React.CSSProperties = {
      padding: layoutConfig.noneHeader ? `${token.paddingXS}px ${token.paddingXS}px ${token.paddingXS}px 0px` : token.paddingXS,
      marginLeft: layoutConfig.noneHeader ? `-${token.paddingXS}px` : "0px"
    }
    return(
        <>
        <div className={styles.box}>
            <WelcomeHeaderPanel />
        </div>
        <Row style={rowStyle}>
          <Col 
              xs={24}
              sm={24}
              md={24}
              lg={14}
              xl={16}>   
            <GridPanel />
            <LogsPanel />
          </Col>
          <Col style={{display:"flex",flexFlow:"column"}}
              xs={24}
              sm={24}
              md={24}
              lg={10}
              xl={8}>
            <ProjectPanel />
            <PaymentChannelPanel />
          </Col>
        </Row>
        </>
    )
}