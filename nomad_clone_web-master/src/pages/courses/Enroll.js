import { Button } from "antd";
import { push } from "connected-react-router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../../components/AppLayout";
import { PageHero } from "../../components/style";
import { coursesOneGetRequestAction } from "../../reducers/courses";
import {
  freePostRequestAction,
  payCheckGetRequestAction,
} from "../../reducers/pay";
import { PurchaseContainer } from "./style";

const Enroll = ({ match, history }) => {
  const courseId = match.params.id;
  const dispatch = useDispatch();
  const { coursesItem, coursesOneGetLoading } = useSelector(
    (state) => state.courses
  );
  useEffect(() => {
    dispatch(coursesOneGetRequestAction(courseId));
    dispatch(payCheckGetRequestAction(courseId));
  }, []);
  const onClickPayment = () => {
    if (payCheckItem === null) {
      const data = {
        name: coursesItem.title,
        courseId: courseId,
        paid_amount: coursesItem.price,
      };
      console.log("데이터는?", data);
      dispatch(freePostRequestAction(data));
    } else {
      alert("이미 구매한 강의입니다");
      history.go(+1);
    }
  };

  const { payCheckItem } = useSelector((state) => state.pay);
  console.log("무료강의페이지 페이체크 아이템은?", payCheckItem);
  return (
    <AppLayout>
      <PageHero>
        <h1>Register For Free</h1>
      </PageHero>
      <PurchaseContainer>
        <div className="purchaseInfo">
          <div className="purchaseInfoLeft">
            <div>
              <img
                src={coursesItem !== null ? coursesItem.previewImage.url : null}
                alt=""
              />
              <div className="courseInfo">
                <h3>{coursesItem !== null ? coursesItem.title : null}</h3>
                <p>{coursesItem !== null ? coursesItem.subTitle : null}</p>
              </div>
            </div>
          </div>
          <div className="purchaseInfoRight">
            <div>
              <h2>Register For Free</h2>
              <div className="totalPrice">
                <h3>
                  <b>
                    {coursesItem !== null ? (
                      <>{coursesItem.price === "0" ? "FREE COURSE" : null}</>
                    ) : null}
                  </b>
                </h3>
              </div>
            </div>
            <Button
              type="primary"
              loading={coursesOneGetLoading}
              onClick={onClickPayment}
            >
              Get in There
            </Button>
          </div>
        </div>
      </PurchaseContainer>
    </AppLayout>
  );
};

export default Enroll;
