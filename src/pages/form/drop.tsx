import React, { useState } from 'react';
import { Button } from 'antd';
import { FormInstance } from 'antd/es/form';
import { Store } from 'antd/es/form/interface';
import AdForm from '../../components/AdForm';
import { IDzgItemProps } from '../../components/AdForm/interface';
import './_style.less';

const formConfig: IDzgItemProps[] = [
  {
    formItemProps: {
      label: '是否展示输入框',
      name: 'switch',
      initialValue: true,
    },
    tag: 'Switch',
    layout: {
      span: 4,
    },
  },
  {
    formItemProps: {
      name: 'input',
      preserve: true,
      label: '输入框',
      rules: [{ required: true }],
    },
    tag: 'Input',
    layout: {
      span: 4,
    },
    isDropFn: (form: FormInstance) => {
      return !form.getFieldValue('switch');
    },
  },
];
const DropForm: React.FC = () => {
  const [itemObj, setItemObj] = useState<IDzgItemProps[]>(formConfig);

  // form表单change事件
  const handleFormChange = (changedValue: Store, allValues: Store) => {
    console.log(changedValue, 'value', allValues);
  };

  const handleSubmit = (values: Store) => {
    console.log(values, 'form');
  };

  const addField = () => {
    const tempItem = [
      ...itemObj,
      {
        formItemProps: {
          label: '新增输入框',
          name: 'new-input',
        },
        tag: 'Input',
        layout: {
          span: 4,
        },
        order: 0,
      },
    ];
    setItemObj(tempItem);
  };

  const renderMoreBtn = (form: FormInstance) => {
    return (
      <>
        <Button onClick={addField}>添加字段</Button>
      </>
    );
  };

  return (
    <AdForm
      className="margin20"
      name="myForm"
      onFormChangeLazy={handleFormChange}
      onSubmit={handleSubmit}
      jsonItems={itemObj}
      renderMoreBtn={renderMoreBtn}
    />
  );
};

export default DropForm;
