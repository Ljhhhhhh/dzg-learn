import React, { useEffect, createContext, useState } from 'react';
import { Form, Button, Row } from 'antd';
import { FormInstance } from 'antd/es/form';
import { FormChangeInfo } from 'rc-field-form/es/FormContext';
import { message } from '@dzg/common-utils';
import RenderFormItem from './dzgFormItem';
import useDebounceFn from '../../hooks/useDebounceFn';
import { IDzgFormProps, IFormContext } from './interface';
import './style.less';

export const FormContext = createContext<IFormContext>({
  itemObj: {},
  dropStore: {},
  linkageStore: {},
});

// 整体表单
let _Fid = 0;
const LAZY_TIME = 500;

const DzgForm: React.FC<IDzgFormProps> = props => {
  const _fid = ++_Fid;
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const {
    itemObj,
    delayMs,
    needReset,
    afterReset,
    submitText,
    resetText,
    renderMoreBtn,
    initialValue,
    onFormChange,
    onFormChangeLazy,
    name,
    onSubmit,
    children,
    ...formProps
  } = props;

  const _DelayMs = delayMs || LAZY_TIME;

  useEffect(() => {
    checkFiled();
  }, [itemObj]);

  useEffect(() => {
    if (initialValue) {
      form.setFieldsValue(initialValue);
      checkFiled();
    }
  }, []);

  // 重置表单
  const handleReset = () => {
    form.resetFields();
    afterReset && afterReset();
  };

  // 提交表单
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const value: any = await form.validateFields();
      onSubmit && onSubmit(value);
    } catch (error) {
      message.error('请先修正表单内容');
    } finally {
      setLoading(false);
    }
  };

  const dropStore: any = {};
  const linkageStore: any = {};
  const dropContext: IFormContext = {
    itemObj,
    dropStore,
    linkageStore,
    appendToDrop: (item: any) => {
      const { name, isDropFn, setDrop } = item;
      dropStore[name] = {
        isDropFn,
        setDrop,
      };
    },
    appendToLinkage: (item: any) => {
      const { name, linkageFn, itemObj, update, updateOptions } = item;
      linkageStore[name] = {
        itemObj,
        linkageFn: linkageFn || null,
        update,
        updateOptions,
      };
    },
  };

  const checkFiled = () => {
    // 设置需要被移除的字段
    Object.keys(dropStore).map((key: string) => {
      const { isDropFn, setDrop } = dropStore[key];
      const flag = isDropFn(form);
      setDrop(flag);
    });
    // 联动字段响应
    const linkageFns = Object.values(linkageStore).filter((item: any) => item.linkageFn);
    if (linkageFns.length) {
      // 把当前项的值也传出去
      linkageFns.map((item: any) => {
        const { itemObj, linkageFn } = item;
        linkageFn(form, itemObj);
      });
    }
  };

  const { run } = useDebounceFn(() => {
    checkFiled();
  }, _DelayMs);

  // 表单修改
  let flag: any;
  const handleFormChange = (name: string, info: FormChangeInfo) => {
    const values = info.forms[name].getFieldsValue();
    onFormChange && onFormChange(name, info, values);
    if (onFormChangeLazy) {
      if (!flag) {
        onFormChangeLazy(name, info, values);
        flag = true;
        let timer = setTimeout(() => {
          flag = false;
          clearTimeout(timer);
        }, _DelayMs);
      }
    }
    run();
  };

  // 按钮区域
  const formBtnWrap = (form: FormInstance) => {
    return (
      <>
        {needReset ? (
          <Button disabled={formProps.disabled} htmlType="reset" type="dashed" onClick={handleReset}>
            {resetText}
          </Button>
        ) : null}
        <Button disabled={formProps.disabled} loading={loading} onClick={handleSubmit} type="primary">
          {submitText}
        </Button>
        {renderMoreBtn && renderMoreBtn(form)}
      </>
    );
  };
  // createContext 存储子项实例
  return (
    <Form.Provider onFormChange={handleFormChange}>
      <FormContext.Provider value={dropContext}>
        <Form form={form} {...formProps} name={name || '__Form__' + _fid}>
          {children}
          <Row>
            {Object.keys(itemObj).map(formItemName => {
              itemObj[formItemName].formItemProps.name = formItemName;
              const key =
                formItemName + Date.now().toString() + (Math.floor(Math.random() * (9999 - 1000)) + 1000).toString();
              return <RenderFormItem key={key} form={form} formItem={itemObj[formItemName]} formProps={formProps} />;
            })}
          </Row>
          <div className="dzg-adform_btnwrap">{formBtnWrap(form)}</div>
        </Form>
      </FormContext.Provider>
    </Form.Provider>
  );
};

DzgForm.defaultProps = {
  submitText: '提交',
  resetText: '重置',
  needReset: true,
  disabled: false,
  delayMs: 500,
};

export default DzgForm;

// TODO:: formItem 排序
// TODO:: 自定义组件的 ref ts类型怎么写，目前是any
