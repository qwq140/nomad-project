import { Form, Input, Checkbox } from "antd";
import React from "react";
import { JoinContainer, SubmitButton } from "./style";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Join = () => {
  return (
    <>
      <JoinContainer>
        <h2>Join Nomad Corders</h2>
        <div>
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Name"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                  type: "string",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email address"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                  type: "string",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                  type: "string",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                  type: "string",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>
                <span>
                  I agree to the Terms & Conditions and Privacy Policy
                </span>
              </Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <SubmitButton type="primary" htmlType="submit">
                Submit
              </SubmitButton>
            </Form.Item>
          </Form>
        </div>
      </JoinContainer>
    </>
  );
};

export default Join;
