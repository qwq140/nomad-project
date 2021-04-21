import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Col, Input, Row, Space, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useCallback, useState } from "react";
import styled from "styled-components";

const MySpace = styled(Space)`
  .ant-upload-list-picture .ant-upload-list-item {
    height: 300px;
  }
  .ant-upload-span {
    flex-direction: column;
  }
  .ant-upload-list-picture .ant-upload-list-item-thumbnail {
    width: 200px;
    height: 200px;
  }
  .ant-upload-list-picture .ant-upload-list-item-thumbnail img {
    width: 100%;
    height: 100%;
  }
  .ant-upload-list-item-name {
    flex: none;
  }
  .ant-progress-outer {
    margin-left: -40px;
  }
`;
const MyCard = styled(Card)`
  background: transparent;
  text-align: center;
  .ant-card-head {
    border-bottom: none;
  }
  .ant-card-body {
    padding: 0;
    border: 0;
  }
`;
const MyRow = styled(Row)`
  padding: 1.5rem;
  width: 100%;
  .ant-col {
    text-align: center;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
  }
  .ant-col textarea {
    margin-top: 10px;
    height: 100px;
  }
  .ant-col button {
    :hover {
      border-color: red;
      color: red;
    }
  }
`;
// 데이터 들어오는 값들 처리해야 됨.
const SimpleInfo = ({ id, simpleList, setSimpleList }) => {
  const [reverse, setReverse] = useState(false);

  const onChangeReverse = useCallback(
    (e) => {
      if (!reverse) {
        e.nativeEvent.path[6].style.flexDirection = "row-reverse";
      } else {
        e.nativeEvent.path[6].style.flexDirection = "row";
      }
      setReverse(!reverse);
    },
    [reverse]
  );
  const removeItem = () => {
    if (simpleList.length !== 1) {
      setSimpleList(simpleList.filter((data) => data.id !== id));
    }
  };

  return (
    <MyRow>
      <Col flex="2 1 200px">
        <MySpace direction="vertical" size="large">
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
          </Upload>
        </MySpace>
      </Col>
      <Col flex="6 1 400px">
        <Input placeholder="Input Title" />
        <TextArea placeholder="Input Content" />
      </Col>
      <Col flex="1 1 100px">
        <MyCard title="check reverse" bordered={false}>
          <Checkbox checked={reverse} onChange={onChangeReverse} />
        </MyCard>
      </Col>
      <Col flex="1 1 100px">
        <Button onClick={removeItem}>
          <DeleteOutlined />
        </Button>
      </Col>
    </MyRow>
  );
};

export default SimpleInfo;
