import { Button, Popconfirm } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { refundPutRequestAction } from "../reducers/pay";

const RefundButton = ({ data }) => {
  const dispatch = useDispatch();

  const onClickRefund = () => {
    const id = { payId: data.id };
    dispatch(refundPutRequestAction(id));
  };
  return (
    <>
      {data.status === "paid" ? (
        <>
          <Popconfirm
            placement="bottomLeft"
            title="환불요청을 하시겠습니까?"
            onConfirm={onClickRefund}
            okText="환불신청"
            cancelText="취소"
          >
            <Button>환불신청</Button>
          </Popconfirm>
        </>
      ) : null}
    </>
  );
};

export default RefundButton;
