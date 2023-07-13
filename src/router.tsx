import React from 'react';
import {LandingScreen} from './screens/landing';
import {MicroserviceProps} from './types/micro-service-props';
import {NotFound404} from './screens/404';
import Inventory from './screens';
import InventoryDetails from './screens/inventoryDetails/inventoryDetails';

const movableRegex = /^\/inventory\/movable-inventory/;
const immovableRegex = /^\/inventory\/immovable-inventory/;
const smallRegex = /^\/inventory\/small-inventory/;

const movableDetailsRegex = /^\/inventory\/movable-inventory\/\d+/;
const immovableDetailsRegex = /^\/inventory\/immovable-inventory\/\d+/;
const smallDetailsRegex = /^\/inventory\/small-inventory\/\d+/;

export const Router: React.FC<MicroserviceProps> = props => {
  const pathname = props?.navigation?.location?.pathname;
  const context = Object.freeze({
    ...props,
  });

  const renderScreen = () => {
    if (pathname === '/inventory') return <LandingScreen context={context} />;
    if (movableDetailsRegex.test(pathname)) return <InventoryDetails context={context} type="movable" />;
    if (immovableDetailsRegex.test(pathname)) return <InventoryDetails context={context} type="immovable" />;
    if (smallDetailsRegex.test(pathname)) return <InventoryDetails context={context} type="small" />;

    if (movableRegex.test(pathname)) return <Inventory context={context} type="movable" />;
    if (immovableRegex.test(pathname)) return <Inventory context={context} type="immovable" />;
    if (smallRegex.test(pathname)) return <Inventory context={context} type="small" />;

    return <NotFound404 context={context} />;
  };

  return renderScreen();
};
