import React from 'react';
import { ItemProps } from '../../components/AdForm/interface';
import { FormInstance } from 'antd/es/form';
import { Checkbox, Select } from 'antd';

const formConfig: ItemProps = {
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

  select: {
    formItemProps: {
      label: '选择框',
    },
    tag: 'Select',
    mode: 'tags',
    // showSearch: true,
    options: [
      { label: '选项一', value: '1' },
      { label: '选项二', value: '2' },
      { label: '选项三', value: '3' },
    ],
    layout: {
      span: 16,
    },
  },
  input2: {
    formItemProps: {
      label: '输入框2',
      rules: [{ required: true }],
      initialValue: '卢洁辉',
    },
    tag: 'Input',
  },
  'is-drop-input': {
    formItemProps: {
      label: '输入框IS_DROP',
    },
    tag: 'Input',
    isDropFn: (form: FormInstance) => {
      return form.getFieldValue('input1') === '卢洁辉';
    },
  },
  selectAsync: {
    formItemProps: {
      label: '选择框',
    },
    tag: 'Select',
    showSearch: true,
    children: (
      <>
        <Select.Option value="A">A</Select.Option>
        <Select.Option value="B">B</Select.Option>
        <Select.Option value="C">C</Select.Option>
      </>
    ),
    onSearch: (e: string, update: any, form: any) => {
      console.log(e, form);
      if (e === 'ljh') {
        update({
          options: [{ label: '选项一', value: '1' }],
        });
      }
    },
  },
  checkboxGroup: {
    formItemProps: {
      label: 'Checkbox组',
    },
    tag: 'CheckboxGroup',
    linkageFn: (form, itemObj) => {
      const value = form.getFieldsValue();
      if (value.input1 === 'lujiehui') {
        // form.setFieldsValue({ checkboxGroup: '1' });
        itemObj.checkboxGroup.update({
          options: [
            { label: '选项一', value: '1' },
            { label: '选项二', value: '2' },
            { label: '选项三', value: '3' },
          ],
        });
      }
    },
    options: [
      { label: '选项A', value: '1' },
      { label: '选项B', value: '2' },
    ],
  },
};
export { formConfig };
