import React, { useState } from 'react';
import { Button, Select, Form, Input } from 'antd';
import { FormInstance } from 'antd/es/form';
import { FormChangeInfo } from 'rc-field-form/es/FormContext';
import { Store } from 'antd/es/form/interface';
// import axios from 'axios';
import todos from './todos';
import AdForm from '../../components/AdForm';
import { ItemProps } from '../../components/AdForm/interface';
import { formConfig } from './formConfig';
import './_style.less';

const FormItem = Form.Item;

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
  // input1: '大掌柜',
};

const selectAfter = (
  <Select defaultValue=".com" className="select-after">
    <Select.Option value=".com">.com</Select.Option>
    <Select.Option value=".jp">.jp</Select.Option>
    <Select.Option value=".cn">.cn</Select.Option>
    <Select.Option value=".org">.org</Select.Option>
  </Select>
);

const config2: ItemProps = {
  input1: {
    formItemProps: {
      label: '输入框1',
      rules: [{ required: true }],
      initialValue: '卢洁辉',
    },
    tag: 'Input',
    layout: {
      span: 8,
    },
  },
};

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
  const handleFormChange = (changedValue: Store, allValues: Store) => {
    console.log(changedValue, 'value', allValues);
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
      <div>
        <Form.Provider>
          <div>
            <AdForm
              name="myForm"
              onFormChangeLazy={handleFormChange}
              size="small"
              initialValue={formValue}
              validateMessages={validateMessages}
              onSubmit={handleSubmit}
              jsonItems={itemObj}
              // renderMoreBtn={renderMoreBtn}
              // needBtn={false}
            >
              <FormItem label="children" name="hello">
                <Input placeholder="this is children input"></Input>
              </FormItem>
            </AdForm>
          </div>
          {/* <div>
            <AdForm
              name="myForm"
              onFormChangeLazy={handleFormChange}
              size="small"
              initialValue={formValue}
              validateMessages={validateMessages}
              onSubmit={handleSubmit}
              jsonItems={config2}
              renderMoreBtn={renderMoreBtn}
              // needBtn={false}
            />
          </div> */}
        </Form.Provider>
      </div>

      {/* <div>
        <AdForm onFormChangeLazy={handleFormChange} onSubmit={handleSubmit} itemObj={config2} />
      </div> */}
    </div>
  );
};

export default JsonForm;
