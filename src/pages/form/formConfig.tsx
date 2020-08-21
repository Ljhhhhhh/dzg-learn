import React from 'react';
import { IDzgItemProps } from '../../components/AdForm/interface';
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

const formConfig: IDzgItemProps[] = [
  {
    formItemProps: {
      name: 'input',
      label: '输入框',
      rules: [{ required: true }],
      initialValue: '卢洁辉',
    },
    tag: 'Input',
  },
  {
    formItemProps: {
      name: 'textarea',
      label: '文本域',
      rules: [{ required: true }],
      initialValue: '卢洁辉',
    },
    tag: 'TextArea',
  },
  {
    formItemProps: {
      name: 'password',
      label: '密码',
    },
    tag: 'Password',
  },
  {
    formItemProps: {
      name: 'search',
      label: '搜索框',
    },
    tag: 'Search',
    onSearch: (value: string) => console.log(value),
  },
  {
    formItemProps: {
      name: 'inputNumber',
      label: '数字输入框',
    },
    tag: 'InputNumber',
    min: 0,
    max: 5,
  },
  {
    formItemProps: {
      name: 'select',
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
  {
    formItemProps: {
      name: 'radio',
      label: 'Radio',
    },
    tag: 'Radio',
    children: '选项A',
  },
  {
    formItemProps: {
      name: 'RadioGroup',
      label: 'RadioGroup',
    },
    tag: 'Radio.Group',
    options: [
      { label: 'Apple', value: 'Apple' },
      { label: 'Pear', value: 'Pear' },
      { label: 'Orange', value: 'Orange' },
    ],
    onChange: (e: any) => {
      console.log('radio2 checked', e.target.value);
    },
  },
  {
    formItemProps: {
      name: 'switch',
      label: 'Switch',
    },
    tag: 'Switch',
  },
  {
    formItemProps: {
      name: 'Cascader',
      label: 'Cascader',
    },
    tag: 'Cascader',
    options: [
      {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
          {
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [
              {
                value: 'xihu',
                label: 'West Lake',
              },
            ],
          },
        ],
      },
      {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
          {
            value: 'nanjing',
            label: 'Nanjing',
            children: [
              {
                value: 'zhonghuamen',
                label: 'Zhong Hua Men',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    formItemProps: {
      name: 'DatePicker',
      label: 'DatePicker',
    },
    tag: 'DatePicker',
  },
  {
    formItemProps: {
      name: 'DatePickerRange',
      label: 'DatePicker',
    },
    tag: 'DatePicker.RangePicker',
    picker: 'year',
  },
  {
    formItemProps: {
      name: 'Checkbox',
      label: 'Checkbox',
    },
    tag: 'Checkbox',
    children: 'dzg',
  },
  {
    formItemProps: {
      name: 'CheckboxGroup',
      label: 'CheckboxGroup',
    },
    tag: 'Checkbox.Group',

    options: [
      { label: 'Apple', value: 'Apple' },
      { label: 'Pear', value: 'Pear' },
      { label: 'Orange', value: 'Orange' },
    ],
  },
  {
    formItemProps: {
      name: 'TimePicker',
      label: 'TimePicker',
    },
    tag: 'TimePicker',
  },
  {
    formItemProps: {
      name: 'TimePickerRange',
      label: 'TimePicker.RangePicker',
    },
    tag: 'TimePicker.RangePicker',
  },
  {
    formItemProps: {
      name: 'tree',
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
  {
    formItemProps: {},
    render: () => <div>hello</div>,
  },
];
export { formConfig };
