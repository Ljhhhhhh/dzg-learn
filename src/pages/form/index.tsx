import React, { useState } from 'react';
import { Button, Select } from 'antd';
import { FormInstance } from 'antd/es/form';
import { FormChangeInfo } from 'rc-field-form/es/FormContext';
import { Store } from 'antd/es/form/interface';
// import axios from 'axios';
import todos from './todos';
import AdForm from '../../components/AdForm';
import { ItemProps } from '../../components/AdForm/interface';
import { formConfig } from './formConfig';
import './_style.less';

interface IMockData {
  key: string;
  title: string;
  description: string;
  disabled: boolean;
}

const mockData: IMockData[] = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    disabled: i % 3 < 1,
  });
}

const formValue = {
  input1: '大掌柜',
};

const selectAfter = (
  <Select defaultValue=".com" className="select-after">
    <Select.Option value=".com">.com</Select.Option>
    <Select.Option value=".jp">.jp</Select.Option>
    <Select.Option value=".cn">.cn</Select.Option>
    <Select.Option value=".org">.org</Select.Option>
  </Select>
);

const JsonForm: React.FC = () => {
  const [itemObj, setItemObj] = useState<ItemProps>(formConfig);

  const validateMessages = {
    required: '${label}必填!',
    types: {
      email: '请正确填写${label}邮箱!',
      number: '${label} is not a validate number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  // form表单change事件
  const handleFormChange = (name: string, info: FormChangeInfo, value: any) => {
    console.log(value, 'value');
  };

  const handleSubmit = (values: Store) => {
    console.log(values, 'form');
  };

  const addField = () => {
    (itemObj['hello'] = {
      formItemProps: {
        label: '新增输入框',
      },
      tag: 'Input',
    }),
      setItemObj({ ...itemObj });
  };

  const renderMoreBtn = (form: FormInstance) => {
    return (
      <>
        <Button onClick={addField}>这是一个按钮</Button>
      </>
    );
  };

  return (
    <div className="ad-form_demo">
      <AdForm
        onFormChangeLazy={handleFormChange}
        size="small"
        initialValue={formValue}
        validateMessages={validateMessages}
        onSubmit={handleSubmit}
        itemObj={itemObj}
        renderMoreBtn={renderMoreBtn}
      />
    </div>
  );
};

export default JsonForm;
