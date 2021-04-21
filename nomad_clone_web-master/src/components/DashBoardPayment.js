import { Button, Card, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userPayGetRequestAction } from "../reducers/pay";
import RefundButton from "./RefundButton";
import RefundCancleButton from "./RefundCancleButton";

const DashBoardPayment = ({ match }) => {
  const columns = [
    {
      title: "결제일자",
      dataIndex: "date",
    },
    {
      title: "코스명",
      dataIndex: "course",
    },
    {
      title: "구매자",
      dataIndex: "customer",
    },
    {
      title: "금액",
      dataIndex: "price",
    },
    {
      title: "상태",
      dataIndex: "state",
    },
    {
      title: "환불",
      dataIndex: "refund",
      render: (dataIndex) => <RefundButton data={dataIndex} />,
    },
    {
      title: "환불취소",
      dataIndex: "refund",
      render: (dataIndex) => <RefundCancleButton data={dataIndex} />,
    },
  ];
  const dispatch = useDispatch();
  const { userPayList } = useSelector((state) => state.pay);
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(userPayGetRequestAction(match));
  }, []);

  useEffect(() => {
    const list = [];
    for (let index in userPayList) {
      const data = {
        id: userPayList[index].id,
        status: userPayList[index].status,
      };
      list.push({
        key: index,
        date: userPayList[index].createDate.substr(0, 10),
        course: userPayList[index].name,
        customer: userPayList[index].buyer_name,
        price: userPayList[index].paid_amount,
        state: userPayList[index].status,
        refund: data,
      });
    }
    setData(list);
  }, [userPayList]);

  return (
    <div>
      <Card bordered={false} title="결제리스트">
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ defaultPageSize: 1000, hideOnSinglePage: true }}
          scroll={{ y: 400 }}
        />
      </Card>
    </div>
  );
};

export default DashBoardPayment;
