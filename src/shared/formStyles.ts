import styled from 'styled-components';
import {PlusButtonWrapper} from './plusButton';

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  & ${PlusButtonWrapper} {
    margin: 62px 0 40px 0;
  }
`;

export const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const FormRow = styled.div`
  display: flex;
  gap: 10px;

  & > * {
    width: 100%;
    min-width: 120px;
  }
`;
