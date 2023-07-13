import {Button} from 'client-library';
import React from 'react';
import {ScreenProps} from '../types/screen-props';

export const LandingScreen: React.FC<ScreenProps> = (props: ScreenProps) => {
  return (
    <div>
      <h2>Inventory MICROSERVICE Landing screen</h2>
      <Button content="Back to /" variant="primary" size="xs" onClick={() => props.context.navigation.navigate('/')} />
    </div>
  );
};
