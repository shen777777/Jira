import React, { FormEvent } from "react";
import { useAuth } from "../../context/auth-context";
import { login } from "./../../auth-provider";

const apiUrl = process.env.REACT_APP_API_URL;

export const LoginScreen = () => {
  // Context 来共享 login,user
  const { login, register, user } = useAuth();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    //阻止表单默认提交
    event.preventDefault();
    //获取填写的表单的数据
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    login({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      {user ? <div>登陆成功，用户名{user?.name}</div> : null}
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id={"username"} />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id={"password"} />
      </div>
      <button type={"submit"}>登陆</button>
    </form>
  );
};
