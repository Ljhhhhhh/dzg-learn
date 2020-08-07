import React, { useState, useRef, useImperativeHandle } from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/es/select';
import _ from 'lodash';
import { valueType } from 'antd/lib/statistic/utils';

const DzgSelect: React.ForwardRefExoticComponent<React.RefAttributes<any>> = React.forwardRef(
  (props: SelectProps<valueType>, ref) => {
    const { options, ...restProps } = props;
    const [optionsData, setOptions] = useState(options);
    const selectRef = useRef(null);

    useImperativeHandle(ref, () => ({
      ref: selectRef,
      updateOptions: (opts: any) => {
        if (!_.isEqual(opts, optionsData)) {
          setOptions(opts);
        }
      },
    }));

    return <Select ref={selectRef} {...restProps} options={optionsData} />;
  }
);

export default DzgSelect;
