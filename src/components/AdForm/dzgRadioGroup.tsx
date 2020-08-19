import React, { useState, useRef, useImperativeHandle } from 'react';
import { Radio } from 'antd';
import _ from 'lodash';
import { RadioGroupProps } from 'antd/lib/radio';

const RadioGroup = Radio.Group;

const DzgRadioGroup: React.ForwardRefExoticComponent<React.RefAttributes<any>> = React.forwardRef(
  (props: RadioGroupProps, ref) => {
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

    return <RadioGroup ref={compRef} {...restProps} options={optionsData} />;
  }
);

export default DzgRadioGroup;
