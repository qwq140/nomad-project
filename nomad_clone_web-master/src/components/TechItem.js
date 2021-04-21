import React from "react";
import { TechCard } from "../pages/admin/tech/style";
import KeyButton from "./KeyButton";

const TechItem = ({ list }) => {
  return (
    <TechCard title={list.title}>
      <div>
        <img src={list.file !== null ? list.file.fileUrl : null} alt="" />
      </div>
      <div>
        <KeyButton keys={list.id} />
      </div>
    </TechCard>
  );
};

export default TechItem;
