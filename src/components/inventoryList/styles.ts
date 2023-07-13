import styled from 'styled-components';
import {Dropdown, Input} from 'client-library';

export const Filters = styled.div`
  display: flex;
  gap: 8px;
  flex-grow: 1;
  flex-wrap: wrap;
  margin-block: 32px;
`;

export const FilterDropdown = styled(Dropdown)`
  width: 300px;
`;

export const FilterInput = styled(Input)`
  width: 300px;
`;

export const ReversButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
