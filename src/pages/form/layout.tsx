import React from 'react';
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
    layout: { span: 12 },
    labelWidth: 3,
  },
  input2: {
    formItemProps: {
      label: 'INPUT2',
      labelCol: { span: 12 },
      wrapperCol: {
        span: 12,
      },
    },
    tag: 'Input',
    layout: { span: 12 },
    labelWidth: 8,
  },
  select: {
    formItemProps: {
      label: '选择框',
      style: {
        width: '300px',
      },
    },
    tag: 'Select',
    labelStyle: {
      color: '#f33',
      width: '200px',
      textAlign: 'right',
    },
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
      {/* <div style={{ marginTop: 20 }}></div>
      <AdForm name="myForm2" onSubmit={handleSubmit} layout="vertical" jsonItems={formConfig} />
      <div style={{ marginTop: 20 }}></div>
      <AdForm name="myForm2" onSubmit={handleSubmit} layout="inline" jsonItems={formConfig} /> */}
    </div>
  );
};

export default LinkageForm;
