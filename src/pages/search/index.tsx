import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Checkbox,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Transfer,
  Upload,
  TimePicker,
} from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { FormInstance, FormItemProps, FormProps } from 'antd/lib/form';
import { ColProps } from 'antd/lib/col';
import { Store } from 'antd/lib/form/interface';
import './index.less';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { RadioChangeEvent } from 'antd/lib/radio';

export interface IFormItem extends Partial<FormItemProps> {
  type: string;
  label: string;
  name: string;
  col?: ColProps;
  render?: (form: FormInstance, props: any) => React.ReactNode;
  disabled?: boolean | Function;
}

export interface ICustomizeFormProps<T extends object = {}> extends FormProps {
  form: FormInstance;
  formConfig: IFormItem[];
  disabled?: boolean;
  data?: T | null;
}

export interface IColLayout {
  span?: number;
  offset?: number;
}

export interface ILayout {
  labelCol?: IColLayout;
  wrapperCol?: IColLayout;
}

const plainOptions = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
];

const { RangePicker } = TimePicker;

interface IMockData {
  key: string;
  title: string;
  description: string;
  disabled: boolean;
}

const mockData: IMockData[] = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    disabled: i % 3 < 1,
  });
}

const originTargetKeys = mockData.filter(item => +item.key % 3 > 1).map(item => item.key);

const MyForm: React.FC<ICustomizeFormProps> = props => {
  const [targetKeys, setTargetKeys] = useState(originTargetKeys);
  const [selectedKeys, setSelectedKeys] = useState([]);

  const validateMessages = {
    required: '${label}必填!',
    types: {
      email: '请正确填写${label}邮箱!',
      number: '${label} is not a validate number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  const [layout, changeLayout] = useState<ILayout>({
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  });

  const [form] = Form.useForm();

  const onFinish = async (values: Store) => {
    console.log(form.getFieldsValue(['RangePicker']), 'form');
    const result = await form.validateFields();
    console.log(values, 'values', result);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log(errorInfo, 'error info');
  };

  const handleCheckboxChange = (checkedValues: CheckboxValueType[]) => {
    console.log('checked = ', checkedValues);
  };

  const handleRadioChange = (e: RadioChangeEvent) => {
    console.log(e, 'handleRadioChange');
  };

  const handleTransferChange = (nextTargetKeys: any, direction: any, moveKeys: any) => {
    setTargetKeys(nextTargetKeys);

    console.log('targetKeys: ', nextTargetKeys);
    console.log('direction: ', direction);
    console.log('moveKeys: ', moveKeys);
  };

  const handleTransferSelectChange = (sourceSelectedKeys: any, targetSelectedKeys: any) => {
    // setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    console.log('sourceSelectedKeys: ', sourceSelectedKeys);
    console.log('targetSelectedKeys: ', targetSelectedKeys);
  };

  const normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Form
      className="my-form"
      {...layout}
      form={form}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      validateMessages={validateMessages}
    >
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Name" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Select" name="select" rules={[{ required: true }]}>
        <Select>
          <Select.Option value="demo">Demo</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="TreeSelect">
        <TreeSelect treeData={[{ title: 'Light', value: 'light', children: [{ title: 'Bamboo', value: 'bamboo' }] }]} />
      </Form.Item>
      <Form.Item label="Cascader">
        <Cascader
          options={[
            {
              value: 'zhejiang',
              label: 'Zhejiang',
              children: [
                {
                  value: 'hangzhou',
                  label: 'Hangzhou',
                },
              ],
            },
          ]}
        />
      </Form.Item>
      <Form.Item label="DatePicker">
        <DatePicker />
      </Form.Item>
      <Form.Item label="InputNumber">
        <InputNumber />
      </Form.Item>
      <Form.Item label="Switch">
        <Switch />
      </Form.Item>
      <Form.Item label="Switch" name="checkbox-group">
        <Checkbox.Group options={plainOptions} defaultValue={['Pear']} onChange={handleCheckboxChange} />
      </Form.Item>
      <Form.Item label="radio" name="radio" rules={[{ required: true }]}>
        <Radio.Group onChange={handleRadioChange}>
          <Radio value={1}>A</Radio>
          <Radio value={2}>B</Radio>
          <Radio value={3}>C</Radio>
          <Radio value={4}>D</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Checkbox" name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
      <Form.Item label="transfer" name="transfer">
        <Transfer
          targetKeys={targetKeys}
          selectedKeys={selectedKeys}
          onChange={handleTransferChange}
          onSelectChange={handleTransferSelectChange}
          dataSource={mockData}
          titles={['Source', 'Target']}
          render={item => item.title || ''}
        />
      </Form.Item>
      <Form.Item label="RangePicker" name="RangePicker">
        <RangePicker />
      </Form.Item>
      <Form.Item label="Button">
        <Button htmlType="submit">Button</Button>
      </Form.Item>
      <Form.Item label="Dragger">
        <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
          <Upload.Dragger name="files" action="/upload.do">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>
    </Form>
  );
};

export default MyForm;
