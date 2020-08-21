import { FormItemProps, FormInstance, FormProps } from 'antd/es/form';
import { Store } from 'antd/es/form/interface';
import { CheckboxProps } from 'antd/lib/checkbox';
import { SwitchProps } from 'antd/lib/switch';

export type ITag =
  | 'Input'
  | 'TextArea'
  | 'Password'
  | 'Search'
  | 'Select'
  | 'InputNumber'
  | 'Radio'
  | 'RadioGroup'
  | 'Switch'
  | 'Cascader'
  | 'DatePicker'
  | 'DatePicker.RangePicker'
  | 'Checkbox'
  | 'CheckboxGroup'
  | 'TimePicker'
  | 'TimePicker.RangePicker'
  | 'TreeSelect'
  // | 'Upload' // TODO::
  | any;

export interface IAdCheckboxProps extends Omit<CheckboxProps, 'onChange'> {
  value?: boolean;
  onChange?: (value: boolean) => void;
}

export interface IDzgSwitchProps extends Omit<SwitchProps, 'onChange'> {
  value?: boolean;
  onChange?: (value: boolean) => void;
}

export type IRender = (form: FormInstance, props: any, disabled: boolean) => React.ReactNode;

export type ItemWithTag = {
  tag: ITag;
  render?: IRender;
};

export type ItemWithRender = {
  tag?: ITag;
  render: IRender;
};

export type IDropFn = (form: FormInstance) => boolean;
export type ILinkageFn = (update: (item: any) => void, form: FormInstance) => void;

export type IDzgItemProps = (ItemWithTag | ItemWithRender) & {
  formItemProps: FormItemProps; // formItem相关属性
  labelStyle?: any; // label自定义样式
  order?: number; // 排序
  layout?: any; // 布局 Col
  isDrop?: boolean; // 是否移除
  isDropFn?: IDropFn; // 是否移除函数
  linkageFn?: ILinkageFn; // 联动函数
  hidden?: boolean; // 隐藏
  children?: string | React.ReactNode; // children
  update?: any; // 更新FormItem方法
  className?: string; // formItem表单项样式 不包含label
  labelWidth?: number; // label宽度 单位是em
  dependencies?: string[];
  [key: string]: any;
};

export interface IDzgFormItemProps {
  formItem: IDzgItemProps;
  form: FormInstance;
  formProps: any;
}

export interface IDzgFormProps extends Omit<FormProps, 'onFormFinish'> {
  jsonItems: IDzgItemProps[]; // 表单项
  submitText?: string; // 提交按钮文案
  needReset?: boolean; // 是否需要重置按钮
  resetText?: string; // 重置按钮文案
  disabled?: boolean; // 禁用
  name?: string; // 表单name
  afterReset?: () => void; // 重置后事件
  onSubmit?: (data: any) => void; // 提交事件
  renderMoreBtn?: (form: FormInstance) => React.ReactNode; // 按钮区域更多内容
  initialValue?: Store; // 初始表单值
  needBtn?: boolean; // 是否需要按钮
  className?: string; // 表单项内容类名
  onFormChange?: ((changedValues: Store, allValues: Store) => void) | undefined; // 表单change回调
  delayMs?: number; // change触发延时
  onFormChangeLazy?: ((changedValues: Store, allValues: Store) => void) | undefined; // 表单change 延时回调
}

export interface IFormContext {
  // jsonItems: IDzgItemProps[];
  dropStore: any;
  linkageStore: any;
  appendToDrop?: (tem: any) => void;
  appendToLinkage?: (item: any) => void;
}
