import {Theme, Typography} from 'client-library';
import styled from 'styled-components';

export const TabsWrapper = styled.div`
  border-bottom: 1px solid ${Theme.palette.gray600};
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;

  button {
    border: 1px solid ${Theme.palette.gray600};
    border-radius: 0.5em 0.5em 0 0;
    white-space: nowrap;
    border-bottom: none;

    &:hover {
      border-width: 1px;
      border-bottom: none;
    }
  }
`;

export const ScreenTitle = styled(Typography)`
  text-transform: uppercase;
  font-weight: 600;
`;
