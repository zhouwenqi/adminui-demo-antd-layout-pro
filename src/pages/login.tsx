import AppLogin from "@/components/AppLogin";
import type { FormProps } from 'antd'
import { Button, Checkbox, Divider, Form, Input } from 'antd'
import { Key, User } from "lucide-react";
import { useIntl } from "react-intl";
import { useNavigate } from 'react-router'

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
}

export default  function Login(){
    const navigate = useNavigate()
    const intl = useIntl()

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
        navigate("/")
    }

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }
    return(
        <AppLogin>
            <Form
                style={{width:"70%",minWidth:"160px"}}
                name="loginForm"
                initialValues={{ remember: true, layout:"vertical"}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                name="username"
                rules={[{ required: true, message: intl.formatMessage({id:"login.input.username.rule"}) }]}
                >
                <Input prefix={<User size={16} />} />
                </Form.Item>
                    <Form.Item<FieldType>
                    name="password"
                    rules={[{ required: true, message: intl.formatMessage({id:"login.input.password.rule"}) }]}
                    >
                    <Input.Password prefix={<Key size={16} />} />
                </Form.Item>
                    <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
                    <Checkbox>{ intl.formatMessage({id:"login.input.rememberme.label"})}</Checkbox>
                </Form.Item>
                <Form.Item label={null} style={{paddingBlockEnd:"0px",marginBlockEnd:"0px"}}>                
                    <Button block type="primary" htmlType="submit" className="primary-button">
                        { intl.formatMessage({id:"login.button.login"}) }
                    </Button>
                    <Divider>or</Divider>
                    <Button block>
                        { intl.formatMessage({id:"login.button.register"}) }
                    </Button>
                </Form.Item>
            </Form>
        </AppLogin>
    )
}