import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { WriteEditor, WriteForm } from "../../community/style";
import { AdminFaqContainer } from "./style";
import { useDispatch, useSelector } from "react-redux";
import {
  faqGetRequestAction,
  faqPostRequestAction,
} from "../../../reducers/faq";
import AppLayout from "../../../components/AppLayout";
import UploadAdapter from "../../../api/UploadAdapter";
import { useLocation } from "react-router";

const URL = "/upload";

function CustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new UploadAdapter(loader, URL);
  };
}

const FaqWrite = ({ history }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [form] = Form.useForm();
  const { faqList, faqPostLoading } = useSelector((state) => state.faq);
  const config = {
    extraPlugins: [CustomUploadAdapterPlugin],
  };
  const { principal, loadMyInfoExcution } = useSelector((state) => state.user);
  useEffect(() => {
    if (loadMyInfoExcution) {
      if (principal === null) {
        alert("로그인 후 이용이 가능합니다.");
        history.push("/login");
      } else {
        if (pathname.includes("/admin")) {
          if (principal.roles !== "ROLE_ADMIN") {
            alert("접근권한이 없습니다. \n 관리자에게 문의해주세요!");
            history.push("/");
          }
        }
      }
    }
  }, [pathname, loadMyInfoExcution]);

  useEffect(() => {
    dispatch(faqGetRequestAction());
  }, []);

  const onSubmit = (values) => {
    dispatch(faqPostRequestAction(values));
  };

  return (
    <>
      <AppLayout>
        <AdminFaqContainer>
          <WriteForm onFinish={onSubmit} form={form}>
            {/* 셀렉터 */}
            <Form.Item name="categoryId">
              <Select name="categoryId" placeholder="카테고리 고르기">
                {faqList.map((list) => (
                  <Select.Option value={list.id}>{list.title}</Select.Option>
                ))}
              </Select>
            </Form.Item>

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
              <Input placeholder="제목" />
            </Form.Item>

            <Form.Item
              name="content"
              rules={[
                {
                  required: true,
                  message: "Please Input Content!!",
                  type: "string",
                },
              ]}
            >
              <WriteEditor
                config={config}
                editor={ClassicEditor}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  form.setFieldsValue({ content: data });
                }}
              />
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={faqPostLoading}>
              Submit
            </Button>
          </WriteForm>
        </AdminFaqContainer>
      </AppLayout>
    </>
  );
};

export default FaqWrite;
