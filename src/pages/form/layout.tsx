import React, { useState } from 'react';
import { Form } from 'antd';
import { Store } from 'antd/es/form/interface';
import AdForm from '../../components/AdForm';
import { ItemProps } from '../../components/AdForm/interface';
import './_style.less';

const formConfig: ItemProps = {
  input1: {
    formItemProps: {
      label: 'INPUT1',
    },
    onChange: function () {
      console.log('onChange');
    },
    tag: 'Input',
  },
  input2: {
    formItemProps: {
      label: 'INPUT2',
    },
    tag: 'Input',
  },
  select: {
    formItemProps: {
      label: '选择框',
    },
    tag: 'Select',
    options: [
      { label: '选项A', value: '1' },
      { label: '选项B', value: '2' },
    ],
  },
  RadioGroup: {
    formItemProps: {
      label: 'Radio组',
    },
    tag: 'Radio.Group',
    options: [
      { label: '选项A', value: '1' },
      { label: '选项B', value: '2' },
    ],
  },
};
const LinkageForm: React.FC = () => {
  const handleSubmit = (values: Store) => {
    console.log(values, 'form');
  };

  return (
    <div className="ad-form_demo">
      <AdForm name="myForm" onSubmit={handleSubmit} jsonItems={formConfig} />
    </div>
  );
};

export default LinkageForm;
