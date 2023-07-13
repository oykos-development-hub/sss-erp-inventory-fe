import React, {ReactNode} from 'react';
import {Breadcrumbs} from 'client-library';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #f8f8f8;
  padding: 28px 40px;
  height: calc(100vh - 157px);
  overflow-y: auto;
  box-sizing: border-box;

  ul {
    margin: 0;
    padding: 0;
  }
`;

const StyledBreadcrumbs = styled(Breadcrumbs)`
  padding: 0;
  margin: 0;
`;

const ScreenWrapper: React.FC<{children: ReactNode}> = ({children}) => {
  const breadcrumbsItems = window.location.pathname
    .split('/')
    .filter(item => item !== '' && item !== 'inventory')
    .map(item => {
      //TODO: find a way to map the routes to breadcrumbs and translate them
      return {name: item, to: `/${item}`};
    });

  return (
    <Container>
      <StyledBreadcrumbs items={breadcrumbsItems} />
      {children}
    </Container>
  );
};

export default ScreenWrapper;
