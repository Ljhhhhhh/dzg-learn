import React from 'react';
import { ItemProps } from '../../components/AdForm/interface';
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
  inputNumber: {
    formItemProps: {
      label: '数字输入框',
    },
    tag: 'InputNumber',
    min: 0,
    max: 5,
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
  radio: {
    formItemProps: {
      label: 'Radio',
    },
    tag: 'Radio',
    children: '选项A',
  },
  RadioGroup: {
    formItemProps: {
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
  switch: {
    formItemProps: {
      label: 'Switch',
    },
    tag: 'Switch',
  },
  Cascader: {
    formItemProps: {
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
  DatePicker: {
    formItemProps: {
      label: 'DatePicker',
    },
    tag: 'DatePicker',
  },
  DatePickerRange: {
    formItemProps: {
      label: 'DatePicker',
    },
    tag: 'DatePicker.RangePicker',
    picker: 'year',
  },
  Checkbox: {
    formItemProps: {
      label: 'Checkbox',
    },
    tag: 'Checkbox',
    children: 'dzg',
  },
  CheckboxGroup: {
    formItemProps: {
      label: 'CheckboxGroup',
    },
    tag: 'Checkbox.Group',

    options: [
      { label: 'Apple', value: 'Apple' },
      { label: 'Pear', value: 'Pear' },
      { label: 'Orange', value: 'Orange' },
    ],
  },
  TimePicker: {
    formItemProps: {
      label: 'TimePicker',
    },
    tag: 'TimePicker',
  },
  TimePickerRange: {
    formItemProps: {
      label: 'TimePicker.RangePicker',
    },
    tag: 'TimePicker.RangePicker',
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
};
export { formConfig };
