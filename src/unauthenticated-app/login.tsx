import React, { FormEvent } from "react";
import styled from "@emotion/styled";
import { Button, Form } from "antd";
import { FormBoxs, FormCard, MyInput } from "./index";
import { OverlayProp } from "./overlay";
import { useAuth } from "../context/auth-context";
import { useAsync } from "./../utils/useAsync";
// TODO:登录页面

export const LoginScreen = ({ isShow, onError, ErrorText }: OverlayProp) => {
  // Context 来共享 login,user
  const { login, user } = useAuth();

  const { run, isLoading } = useAsync();

  // antd 根据表单中  Form.Item 的 name 推断出 要传入的 是username和password
  const handleSubmit = (values: { username: string; password: string }) => {
    // 当注册发送错误时，通过调用catch来触发Error
    run(login(values).catch(onError));
  };

  return (
    <FormBoxs>
      <Form onFinish={handleSubmit}>
        <LoginForm className={isShow ? "none" : "LoginForm"}>
          <FormCard>
            <h2 style={{ color: "#257b5e" }}>LOGIN</h2>
            <div style={{ color: "#ff4d4f" }}>{ErrorText}</div>
            <MyDivider />
            <Form.Item
              name={"username"}
              rules={[{ required: true, message: "请输入用户名" }]}
            >
              <MyInput placeholder={"用户名"} type="text" id={"username"} />
            </Form.Item>
            <Form.Item
              name={"password"}
              rules={[{ required: true, message: "请输入密码" }]}
            >
              <MyInput placeholder={"密码"} type="password" id={"password"} />
            </Form.Item>
            <MyButton loading={isLoading} htmlType={"submit"} type={"primary"}>
              登陆
            </MyButton>
          </FormCard>
        </LoginForm>
      </Form>
    </FormBoxs>
  );
};
export const LoginForm = styled.div`
  z-index: 1;
  width: 100%;
  margin-top: 10rem;
  transform: translateX(10%);
  transition: all 1s ease-in-out;
`;
export const MyButton = styled(Button)`
  text-align: center;
  border-radius: 12rem;
  height: 5rem;
  width: 12rem;
  transition: all 1ms ease-in;
`;

export const MyDivider = styled.div`
  margin: 3rem 0;
  height: 1px;
  width: 100%;
  background: #257b5e;
`;
