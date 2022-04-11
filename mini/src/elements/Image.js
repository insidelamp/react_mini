import styled from "styled-components";
import React from "react";

const Image = (props) => {
  const { shape, src, size } = props;

  const styles = {
    src: src,
    size: size,
  };
  if (shape === "circle") {
    return <ImageCircle {...styles}></ImageCircle>;
  }
  if (shape === "rectangle") {
    return (
      <Aspect0utter>
        <AspecInner {...styles}></AspecInner>
      </Aspect0utter>
    );
  }
  return (
    <React.Fragment>
      <ImageDefault {...styles}></ImageDefault>
    </React.Fragment>
  );
};

Image.defaultProps = {
  shape: "rectangle",
  src: "https://ifh.cc/g/nn7mf5.png",
  width: "100px",
  height: "50px"
};

const ImageDefault = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

const Aspect0utter = styled.div`
  width: 100%;
  min-width: 250px;
`;

// const AspecInner = styled.div`
//   position: relative;
//   padding-top: 75%;
//   overflow: hidden;
//   background-image: url("${(props) => props.src}");
//   background-size: cover;
// `;

const AspecInner = styled.div`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  background-image: url(${(props) => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const ImageCircle = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);

  background-image: url("${(props) => props.src}");
  background-size: cover;
  margin: 4px;
`;

export default Image;
