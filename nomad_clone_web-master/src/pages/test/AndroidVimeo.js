import React from "react";
import styled from "styled-components";

const AndroidVideoCotainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  iframe {
    width: 1000px;
    height: 500px;
  }
`;

const AndroidVimeo = ({ match }) => {
  console.log("매치는?", match);
  const id = match.params.id;
  return (
    <>
      <AndroidVideoCotainer>
        <iframe
          src={`https://player.vimeo.com/video/${id !== null ? id : null}`}
          allow="autoplay; fullscreen;"
          frameborder="0"
        ></iframe>
      </AndroidVideoCotainer>
    </>
  );
};

export default AndroidVimeo;
