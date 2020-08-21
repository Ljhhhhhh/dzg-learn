import React from 'react';
import { Form } from 'antd';
import { Store } from 'antd/es/form/interface';
import AdForm from '../../components/AdForm';
import { IDzgItemProps } from '../../components/AdForm/interface';
import './_style.less';

const formConfig: IDzgItemProps[] = [
  {
    formItemProps: {
      name: 'input1',
      label: '联动控制input',
    },
    onChange: function () {
      console.log('onChange');
    },
    tag: 'Input',
    order: 3,
  },
  {
    formItemProps: {
      name: 'input2',
      label: '联动控制checkbox',
    },
    tag: 'Input',
    order: 2,
  },
  {
    formItemProps: {
      name: 'select',
      label: '选择框',
    },
    tag: 'Select',
    order: 1,
    options: [
      { label: '选项A', value: '1' },
      { label: '选项B', value: '2' },
    ],
  },
  {
    formItemProps: {
      name: 'RadioGroup',
      label: 'Radio组',
    },
    tag: 'Radio.Group',
    options: [
      { label: '选项A', value: '1' },
      { label: '选项B', value: '2' },
    ],
    linkageFn: (update, form) => {
      const value = form.getFieldsValue();
      if (value.input1 === 'lujiehui') {
        update({
          options: [
            { label: '选项一', value: '1' },
            { label: '选项二', value: '2' },
            { label: '选项三', value: '3' },
          ],
        });
        form.setFieldsValue({
          select: '1',
          input2: 'change',
        });
      }
    },
  },
  {
    formItemProps: {
      name: 'DatePicker',
      label: '',
    },
    tag: 'DatePicker',
    layout: {
      span: 6,
    },
  },
  {
    formItemProps: {
      name: 'input4',
      label: '',
      labelCol: {
        span: 0,
      },
    },
    onChange: function () {
      console.log('onChange');
    },
    tag: 'Input',
    layout: {
      span: 17,
    },
  },
  {
    formItemProps: {
      label: '',
    },
    render: () => '图标',
    layout: {
      span: 1,
    },
  },
];
const LinkageForm: React.FC = () => {
  const handleSubmit = (values: Store) => {
    console.log(values, 'form');
  };

  return (
    <div className="ad-form_demo">
      <div>
        <Form.Provider>
          <div>
            <AdForm name="myForm" onSubmit={handleSubmit} jsonItems={formConfig} />
          </div>
        </Form.Provider>
      </div>
    </div>
  );
};

export default LinkageForm;
