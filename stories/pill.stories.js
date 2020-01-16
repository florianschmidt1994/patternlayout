import React from 'react';
import { linkTo } from '@storybook/addon-links';
import Pill from '../src/components/pill/Pill';

export default {
  title: 'Pill',
  component: Pill,
};

export const empty = () => <Pill />;
export const withConversionCharacter = () => <Pill conversionCharacter={"c"}/>;
export const withConversionCharacterAndDescription = () => <Pill conversionCharacter="c" description="Category"/>;
