import React, { useState, useRef, useImperativeHandle } from 'react';
import { Select } from 'antd';
import { SelectProps, SelectValue, OptionType } from 'antd/es/select';
import _ from 'lodash';

const DzgSelect = React.forwardRef((props: any, ref: any) => {
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
});

export default DzgSelect;
