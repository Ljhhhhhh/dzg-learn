import React, { useState, useRef, useImperativeHandle } from 'react';
import { Checkbox } from 'antd';
import _ from 'lodash';
import { CheckboxGroupProps } from 'antd/es/checkbox';

const CheckboxGroup = Checkbox.Group;

const DzgCheckboxGroup: React.ForwardRefExoticComponent<React.RefAttributes<any>> = React.forwardRef(
  (props: CheckboxGroupProps, ref) => {
    const { options, ...restProps } = props;
    const [optionsData, setOptions] = useState(options);
    const compRef = useRef(null);

    useImperativeHandle(ref, () => ({
      ref: compRef,
      updateOptions: (opts: any) => {
        if (!_.isEqual(opts, optionsData)) {
          setOptions(opts);
        }
      },
    }));

    return <CheckboxGroup ref={compRef} {...restProps} options={optionsData} />;
  }
);

export default DzgCheckboxGroup;
