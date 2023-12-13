import styled from 'styled-components';

export const TooltipWrapper = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-end;
  width: fit-content;
  -webkit-box-pack: end;
  justify-content: flex-end;
  & > * {
    margin-right: 10px;
  }
  & > .width200 {
    width: 200px;
  }
`;

export const Links = styled.div`
  color: #c99234;
  cursor: pointer;
`;
