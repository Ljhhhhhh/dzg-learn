import React, { useEffect, createContext, useState, useRef } from 'react';
import { Form, Button, Row } from 'antd';
import { Store } from 'antd/es/form/interface';
import { FormInstance } from 'antd/es/form';
import { message } from '@dzg/common-utils';
import RenderFormItem from './dzgFormItem';
import useDebounceFn from '../../hooks/useDebounceFn';
import DzgButton from './dzgButton';
import { IDzgFormProps, IFormContext } from './interface';
import './style.less';

export const FormContext = createContext<IFormContext>({
  jsonItems: {},
  dropStore: {},
  linkageStore: {},
});

// 整体表单
let _Fid = 0;
const LAZY_TIME = 500;

const DzgForm: React.FC<IDzgFormProps> = props => {
  const _fid = ++_Fid;
  const [form] = Form.useForm();
  const submitBtnRef = useRef();

  const {
    jsonItems,
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
    needBtn,
    ...formProps
  } = props;

  const _DelayMs = delayMs || LAZY_TIME;

  useEffect(() => {
    checkFiled();
  }, [jsonItems]);

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
    const btnRef: any = submitBtnRef.current || {};
    btnRef.setLoading(true);
    try {
      const value: Store = await form.validateFields();
      onSubmit && onSubmit(value);
    } catch (error) {
      message.error('请先修正表单内容');
    } finally {
      btnRef.setLoading(false);
    }
  };

  const dropStore: any = {};
  const linkageStore: any = {};
  const dropContext: IFormContext = {
    jsonItems,
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
      const { name, linkageFn, jsonItems, update, updateOptions } = item;
      linkageStore[name] = {
        jsonItems,
        linkageFn: linkageFn || null,
        update,
        updateOptions,
      };
    },
  };

  const checkFiled = () => {
    // 设置需要被移除的字段
    Object.keys(dropStore).forEach((key: string) => {
      const { isDropFn, setDrop } = dropStore[key];
      const flag = isDropFn(form);
      setDrop(flag);
    });
    // 联动字段响应
    const linkageFns = Object.values(linkageStore).filter((item: any) => item.linkageFn);
    if (linkageFns.length) {
      // 把当前项的值也传出去
      linkageFns.forEach((item: any) => {
        const { linkageFn } = item;
        linkageFn(form, linkageStore);
      });
    }
  };

  const { run } = useDebounceFn(() => {
    checkFiled();
  }, _DelayMs);

  // 表单修改
  let flag: any;
  const handleFormChange = (changedValues: Store, allValues: Store) => {
    onFormChange && onFormChange(changedValues, allValues);
    if (onFormChangeLazy) {
      if (!flag) {
        onFormChangeLazy(changedValues, allValues);
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
    if (!needBtn) return null;
    return (
      <>
        {needReset ? (
          <Button disabled={formProps.disabled} htmlType="reset" type="dashed" onClick={handleReset}>
            {resetText}
          </Button>
        ) : null}
        <DzgButton disabled={formProps.disabled} ref={submitBtnRef} onClick={handleSubmit} type="primary">
          {submitText}
        </DzgButton>
        {renderMoreBtn && renderMoreBtn(form)}
      </>
    );
  };
  // createContext 存储子项实例
  return (
    <FormContext.Provider value={dropContext}>
      <Form form={form} {...formProps} name={name || '__Form__' + _fid} onValuesChange={handleFormChange}>
        {children}
        <Row>
          {Object.keys(jsonItems).map(formItemName => {
            jsonItems[formItemName].formItemProps.name = formItemName;
            const key =
              formItemName + Date.now().toString() + (Math.floor(Math.random() * (9999 - 1000)) + 1000).toString();
            return <RenderFormItem key={key} form={form} formItem={jsonItems[formItemName]} formProps={formProps} />;
          })}
        </Row>
        <div className="dzg-adform_btnwrap">{formBtnWrap(form)}</div>
      </Form>
    </FormContext.Provider>
  );
};

DzgForm.defaultProps = {
  submitText: '提交',
  resetText: '重置',
  needReset: true,
  disabled: false,
  delayMs: 500,
  needBtn: true,
};

export default DzgForm;
