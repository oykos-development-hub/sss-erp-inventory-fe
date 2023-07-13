import styled from 'styled-components';
import {Theme, Dropdown, Input} from 'client-library';

export const SmallDetailsFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const SmallDetailsInputWrapper = styled.div`
  display: flex;
  gap: 10px;
  > * {
    width: 25%;
  }
`;

export const ButtonWrapper = styled.div`
  border-top: 2px solid ${Theme.palette.primary500};
  background-color: ${Theme.palette.gray50};
  padding: 20px;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

export const SupplierLocationDescriptionWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`;

export const LocationDropdown = styled(Dropdown)`
  flex: 1;
`;

export const SupplierDropdown = styled(Dropdown)`
  flex: 1;
`;

export const DescriptionInput = styled(Input)`
  flex: 2;
`;
