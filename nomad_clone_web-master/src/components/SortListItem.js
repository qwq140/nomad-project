import React, { memo, useCallback, useState } from "react";

import { sortableElement, sortableHandle } from "react-sortable-hoc";
import {
  DeleteOutlined,
  MenuOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  List,
  Modal,
  Space,
  Upload,
} from "antd";
import { ModalForm } from "../pages/admin/video/style";
import { useDispatch, useSelector } from "react-redux";
import tus from "tus-js-client";
import axios from "axios";
import {
  videoContentsItemListSaveAction,
  videoContentsItemListDeleteAction,
} from "../reducers/admin/video";

const DragHandle = sortableHandle(() => <MenuOutlined />);

const SortListItem = memo(({ collection, index, list }) => {
  const dispatch = useDispatch();
  const { videoContent } = useSelector((state) => state.adminVideo);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [uploading, setUploading] = useState(false);
  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
  }, []);
  const onFinish = useCallback(
    (values) => {
      const formData = form.getFieldsValue();
      delete formData.video;
      const data = {
        collection: collection,
        index: index,
        data: formData,
      };
      dispatch(videoContentsItemListSaveAction(data));
      handleCancel();
    },
    [collection, dispatch, form, handleCancel, index]
  );

  const SortableItem = sortableElement(({ text }) => (
    <List.Item>
      <Space>
        <DragHandle />
        {text}
      </Space>
      <Space>
        <Button
          size="small"
          danger
          icon={<DeleteOutlined />}
          onClick={removeList}
        ></Button>
        {!list.vimeoId ? (
          <Button size="small" onClick={showModal}>
            영상등록하기
          </Button>
        ) : null}
      </Space>
    </List.Item>
  ));

  const handleRemove = useCallback(async () => {
    // vimeo 영상 저장 삭제
    const vimeoId = form.getFieldValue("vimeoId");

    await axios({
      method: "delete",
      url: `https://api.vimeo.com/videos/${vimeoId}`,
      headers: {
        Accept: "application/vnd.vimeo.*+json;version=3.4",
        Authorization: `bearer ${process.env.REACT_APP_VIMEO_ACCESS_TOKEN}`,
        "Content-Type": "application/x-www-form-urlencode",
      },
    });
    form.setFieldsValue({ vimeoId: "" });
  }, [form]);
  const handleMove = useCallback(async (vimeoId) => {
    // 영상 폴더 이동
    const forderId = videoContent.vimeoFolderId;
    await axios({
      method: "put",
      url: `https://api.vimeo.com/me/projects/${forderId}/videos/${vimeoId}`,
      headers: {
        Accept: "application/vnd.vimeo.*+json;version=3.4",
        Authorization: `bearer ${process.env.REACT_APP_VIMEO_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
  }, []);

  const handleRequest = useCallback(
    // vimeo 영상 저장
    async (eventObject) => {
      setUploading(true);
      const file = eventObject.file;
      const fileSize = file.size.toString();

      const response = await axios({
        method: "post",
        url: `https://api.vimeo.com/me/videos`,
        headers: {
          Accept: "application/vnd.vimeo.*+json;version=3.4",
          Authorization: `bearer ${process.env.REACT_APP_VIMEO_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        data: {
          name: form.getFieldValue("title"),
          privacy: {
            download: false,
            embed: "whitelist",
            view: "disable",
          },
          upload: {
            approach: "tus",
            size: fileSize,
          },
        },
      });
      let vimeoId = response.data.uri.split("/");
      vimeoId = vimeoId[vimeoId.length - 1];
      form.setFieldsValue({ vimeoId: vimeoId });
      // Create a new tus upload
      const upload = new tus.Upload(file, {
        endPoint: "https://api.vimeo.com/me/videos",
        uploadUrl: response.data.upload.upload_link,
        retryDelays: [0, 3000, 5000, 10000, 20000],
        metadata: {
          filename: file.name,
          filetype: file.type,
        },
        headers: {},
        onError: function (error) {
          eventObject.onError("Upload Error!!");
        },
        onProgress: function (bytesUploaded, bytesTotal) {
          let percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
          eventObject.onProgress({ percent: percentage });
        },
        onSuccess: function () {
          eventObject.onSuccess("Uploaded!!");
          handleMove(vimeoId);
          setUploading(false);
        },
      });
      upload.start();
    },
    [form, handleMove]
  );

  const removeList = useCallback(() => {
    const vimeoId = form.getFieldValue("vimeoId");
    if (vimeoId !== "") {
      handleRemove();
    }
    const data = {
      collection: collection,
      index: index,
    };
    dispatch(videoContentsItemListDeleteAction(data));
  }, [collection, dispatch, form, handleRemove, index]);

  return (
    <>
      <SortableItem
        key={`list ${index}`}
        text={videoContent.contents[collection].list[index].title}
        collection={collection}
        index={index}
      />
      <Modal
        title="Regist Curriculum Video"
        footer={null}
        closable={false}
        maskClosable={false}
        visible={isModalVisible}
      >
        <ModalForm
          onFinish={onFinish}
          form={form}
          initialValues={{
            title: list.title,
            isFree: list.isFree,
            vimeoId: list.vimeoId,
          }}
        >
          <Form.Item className="form_hidden" name="vimeoId"></Form.Item>
          <Form.Item label="비디오" name="video">
            <Upload
              maxCount={1}
              customRequest={handleRequest}
              accept="video/*"
              onRemove={handleRemove}
            >
              <Button icon={<UploadOutlined />}>
                Click to Upload Video(Max: 1)
              </Button>
            </Upload>
          </Form.Item>
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
          <Form.Item label="무료 공개" name="isFree" valuePropName="checked">
            <Checkbox></Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="button"
              onClick={handleCancel}
              loading={uploading}
            >
              취소
            </Button>
            <Button type="primary" htmlType="submit" loading={uploading}>
              저장
            </Button>
          </Form.Item>
        </ModalForm>
      </Modal>
    </>
  );
});

export default SortListItem;
