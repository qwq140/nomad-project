import React, { useCallback, useState } from "react";
import { SketchPicker } from "react-color";
import styled from "styled-components";
const ColorInputColor = styled.div`
  width: 36px;
  height: 14px;
  border-radius: 2px;
  background: ${(props) => props.background || "#fff"};
`;
const ColorInputSwatch = styled.div`
  display: inline-block;
  padding: 5px;
  background: #fff;
  border-radius: 1px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;
const ColorInputPopover = styled.div`
  position: absolute;
  z-index: 2;
  left: calc(50% - 110px);
`;
const ColorInputCover = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;
const InputColor = ({ onChange, color, setColor }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const triggerChange = useCallback(
    (changedValue) => {
      onChange?.({
        color,
        ...changedValue,
      });
    },
    [color, onChange]
  );
  const handleColorClick = useCallback(() => {
    setDisplayColorPicker(!displayColorPicker);
  }, [displayColorPicker]);

  const handleColorClose = useCallback(() => {
    setDisplayColorPicker(false);
  }, []);
  const handleColorChange = useCallback(
    (selectColor) => {
      setColor(selectColor.hex);
      triggerChange({ color: selectColor.hex });
    },
    [setColor, triggerChange]
  );

  return (
    <>
      <ColorInputSwatch onClick={handleColorClick}>
        <ColorInputColor background={color} />
      </ColorInputSwatch>
      {displayColorPicker ? (
        <ColorInputPopover>
          <ColorInputCover onClick={handleColorClose} />
          <SketchPicker color={color} onChange={handleColorChange} />
        </ColorInputPopover>
      ) : null}
    </>
  );
};

export default InputColor;
