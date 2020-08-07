import { Input, InputNumber, Radio, Checkbox, Cascader, DatePicker, TimePicker } from 'antd';
import { ITag } from './interface';
import DzgCheckbox from './dzgCheckbox';
import DzgSwitch from './dzgSwitch';
import DzgTreeSelect from './dzgTreeSelect';
import DzgSelect from './dzgSelect';

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
    case 'RadioGroup':
      comp = Radio.Group;
      break;
    case 'Checkbox':
      comp = DzgCheckbox;
      break;
    case 'CheckboxGroup':
      comp = Checkbox.Group;
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
    case 'DatePicker':
      comp = DatePicker;
      break;
    case 'TreeSelect':
      comp = DzgTreeSelect;
      break;
    // case 'Upload':
    //   comp = DzgUpload;
    //   break;
    case 'form-item-render':
      comp = null;
      break;
    default:
      console.error(`未注册${itemTag}组件，未注册${itemTag}的render函数`);
      comp = null;
      break;
  }
  return comp;
};

export default getFormItemTag;
