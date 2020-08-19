import React from 'react';
import { Form, Input } from 'antd';
import { Store } from 'antd/es/form/interface';
import AdForm from '../../components/AdForm';
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

const BaseForm: React.FC = () => {
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
              jsonItems={formConfig}
            >
              <FormItem label="children" name="hello">
                <Input placeholder="this is children input"></Input>
              </FormItem>
            </AdForm>
          </div>
        </Form.Provider>
      </div>
    </div>
  );
};

export default BaseForm;
