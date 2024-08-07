import {BuildingsIcon, ShapesIcon, ReportIcon, ECommerceIcon, Typography} from 'client-library';
import React from 'react';
import {Container, ContentBox, IconWrapper, LandingPageTitle, Title, TitleWrapper} from './styles';
import useAppContext from '../../context/useAppContext';
import ScreenWrapper from '../../shared/screenWrapper';
import {checkActionRoutePermissions} from '../../services/checkRoutePermissions.ts';

const INVENTORY: React.FC = () => {
  const {
    navigation: {navigate},
    breadcrumbs,
    contextMain: {permissions},
  } = useAppContext();

  const readPermittedRoutes = checkActionRoutePermissions(permissions, 'read');

  return (
    <ScreenWrapper showBreadcrumbs={false}>
      <div>
        <LandingPageTitle>
          <Typography variant="bodyLarge" style={{fontWeight: 600}} content="OSNOVNA SREDSTVA" />
        </LandingPageTitle>
        <Container>
          {readPermittedRoutes.includes('/inventory/movable-inventory') && (
            <ContentBox
              onClick={() => {
                navigate('/inventory/movable-inventory');
                breadcrumbs.add({name: 'Pokretna Sredstva', path: '/inventory/movable-inventory'});
              }}>
              <TitleWrapper>
                <Title variant="bodyLarge" content="Pokretna Sredstva" />
              </TitleWrapper>
              <IconWrapper>
                <ECommerceIcon />
              </IconWrapper>
            </ContentBox>
          )}
          {readPermittedRoutes.includes('/inventory/immovable-inventory') && (
            <ContentBox
              onClick={() => {
                navigate('/inventory/immovable-inventory');
                breadcrumbs.add({name: 'Nepokretna Sredstva', path: '/inventory/immovable-inventory'});
              }}>
              <TitleWrapper>
                <Title variant="bodyLarge" content="Nepokretna Sredstva" />
              </TitleWrapper>
              <IconWrapper>
                <BuildingsIcon />
              </IconWrapper>
            </ContentBox>
          )}
          {readPermittedRoutes.includes('/inventory/small-inventory') && (
            <ContentBox
              onClick={() => {
                navigate('/inventory/small-inventory');
                breadcrumbs.add({name: 'Sitan Inventar', path: '/inventory/small-inventory'});
              }}>
              <TitleWrapper>
                <Title variant="bodyLarge" content="Sitan Inventar" />
              </TitleWrapper>
              <IconWrapper>
                <ShapesIcon />
              </IconWrapper>
            </ContentBox>
          )}
          {readPermittedRoutes.includes('/inventory/reports') && (
            <ContentBox
              onClick={() => {
                navigate('/inventory/reports');
                breadcrumbs.add({name: 'Izvještaji', path: '/inventory/reports'});
              }}>
              <TitleWrapper>
                <Title variant="bodyLarge" content="Izvještaji" />
              </TitleWrapper>
              <IconWrapper>
                <ReportIcon />
              </IconWrapper>
            </ContentBox>
          )}
        </Container>
      </div>
    </ScreenWrapper>
  );
};

export default INVENTORY;
