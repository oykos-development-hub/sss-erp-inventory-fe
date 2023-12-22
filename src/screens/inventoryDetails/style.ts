import styled from 'styled-components';
import {Theme} from 'client-library';

export const InventoryDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const TableHeader = styled.div`
  margin-top: 2rem;
  background-color: ${Theme.palette.gray50};
  padding: 15px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
`;

export const DescriptionWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-block: 10px;
  background-color: ${Theme.palette.gray50};
`;
