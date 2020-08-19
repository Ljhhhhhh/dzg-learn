import { Input, InputNumber, Radio, Cascader, DatePicker, TimePicker } from 'antd';
import { ITag } from './interface';
import DzgCheckbox from './dzgCheckbox';
import DzgSwitch from './dzgSwitch';
import DzgTreeSelect from './dzgTreeSelect';
import DzgSelect from './dzgSelect';
import DzgRadioGroup from './dzgRadioGroup';
import DzgCheckboxGroup from './dzgCheckboxGroup';

const getFormItemTag = (itemTag: ITag) => {
  let comp;
  switch (itemTag) {
    case 'Input':
      comp = Input;
      break;
    case 'TextArea':
      comp = Input.TextArea;
      break;
    case 'Password':
      comp = Input.Password;
      break;
    case 'Search':
      comp = Input.Search;
      break;
    case 'InputNumber':
      comp = InputNumber;
      break;
    case 'Select':
      comp = DzgSelect;
      break;
    case 'Radio':
      comp = Radio;
      break;
    case 'Radio.Group':
      comp = DzgRadioGroup;
      break;
    case 'Checkbox':
      comp = DzgCheckbox;
      break;
    case 'Checkbox.Group':
      comp = DzgCheckboxGroup;
      break;
    case 'Switch':
      comp = DzgSwitch;
      break;
    case 'Cascader':
      comp = Cascader;
      break;
    case 'TimePicker':
      comp = TimePicker;
      break;
    case 'TimePicker.RangePicker':
      comp = TimePicker.RangePicker;
      break;
    case 'DatePicker':
      comp = DatePicker;
      break;
    case 'DatePicker.RangePicker':
      comp = DatePicker.RangePicker;
      break;
    case 'TreeSelect':
      comp = DzgTreeSelect;
      break;

    case 'form-item-render':
      comp = null;
      break;
    // case 'Upload':
    //   comp = DzgUpload;
    //   break;
    // case 'AutoComplete':
    //   comp = AutoComplete;
    //   break;
    // case 'Transfer':
    //   comp = Transfer;
    //   break;
    default:
      console.error(`未注册${itemTag}组件，未注册${itemTag}的render函数`);
      comp = null;
      break;
  }
  return comp;
};

export default getFormItemTag;
