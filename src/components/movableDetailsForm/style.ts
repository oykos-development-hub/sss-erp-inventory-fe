import {Dropdown, Theme} from 'client-library';
import styled from 'styled-components';

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const InputWrapper = styled.div`
  display: flex;
  gap: 12px;
  > * {
    width: 20%;
  }
`;

export const SupplierDropdown = styled(Dropdown)`
  max-width: 287px;
  @media (max-width: 1440px) {
    width: 195px;
  }
`;
export const OfficeDropdown = styled(Dropdown)`
  max-width: 287px;
  @media (max-width: 1440px) {
    width: 195px;
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
