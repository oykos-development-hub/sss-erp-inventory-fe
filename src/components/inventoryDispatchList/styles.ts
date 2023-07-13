import styled from 'styled-components';
import {Dropdown, Input} from 'client-library';

export const Filters = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-block: 32px;
`;

export const FilterDropdown = styled(Dropdown)`
  width: 300px;
`;

export const FilterInput = styled(Input)`
  width: 300px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;
