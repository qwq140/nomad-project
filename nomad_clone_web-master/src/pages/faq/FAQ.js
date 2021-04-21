import { Button, Card } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CategoryBtn from "../../components/AdminCategoryBtn";
import AppLayout from "../../components/AppLayout";
import { PageHero } from "../../components/style";
import {
  faqCategoryPostRequestAction,
  faqGetRequestAction,
} from "../../reducers/faq";
import { FaqContainer, RightCard } from "./style";

const FAQ = () => {
  const dispatch = useDispatch();
  const { principal } = useSelector((state) => state.user);
  const { faqCategoryPostLoading, faqCategoryPostDone } = useSelector(
    (state) => state.faq
  );

  useEffect(() => {
    dispatch(faqGetRequestAction());
  }, []);

  const { faqList } = useSelector((state) => state.faq);
  return (
    <>
      <AppLayout>
        <PageHero>
          <h1>FAQ</h1>
          <p>궁금한 것이 있다구요?</p>
        </PageHero>
        <FaqContainer>
          {faqList !== null
            ? faqList.map((list) => (
                <>
                  <div className="Faq-Item">
                    <h3>{list.title}</h3>
                    <div className="Faq-Item-list">
                      {list.faq !== null
                        ? list.faq.map((item) => (
                            <>
                              <Link
                                key={`faq-${item.id}`}
                                to={`/faq/${item.id}`}
                              >
                                {item.title}
                              </Link>
                            </>
                          ))
                        : null}
                    </div>
                  </div>
                </>
              ))
            : null}
        </FaqContainer>
        {principal !== null && principal.roles === "ROLE_ADMIN" && (
          <RightCard bordered={false}>
            <CategoryBtn
              action={faqCategoryPostRequestAction}
              done={faqCategoryPostDone}
              loading={faqCategoryPostLoading}
            />
            <Button>
              <Link to="/admin/faq/write">FAQ 작성하기</Link>
            </Button>
          </RightCard>
        )}
      </AppLayout>
    </>
  );
};

export default FAQ;
