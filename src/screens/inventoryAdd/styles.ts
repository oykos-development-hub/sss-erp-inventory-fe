import styled from 'styled-components';
import {Theme, Table} from 'client-library';

const {white, gray50, primary500} = Theme.palette;

export const StyledTable = styled(Table)`
  & tbody {
    tr {
      background-color: ${white} !important;
      cursor: auto;

      & svg {
        cursor: pointer;
      }
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 4px;
  margin-top: 22px;
  padding: 20px 10px;
  border-top: 1px solid ${primary500};
  background-color: ${gray50};
`;
