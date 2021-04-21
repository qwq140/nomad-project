import { Button } from "antd";
import React from "react";
import styled from "styled-components";

const TechButtonStyle = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  transform: ${(props) => props.myscale || "scale(1.0)"};
  opacity: ${(props) => props.myopacity};
  :hover {
    transform: scale(1.2);
  }
  img {
    width: 100%;
  }
`;

const TechButton = ({ tech, setTechId, techId }) => {
  const onClickTech = () => {
    setTechId(tech.id);
  };

  return (
    <>
      <TechButtonStyle
        onClick={onClickTech}
        myscale={techId === tech.id ? "scale(1.2)" : ""}
        myopacity={techId === 0 ? "1.0" : techId === tech.id ? 1.0 : 0.4}
      >
        <img src={tech.file.fileUrl} alt="" />
      </TechButtonStyle>
    </>
  );
};

export default TechButton;
