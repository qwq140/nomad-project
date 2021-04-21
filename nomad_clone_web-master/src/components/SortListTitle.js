import { DeleteOutlined } from "@ant-design/icons";
import { Button, Form, Input, List, Modal, Space } from "antd";
import React, { memo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ModalForm } from "../pages/admin/video/style";
import {
  videoContentsItemListTitleSaveAction,
  videoContentsListDeleteAction,
} from "../reducers/admin/video";

const SortListTitle = memo(({ index, text }) => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { videoContent } = useSelector((state) => state.adminVideo);
  const [form] = Form.useForm();

  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
    form.setFieldsValue({ title: "" });
  }, [form]);
  const onFinish = useCallback(() => {
    const data = {
      index: index,
      title: form.getFieldValue("title"),
    };
    dispatch(videoContentsItemListTitleSaveAction(data));
    handleCancel();
  }, [dispatch, form, handleCancel, index]);
  const removeTitle = () => {
    if (videoContent.contents[index].list.length === 0) {
      dispatch(videoContentsListDeleteAction(index));
    } else {
      alert("하위에 있는 데이터를 모두 삭제해주세요!!");
    }
  };
  return (
    <>
      <List.Item key={`title ${index}`} index={index}>
        <strong>{text}</strong>
        <Space>
          <Button
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={removeTitle}
          ></Button>
          <Button primary size="small" onClick={showModal}>
            영상 리스트 추가
          </Button>
        </Space>
      </List.Item>
      <Modal
        title="Regist Curriculum Contents List"
        footer={null}
        closable={false}
        maskClosable={false}
        visible={isModalVisible}
      >
        <ModalForm onFinish={onFinish} form={form}>
          <Form.Item
            label="제목"
            name="title"
            rules={[
              {
                required: true,
                message: "제목을 입력해주세요.",
                type: "string",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button htmlType="button" onClick={handleCancel}>
              취소
            </Button>
            <Button type="primary" htmlType="submit">
              저장
            </Button>
          </Form.Item>
        </ModalForm>
      </Modal>
    </>
  );
});

export default SortListTitle;
