import React, { useEffect, useState } from "react";
import { PageHero } from "../../components/style";
import { Button, Form, Input, Select } from "antd";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { WriteEditor, WriteForm } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { communityPostRequestAction } from "../../reducers/community";
import AppLayout from "../../components/AppLayout";
import { categoryGetRequestAction } from "../../reducers/category";
import UploadAdapter from "../../api/UploadAdapter";

const URL = "/upload";

function CustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new UploadAdapter(loader, URL);
  };
}
const Write = () => {
  const [content, setContet] = useState("");

  const dispatch = useDispatch();

  const { categoryList } = useSelector((state) => state.category);

  const config = {
    extraPlugins: [CustomUploadAdapterPlugin],
  };

  useEffect(() => {
    dispatch(categoryGetRequestAction());
  }, []);

  const onSubmit = (values) => {
    const data = { ...values, content };
    dispatch(communityPostRequestAction(data));
  };

  const { communityPostLoading } = useSelector((state) => state.community);

  return (
    <>
      <AppLayout>
        <PageHero>
          <h2>글쓰기</h2>
        </PageHero>

        {/* Form */}
        <WriteForm onFinish={onSubmit}>
          {/* 인풋박스 */}
          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                message: "Please Input Title!!",
                type: "string",
              },
            ]}
          >
            <Input placeholder="제목 쓰기" />
          </Form.Item>

          {/* 셀렉터 */}
          <Form.Item
            name="categoryId"
            rules={[
              {
                required: true,
                message: "Please Input categoryId!!",
                type: "number",
              },
            ]}
          >
            <Select name="categoryId" placeholder="카테고리 고르기">
              {categoryList.map((list) => (
                <>
                  <Select.Option value={list.id}>
                    {"# " + list.title}
                  </Select.Option>
                </>
              ))}
            </Select>
          </Form.Item>

          <WriteEditor
            editor={ClassicEditor}
            config={config}
            onChange={(event, editor) => {
              const data = editor.getData();
              setContet(data);
            }}
          />
          <Button
            type="primary"
            htmlType="submit"
            loading={communityPostLoading}
          >
            Submit
          </Button>
        </WriteForm>
      </AppLayout>
    </>
  );
};
export default Write;
