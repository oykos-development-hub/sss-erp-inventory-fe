import {Tab} from '@oykos-development/devkit-react-ts-styled-components';
import {Tabs} from 'client-library';
import {useEffect, useState} from 'react';
import {inventoryTabs} from '../../constants';
import InventoryRouter from '../../screens/router';
import SectionBox from '../../shared/sectionBox';
import {InventoryTypeEnum} from '../../types/inventoryType';
import {MicroserviceProps} from '../../types/micro-service-props';
import {getRouteName} from '../../utils/getRouteName';
import useTitle from '../../utils/useTitle';
import {ScreenTitle, TabsWrapper} from './styles';

interface InventoryTabsProps {
  context: MicroserviceProps;
  type: InventoryTypeEnum | `${InventoryTypeEnum}`;
}

const getCurrentTab = (pathname: string) => {
  const path = pathname.split('/');
  const name = path[path.length - 1];
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return inventoryTabs.find(tab => tab.routeName === name)?.id;
};

const InventoryTabs = ({context, type}: InventoryTabsProps) => {
  const [activeTab, setActiveTab] = useState(getCurrentTab(context.navigation.location.pathname) || 1);
  const {
    navigation: {navigate},
  } = context;

  const title = useTitle(context.navigation.location.pathname, type);

  const onTabChange = (tab: Tab) => {
    setActiveTab(tab.id as number);
    const routeName = getRouteName(tab.title as string);

    if (activeTab !== tab.id) {
      navigate(routeName ? `/inventory/${type}-inventory/${routeName}` : `/inventory/${type}-inventory`);
    }
  };

  useEffect(() => {
    setActiveTab(getCurrentTab(context.navigation.location.pathname) || 1);
  }, [context.navigation.location.pathname]);

  return (
    <SectionBox>
      <TabsWrapper>
        <ScreenTitle content={title} />

        <Tabs
          tabs={type === 'small' || type === 'immovable' ? inventoryTabs.slice(0, 2) : inventoryTabs}
          activeTab={activeTab}
          onChange={onTabChange}
        />
      </TabsWrapper>

      <InventoryRouter context={context} type={type} />
    </SectionBox>
  );
};

export default InventoryTabs;
