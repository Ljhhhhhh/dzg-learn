import React from 'react';
import { Form } from 'antd';
import { Store } from 'antd/es/form/interface';
import AdForm from '../../components/AdForm';
import { ItemProps } from '../../components/AdForm/interface';
import './_style.less';

const formConfig: ItemProps = {
  input1: {
    formItemProps: {
      label: '联动控制input',
    },
    onChange: function () {
      console.log('onChange');
    },
    tag: 'Input',
  },
  input2: {
    formItemProps: {
      label: '联动控制checkbox',
    },
    tag: 'Input',
    linkageFn: (form, itemObj, i) => {
      const value = form.getFieldsValue();
      if (value.input1 === 'lujiehui') {
        itemObj.RadioGroup.update({
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
  DatePicker: {
    formItemProps: {
      label: '',
    },
    tag: 'DatePicker',
    layout: {
      span: 6,
    },
  },
  input4: {
    formItemProps: {
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
  icon: {
    onlyRender: true,
    formItemProps: {
      label: '',
    },
    render: () => '图标',
    layout: {
      span: 1,
    },
  },
};
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
