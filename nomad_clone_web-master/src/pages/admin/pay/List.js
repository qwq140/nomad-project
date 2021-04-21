import { Card, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../../../components/AppLayout";
import { payGetRequestAction } from "../../../reducers/pay";
import RefundedButton from "../../../components/RefundedButton";
import { useLocation } from "react-router";
const List = ({ history }) => {
  const { pathname } = useLocation();
  const { principal, logInDone, loadMyInfoDone } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    console.log(logInDone);
    console.log(loadMyInfoDone);
    if (logInDone) {
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
  }, [pathname, history, principal, logInDone]);
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
      render: (dataIndex) => <RefundedButton data={dataIndex} />,
    },
  ];
  const dispatch = useDispatch();
  const { payList } = useSelector((state) => state.pay);
  const [data, setData] = useState([]);
  console.log(payList);

  useEffect(() => {
    dispatch(payGetRequestAction());
  }, []);

  useEffect(() => {
    const list = [];
    for (let index in payList) {
      const data = { id: payList[index].id, status: payList[index].status };

      list.push({
        key: index,
        date: payList[index].createDate.substr(0, 10),
        course: payList[index].name,
        customer: payList[index].buyer_name,
        price: payList[index].paid_amount,
        state: payList[index].status,
        refund: data,
      });
    }
    setData(list);
  }, [payList]);
  return (
    <>
      <AppLayout>
        <Card bordered={false} title="결제리스트">
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ defaultPageSize: 1000, hideOnSinglePage: true }}
            scroll={{ y: 400 }}
          />
        </Card>
      </AppLayout>
    </>
  );
};

export default List;
