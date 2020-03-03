import React, { ReactElement } from "react";
import Loader from "react-loader-spinner";
import styled from "@emotion/styled";
import { Helpers } from "../../styles";

type Types =
  | "Audio"
  | "BallTriangle"
  | "Bars"
  | "Circles"
  | "Grid"
  | "Hearts"
  | "Oval"
  | "Puff"
  | "Rings"
  | "TailSpin"
  | "ThreeDots"
  | "Watch"
  | "RevolvingDot"
  | "Triangle"
  | "Plane"
  | "MutatingDots"
  | "None"
  | "NotSpecified";

const TalignCenter = styled.div`
  ${Helpers.talignCenter}
`;

export const CustomLoader = ({ type }: { type: Types }): ReactElement => (
  <TalignCenter>
    <Loader type={type} color="#00BFFF" height={50} width={50} />
  </TalignCenter>
);
