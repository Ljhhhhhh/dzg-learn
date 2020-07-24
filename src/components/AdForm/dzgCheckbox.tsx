import React from 'react';
import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { IAdCheckboxProps } from './interface';

const DzgCheckbox = React.forwardRef((props: IAdCheckboxProps, ref: any) => {
  const { value, onChange, children, ...restProp } = props;
  if (value !== undefined) {
    restProp.checked = value;
  } else {
    restProp.checked = false;
  }
  const handleChange = (e: CheckboxChangeEvent) => {
    const value = e.target.checked;
    onChange && onChange(value);
  };
  return (
    <Checkbox ref={ref} onChange={handleChange} {...restProp}>
      {children}
    </Checkbox>
  );
});

export default DzgCheckbox;
