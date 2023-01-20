import { default as React, useState } from "react";
import style from "./style.module.scss";
import { Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../redux/actions";
import { Redirect } from "react-router";

function LoginPage() {
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    await dispatch(loginThunk({ username, password }));
  };

  if (loggedIn) {
    return <Redirect to="/i-projects" />;
  }

  return (
    <div className={style.loginContainer}>
      <Form
        className={style.loginForm}
        initialValues={{
          remember: true,
        }}
        onFinish={login}
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
            onChange={(e) => {
              setUsername(e.target.value);
            }}
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
            onChange={(e) => {
              setPassword(e.target.value);
            }}
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
            loading={loading}
          >
            Log in
          </Button>
          {/* Or <a href="">register now!</a> */}
        </Form.Item>
      </Form>
      {error && <span style={{ color: "red" }}>Credenziali errate</span>}
    </div>
  );
}

export default LoginPage;
