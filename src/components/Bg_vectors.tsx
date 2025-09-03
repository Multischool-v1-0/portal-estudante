"use client";

import styled from "styled-components";
import bgVectors from "@/assets/backgrounds/bg_vectors.svg";

const BackgroundVectors = styled.div`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100dvh;
  background: url(${bgVectors.src}) no-repeat center center;
  background-size: cover;
  background-position: center;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  color: ${(props) => props.theme.colors.textBlack};
`;

export default BackgroundVectors;