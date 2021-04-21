import { Button, Form, Input, Modal } from "antd";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ButtonRightModalForm } from "./style";

const CategoryBtn = memo(({ action, done, loading }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
    form.setFieldsValue({ title: "" });
  }, []);
  const onFinish = useCallback((values) => {
    dispatch(action(values));
  }, []);

  useEffect(() => {
    if (done) {
      handleCancel();
    }
  }, [done]);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        카테고리 등록하기!
      </Button>
      <Modal
        title="카테고리 등록하기"
        footer={null}
        closable={false}
        maskClosable={false}
        visible={isModalVisible}
      >
        <ButtonRightModalForm onFinish={onFinish} form={form}>
          <Form.Item
            label="카테고리 명"
            name="title"
            rules={[
              {
                required: true,
                message: "카테고리명을 입력해주세요.",
                type: "string",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button htmlType="button" onClick={handleCancel} loading={loading}>
              취소
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              저장
            </Button>
          </Form.Item>
        </ButtonRightModalForm>
      </Modal>
    </>
  );
});

export default CategoryBtn;
