import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import axios from "axios";
import React, { useCallback } from "react";

const RectangleUpload = ({ value, onChange }) => {
  const triggerChange = useCallback(
    (changedValue) => {
      onChange?.({
        ...changedValue,
      });
    },
    [onChange]
  );
  const handleRemoveImage = useCallback(async () => {
    try {
      await axios.delete("/upload/" + value.id, {
        header: { "Content-Type": "multipart/form-data" },
      });
      triggerChange([null]);
    } catch (error) {}
  }, [value, triggerChange]);
  const handleUploadImage = useCallback(
    async (options) => {
      console.log(options);
      const { onSuccess, onError, file } = options;
      const formData = new FormData();
      formData.append("file", file);
      try {
        const result = await axios.post("/upload", formData, {
          header: { "Content-Type": "multipart/form-data" },
        });
        triggerChange(result.data);
        onSuccess("Ok");
      } catch {
        onError("Error");
      }
    },
    [triggerChange]
  );

  return (
    <>
      <Upload
        customRequest={handleUploadImage}
        onRemove={handleRemoveImage}
        listType="picture"
        maxCount={1}
        onPreview={() => false}
      >
        <Button type="button" icon={<UploadOutlined />}>
          Upload (Max: 1)
        </Button>
      </Upload>
    </>
  );
};

export default RectangleUpload;
