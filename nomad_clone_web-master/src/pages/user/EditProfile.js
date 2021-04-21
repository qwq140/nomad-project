import { UploadOutlined } from "@ant-design/icons";
import { Input, Form, Button, Upload } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import AppLayout from "../../components/AppLayout";
import {
  dashBoardGetRequestAction,
  profilePostRequestAction,
} from "../../reducers/dashboard";
import { namePutRequestAction } from "../../reducers/user";
import {
  AccountInfromation,
  AccountInfromationCol,
  AccountInfromationColInput,
  AccountInputBox,
  EditProfileContainer,
  EmailInputBox,
  NameInputBox,
} from "./style";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const ImageUpload = styled(Upload)`
  display: flex;
  flex-direction: column-reverse;
  .ant-upload-list {
    width: 300px;
    margin-bottom: 5px;
  }
  .ant-upload-list-picture {
    .ant-upload-list-item {
      height: inherit;
    }
    .ant-upload-list-item-thumbnail {
      width: 200px;
      height: 200px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .ant-upload-span {
    flex-direction: column;
    text-align: center;
  }
`;

export default function EditProfile({ match }) {
  const initial = { username: "", name: "", email: "" };

  const userId = match.params.id;
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { dashBoardItem } = useSelector((state) => state.dashboard);

  useEffect(() => {
    console.log("유즈이펙트 발동?");
    dispatch(dashBoardGetRequestAction(userId));
    form.setFieldsValue({ username: dashBoardItem.username });
    form.setFieldsValue({ name: dashBoardItem.name });
    form.setFieldsValue({ email: dashBoardItem.email });
  }, []);

  const onSubmitName = (values) => {
    // const data = { ...values, userId };
    values.id = userId;
    console.log("post데이터는?", values);
    dispatch(namePutRequestAction(values));
  };

  const [fileList, setFileList] = useState(null);
  const handleBefore = useCallback((file) => {
    setFileList(file);
    return false;
  }, []);

  const onSubmitProfile = (values) => {
    values.file = fileList;
    values.id = userId;
    dispatch(profilePostRequestAction(values));
  };
  return (
    <>
      <AppLayout>
        <EditProfileContainer>
          {/* 어카운트정보박스 */}
          <AccountInfromation>
            <AccountInfromationCol span={8}>
              <h2>Account Infromation</h2>
            </AccountInfromationCol>

            {/* 언카운트 정보박스 오른쪽 */}
            <AccountInfromationColInput span={16}>
              <Form
                className="ant-form-vertical"
                form={form}
                initialValues={initial}
                onFinish={onSubmitName}
              >
                <AccountInputBox>
                  <EmailInputBox>
                    <input
                      type="text"
                      value={
                        dashBoardItem !== null ? dashBoardItem.username : null
                      }
                      readOnly="readOnly"
                    />
                    <Form.Item name="id">
                      <Input type="hidden" />
                    </Form.Item>
                  </EmailInputBox>
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please Input name!!",
                        type: "string",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </AccountInputBox>
                <Form.Item className="AccountUpdate">
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </AccountInfromationColInput>
          </AccountInfromation>

          {/* 메일박스 */}
          <AccountInfromation>
            <AccountInfromationCol span={8}>
              <h2>Email</h2>
            </AccountInfromationCol>
            <AccountInfromationColInput span={16}>
              <NameInputBox>
                <input
                  type="text"
                  value={dashBoardItem !== null ? dashBoardItem.email : null}
                  readOnly="readOnly"
                />
              </NameInputBox>
            </AccountInfromationColInput>
          </AccountInfromation>
          {/* 프로필박스 */}
          <AccountInfromation>
            <AccountInfromationCol span={8}>
              <h2>Profile</h2>
            </AccountInfromationCol>
            <AccountInfromationColInput span={16}>
              <Form
                initialValues={{ isFilter: false }}
                onFinish={onSubmitProfile}
              >
                <Form.Item
                  name="file"
                  label="프로필"
                  rules={[{ required: true, message: "프로필을 해주세요!" }]}
                >
                  <ImageUpload
                    name="file"
                    listType="picture"
                    maxCount={1}
                    onPreview={() => false}
                    beforeUpload={handleBefore}
                  >
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </ImageUpload>
                </Form.Item>
                <Form.Item name="id">
                  <Input type="hidden" />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 12, offset: 3 }}>
                  <Button type="primary" htmlType="submit">
                    등록
                  </Button>
                </Form.Item>
              </Form>
            </AccountInfromationColInput>
          </AccountInfromation>
        </EditProfileContainer>
      </AppLayout>
    </>
  );
}
