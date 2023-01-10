import { default as React } from "react";
import style from "./style.module.scss";
import { Button, Card, Col, Form, Input, Row } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

function LoginPage() {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className={style.loginContainer}>
      <Form
        name="normal_login"
        className={style.loginForm}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Inserisci l'username",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Inserisci la password",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            {/* <Checkbox>Remember me</Checkbox> */}
          </Form.Item>

          <a className={style.loginFormForgot} href="">
            Password dimenticata
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={style.loginFormButton}
          >
            Log in
          </Button>
          {/* Or <a href="">register now!</a> */}
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginPage;
