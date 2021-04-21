import { Card } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import AdminTechBtn from "../../../components/AdminTechBtn";
import AppLayout from "../../../components/AppLayout";
import TechItem from "../../../components/TechItem";
import { techGetRequestAction } from "../../../reducers/admin/tech";

import { RightCard } from "../../faq/style";
import { TechListContainer } from "./style";

const List = ({ history }) => {
  const { pathname } = useLocation();
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

  const dispatch = useDispatch();

  const { techList } = useSelector((state) => state.admintech);

  useEffect(() => {
    dispatch(techGetRequestAction());
  }, []);

  return (
    <>
      <AppLayout>
        <Card bordered={false} title="Tech 리스트">
          <TechListContainer>
            {techList !== null
              ? techList.map((list) => (
                  <>
                    <TechItem list={list} />
                  </>
                ))
              : null}
          </TechListContainer>
          <RightCard bordered={false}>
            <AdminTechBtn />
          </RightCard>
        </Card>
      </AppLayout>
    </>
  );
};

export default List;
