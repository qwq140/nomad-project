import React, { useEffect } from "react";
import "antd/dist/antd.css";
import { Button, Menu } from "antd";
import {
  FaqDetailContainer,
  FaqDetailBoard,
  FaqBoardContainer,
  FaqCategory,
  FaqBoardItem,
} from "./style";
import { useDispatch, useSelector } from "react-redux";
import {
  faqCategoryGetRequestAction,
  faqOneGetRequestAction,
} from "../../reducers/faq";
import ReactHtmlParser from "react-html-parser";
import AppLayout from "../../components/AppLayout";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

const FaqDetail = ({ match }) => {
  // 아이디값
  const data = match.params.id;

  // 디스패쳐
  const dispatch = useDispatch();

  // 아이템
  const { faqItem } = useSelector((state) => state.faq);
  const { faqCategoryList } = useSelector((state) => state.faq);

  const { principal } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(faqOneGetRequestAction(data));
    dispatch(faqCategoryGetRequestAction());
  }, []);

  const onLoadFaq = (key) => {
    console.log("키는?", key.key);
    const id = key.key;
    dispatch(faqOneGetRequestAction(id));
  };

  return (
    <>
      <AppLayout>
        <FaqDetailContainer justify="center">
          {/* 카테고리 */}
          <FaqCategory span={6}>
            <h3>Table of contents</h3>
            <Menu mode="inline" style={{ width: 256 }}>
              {faqCategoryList !== null
                ? faqCategoryList.map((list) => (
                    <>
                      <SubMenu title={list.title}>
                        {list.faq.map((list2) => (
                          <Menu.Item key={list2.id} onClick={onLoadFaq}>
                            {list2.title}
                          </Menu.Item>
                        ))}
                      </SubMenu>
                    </>
                  ))
                : null}
            </Menu>
          </FaqCategory>

          {/* 중앙 Board */}
          <FaqDetailBoard span={18}>
            <h1 className="faq-title">결제</h1>
            <FaqBoardContainer>
              <FaqBoardItem>
                <div className="faq-detail-title">
                  <h3>{faqItem !== null ? faqItem.title : "Title"}</h3>
                </div>

                {faqItem !== null
                  ? ReactHtmlParser(faqItem.content)
                  : "Content"}
              </FaqBoardItem>
            </FaqBoardContainer>
            {principal !== null && principal.roles === "ROLE_ADMIN" && (
              <Button>
                <Link to={`/admin/faq/update/${data}`}>수정하기</Link>
              </Button>
            )}
            {/* {/* FAQ 내용부분 */}
          </FaqDetailBoard>
        </FaqDetailContainer>
      </AppLayout>
    </>
  );
};

export default FaqDetail;
