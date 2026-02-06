import { Result,Button,Flex } from "antd";

export default function NotFound(){
    return(
        <Flex style={{width:"100vw",height:"100vh"}} align="center" justify="center">        
        <Result
            status="404"
            title="404"
            subTitle="Oops! the page you visited does not exist."
            extra={<Button type="primary" onClick={()=>{history.back()}}>Back</Button>}
        />
        </Flex>
    )
}