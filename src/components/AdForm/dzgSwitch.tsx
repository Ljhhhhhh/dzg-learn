import React from 'react';
import { Switch } from 'antd';
import { IDzgSwitchProps } from './interface';

const DzgSwitch = React.forwardRef((props: IDzgSwitchProps, ref: any) => {
  const { value, onChange, ...restProp } = props;
  if (value !== undefined) {
    restProp.checked = value;
  } else {
    restProp.checked = false;
  }
  const handleChange = (checked: boolean, e: MouseEvent) => {
    onChange && onChange(checked);
  };
  return <Switch ref={ref} onChange={handleChange} {...restProp} />;
});

export default DzgSwitch;
