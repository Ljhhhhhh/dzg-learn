import { FormItemProps, FormInstance, FormProps } from 'antd/es/form';
import { Store } from 'antd/es/form/interface';
import { FormChangeInfo } from 'rc-field-form/es/FormContext';
import { CheckboxProps } from 'antd/lib/checkbox';
import { SwitchProps } from 'antd/lib/switch';
import { FormItemLabelProps } from 'antd/lib/form/FormItemLabel';
import { FormItemInputProps } from 'antd/lib/form/FormItemInput';
import { FieldProps } from 'rc-field-form/lib/Field';

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
  | 'CheckBox'
  | 'CheckboxGroup'
  | 'TimePicker'
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
export type ILinkageFn = (form: FormInstance, itemObj: ItemProps, cb: any) => void;

export type IDzgItemProps = (ItemWithTag | ItemWithRender) & {
  formItemProps: FormItemProps;
  layout?: any;
  isDrop?: boolean;
  isDropFn?: IDropFn;
  linkageFn?: ILinkageFn;
  hidden?: boolean;
  children?: string | React.ReactNode;
  update?: any;
  [key: string]: any;
};

export interface IDzgFormItemProps {
  formItem: IDzgItemProps;
  form: FormInstance;
  formProps: any;
}

export interface ItemProps {
  [key: string]: IDzgItemProps;
}

export interface IDzgFormProps extends Omit<FormProps, 'onFormFinish'> {
  itemObj: ItemProps;
  submitText?: string;
  resetText?: string;
  delayMs?: number;
  needReset?: boolean;
  disabled?: boolean;
  name?: string;
  afterReset?: () => void;
  onSubmit?: (data: any) => void;
  renderMoreBtn?: (form: FormInstance) => React.ReactNode;
  initialValue?: Store;
  onFormChange?: ((name: string, info: FormChangeInfo, value: any) => void) | undefined;
  onFormChangeLazy?: ((name: string, info: FormChangeInfo, value: any) => void) | undefined;
}

export interface IFormContext {
  itemObj: ItemProps;
  dropStore: any;
  linkageStore: any;
  // dropStore: {
  //   name?: {
  //     setDrop: any;
  //     dropFn: any;
  //   };
  // };
  appendToDrop?: (tem: any) => void;
  appendToLinkage?: (item: any) => void;
}
