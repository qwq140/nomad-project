import { UploadOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { techPostRequestAction } from "../reducers/admin/tech";
import { ButtonRightModalForm, ImageUpload } from "./style";

const AdminTechBtn = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fileList, setFileList] = useState();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { techPostDone } = useSelector((state) => state.admintech);

  useEffect(() => {
    if (techPostDone) {
      handleCancel();
    }
  }, [techPostDone]);

  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
    setFileList(null);
    form.setFieldsValue({ file: null, title: "", isFilter: false });
    // document.querySelector(".ant-upload-list").innerText = "";
  }, [form]);

  const handleBefore = useCallback((file) => {
    setFileList(file);
    return false;
  }, []);

  const onFinish = (values) => {
    values.file = fileList;
    dispatch(techPostRequestAction(values));
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Tech등록하기!
      </Button>
      <Modal
        title="Tech 등록하기"
        footer={null}
        closable={false}
        maskClosable={false}
        visible={isModalVisible}
      >
        <ButtonRightModalForm
          onFinish={onFinish}
          form={form}
          initialValues={{ isFilter: false }}
        >
          <Form.Item
            name="file"
            label="이미지"
            rules={[{ required: true, message: "이미지를 해주세요!" }]}
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
          <Form.Item
            label="제목"
            name="title"
            rules={[
              {
                required: true,
                message: "제목을 입력해주세요!",
                type: "string",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="isFilter"
            label="필터사용여부"
            valuePropName="checked"
          >
            <Checkbox></Checkbox>
          </Form.Item>

          <Form.Item>
            <Button htmlType="button" onClick={handleCancel}>
              취소
            </Button>
            <Button type="primary" htmlType="submit">
              저장
            </Button>
          </Form.Item>
        </ButtonRightModalForm>
      </Modal>
    </>
  );
};

export default AdminTechBtn;
