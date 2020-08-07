import React, { useState, useRef, useImperativeHandle } from 'react';
import { TreeSelect } from 'antd';
import _ from 'lodash';
import { TreeSelectProps } from 'antd/lib/tree-select';

const DzgTreeSelect: React.ForwardRefExoticComponent<React.RefAttributes<any>> = React.forwardRef(
  (props: TreeSelectProps<any>, ref) => {
    const { treeData, ...restProps } = props;
    const [optionsData, setOptions] = useState(treeData);
    const compRef = useRef(null);

    useImperativeHandle(ref, () => ({
      ref: compRef,
      updateOptions: (opts: any) => {
        if (!_.isEqual(opts, optionsData)) {
          setOptions(opts);
        }
      },
    }));

    return <TreeSelect ref={compRef} {...restProps} treeData={optionsData} />;
  }
);

export default DzgTreeSelect;
