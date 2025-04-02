import React from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { BiLock, BiUser } from "react-icons/bi";

const LoginPage = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <h2 className="text-center text-6xl font-bold text-blue-600 mb-2">
        Welcome
      </h2>
      <p className="text-center text-gray-600 mb-8">Login with Email</p>

      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input
            prefix={<BiUser />}
            placeholder="this.luck@mail.com"
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            prefix={<BiLock />}
            placeholder="........"
            size="large"
          />
        </Form.Item>

        <div className="flex justify-end mb-6">
          <Link
            to="/forgot-password"
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            Forget your password?
          </Link>
        </div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            LOGIN
          </Button>
        </Form.Item>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-50 text-gray-500">OR</span>
          </div>
        </div>

        <div className="text-center text-sm">
          <span className="text-gray-600">Don't have account? </span>
          <Link
            to="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Register Now
          </Link>
        </div>
      </Form>
    </>
  );
};

export default LoginPage;
