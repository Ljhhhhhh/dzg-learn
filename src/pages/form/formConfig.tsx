import React from 'react';
import { ItemProps } from '../../components/AdForm/interface';
import { FormInstance } from 'antd/es/form';
import { Checkbox, Select } from 'antd';
import todos from './todos';

let treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        disabled: true,
        value: 1,
        children: [
          {
            title: 'leaf1',
            disableCheckbox: true,
            value: 2,
          },
          {
            title: 'leaf2',
            value: 3,
          },
        ],
      },
    ],
  },
];

const formConfig: ItemProps = {
  input: {
    formItemProps: {
      label: '输入框',
      rules: [{ required: true }],
      initialValue: '卢洁辉',
    },
    tag: 'Input',
  },
  textarea: {
    formItemProps: {
      label: '文本域',
      rules: [{ required: true }],
      initialValue: '卢洁辉',
    },
    tag: 'TextArea',
  },
  password: {
    formItemProps: {
      label: '密码',
    },
    tag: 'Password',
  },
  search: {
    formItemProps: {
      label: '搜索框',
    },
    tag: 'Search',
    onSearch: (value: string) => console.log(value),
  },
  select: {
    formItemProps: {
      label: '选择框',
    },
    tag: 'Select',
    mode: 'tags',
    options: [
      { label: '选项一', value: '1' },
      { label: '选项二', value: '2' },
      { label: '选项三', value: '3' },
    ],
    onSearch: (str: string, update: Function) => {
      const options = todos
        .filter(item => item.title.includes(str))
        .map(item => ({
          label: item.title,
          value: item.title,
        }));
      update({
        options: options,
      });
    },
  },
  tree: {
    formItemProps: {
      label: 'Tree',
    },
    tag: 'TreeSelect',
    treeData: treeData,
    showSearch: true,
    onSearch: (str: string, update: Function) => {
      console.log(str);
      update({
        treeData: [
          {
            title: 'parent 2-1',
            key: '2-0-1',
          },
        ],
      });
    },
  },
  hello: {
    formItemProps: {},
    render: () => <div>hello</div>,
  },
  // input2: {
  //   formItemProps: {
  //     label: '输入框2',
  //     rules: [{ required: true }],
  //     initialValue: '卢洁辉',
  //   },
  //   tag: 'Input',
  // },
  // 'is-drop-input': {
  //   formItemProps: {
  //     label: '输入框IS_DROP',
  //   },
  //   tag: 'Input',
  //   isDropFn: (form: FormInstance) => {
  //     return form.getFieldValue('input1') === '卢洁辉';
  //   },
  // },
  // selectAsync: {
  //   formItemProps: {
  //     label: '选择框',
  //   },
  //   tag: 'Select',
  //   showSearch: true,
  //   children: (
  //     <>
  //       <Select.Option value="A">A</Select.Option>
  //       <Select.Option value="B">B</Select.Option>
  //       <Select.Option value="C">C</Select.Option>
  //     </>
  //   ),
  //   onSearch: (e: string, update: any, form: any) => {
  //     console.log(e, form);
  //     if (e === 'ljh') {
  //       update({
  //         options: [{ label: '选项一', value: '1' }],
  //       });
  //     }
  //   },
  // },
  // checkboxGroup: {
  //   formItemProps: {
  //     label: 'Checkbox组',
  //   },
  //   tag: 'CheckboxGroup',
  //   linkageFn: (form, itemObj) => {
  //     const value = form.getFieldsValue();
  //     if (value.input1 === 'lujiehui') {
  //       // form.setFieldsValue({ checkboxGroup: '1' });
  //       itemObj.checkboxGroup.update({
  //         options: [
  //           { label: '选项一', value: '1' },
  //           { label: '选项二', value: '2' },
  //           { label: '选项三', value: '3' },
  //         ],
  //       });
  //     }
  //   },
  //   options: [
  //     { label: '选项A', value: '1' },
  //     { label: '选项B', value: '2' },
  //   ],
  // },
};
export { formConfig };
