import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { memo, useCallback, useState } from "react";
import { ImageUpload } from "../../pages/admin/courses/style";

const CircleUpload = memo(({ value = [], onChange }) => {
  const [fileList, setFileList] = useState([]);

  const triggerChange = useCallback(
    (changeValue) => {
      onChange?.(changeValue);
    },
    [onChange]
  );

  const handleRemoveImage = useCallback(
    async (file) => {
      let id = 0;
      for (let i = 0; i < fileList.length; i++) {
        if (fileList[i].uid === file.uid) {
          id = fileList[i].id;
          break;
        }
      }
      try {
        await axios.delete("/upload/" + id, {
          header: { "Content-Type": "multipart/form-data" },
        });
        setFileList(fileList.filter((item) => item.uid !== file.uid));
        triggerChange(fileList.filter((item) => item.uid !== file.uid));
      } catch (error) {}
    },
    [fileList, setFileList, triggerChange]
  );

  const handleUploadImage = useCallback(
    async (options) => {
      const { onSuccess, onError, file } = options;
      const formData = new FormData();
      formData.append("file", file);
      try {
        const result = await axios.post("/upload", formData, {
          header: { "Content-Type": "multipart/form-data" },
        });
        const saveResult = result.data;
        saveResult.uid = file.uid;
        setFileList((prev) => {
          return [...prev, saveResult];
        });
        triggerChange([...fileList, saveResult]);
        onSuccess("Ok");
      } catch {
        onError("Error");
      }
    },
    [setFileList, triggerChange, fileList]
  );

  return (
    <>
      <ImageUpload
        listType="picture-card"
        customRequest={handleUploadImage}
        onRemove={handleRemoveImage}
      >
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      </ImageUpload>
    </>
  );
});

export default CircleUpload;
