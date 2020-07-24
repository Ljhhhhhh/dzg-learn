import React, { useState, useRef } from 'react';
import { Select } from 'antd';
import { SelectProps, SelectValue, OptionType } from 'antd/es/select';

// type opt = Options;
// const DzgSelect: React.FC<SelectProps<SelectValue>> = props => {
//   const { options, ...restProps } = props;
//   const [optionsData, setOptions] = useState(options);
//   const selectRef = useRef(null);
//   if (optionsData && optionsData.length) {
//     restProps.options = optionsData;
//   }

//   const updateOptions = (opts: any) => {
//     setOptions(opts);
//   };
//   return <Select ref={selectRef} {...restProps} />;
// };

const DzgSelect = React.forwardRef((props: any, ref: React.Ref<React.ReactDOM>) => {
  const { options, ...restProps } = props;
  const [optionsData, setOptions] = useState(options);
  // const selectRef = useRef(null);
  if (optionsData && optionsData.length) {
    restProps.options = optionsData;
  }

  const updateOptions = (opts: any) => {
    console.log('updateOptions get it!');
    setOptions(opts);
  };
  return <Select ref={ref} {...restProps} />;
  // return <Select updateOptions={updateOptions} ref={ref} {...restProps} />;
});

export default DzgSelect;
