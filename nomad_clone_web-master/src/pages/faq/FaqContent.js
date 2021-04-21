import React from "react";
import { FaqBoardContainer, FaqBoardItem } from "./style";

const FaqContent = () => {
  return (
    <>
      <h1 className="faq-title">결제</h1>
      <FaqBoardContainer>
        <FaqBoardItem>
          <div className="faq-detail-title">
            <h3>FAQ상세</h3>
          </div>
        </FaqBoardItem>
      </FaqBoardContainer>
    </>
  );
};

export default FaqContent;
