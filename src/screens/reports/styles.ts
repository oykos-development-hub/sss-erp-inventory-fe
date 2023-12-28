import styled from 'styled-components';
import {Theme, Typography, Divider} from 'client-library';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);
  border-radius: 8px;
  background-color: ${Theme?.palette?.white};
  padding: 20px;

  & > span {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
`;

export const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-block: 33px;
`;

export const OptionsRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 30px;

  & > div {
    max-width: 450px;
  }
`;

export const MainTitle = styled(Typography)`
  margin-bottom: 10px;
  font-weight: 600;
`;

export const CustomDivider = styled(Divider)`
  height: 1px;
  width: 100%;
  color: ${Theme?.palette?.gray200};
`;
