import styled from 'styled-components';
import {Theme} from 'client-library';

export const ImmovableDetailsFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ImmovableDetailsInputWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export const ButtonWrapper = styled.div`
  border-top: 2px solid ${Theme.palette.primary500};
  background-color: ${Theme.palette.gray50};
  padding: 20px;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;
