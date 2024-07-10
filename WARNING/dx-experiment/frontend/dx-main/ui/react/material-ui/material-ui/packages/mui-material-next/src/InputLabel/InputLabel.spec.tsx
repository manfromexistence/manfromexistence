import * as React from 'react';
import { expectType } from '@mui/types';
import InputLabel from '@mui/material/InputLabel';

const CustomComponent: React.FC<{ prop1: string; prop2: number }> = function CustomComponent() {
  return <div />;
};

const InputLabelTest = () => {
  return (
    <div>
      <InputLabel />
      <InputLabel component="legend" />
      <InputLabel
        component="legend"
        onClick={(event) => {
          expectType<React.MouseEvent<HTMLLegendElement, MouseEvent>, typeof event>(event);
        }}
      />

      {/* @ts-expect-error */}
      <InputLabel component="a" incorrectAttribute="url" />
      {/* @ts-expect-error */}
      <InputLabel component="div" href="url" />
      <InputLabel component={CustomComponent} prop1="1" prop2={12} />
      {/* @ts-expect-error */}
      <InputLabel component={CustomComponent} prop1="1" />
      {/* @ts-expect-error */}
      <InputLabel component={CustomComponent} prop1="1" prop2="12" />
    </div>
  );
};
