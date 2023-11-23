import styled from 'styled-components';

export const MovementForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FileUploadWrapper = styled.div`
  align-items: center;
  justify-content: flex-start;
  margin-top: 10px;
  margin-bottom: 10px;

  > div > div {
    display: block;
    & div > p > p {
      font-weight: 600;
      line-height: 20px;
    }
  }
`;
