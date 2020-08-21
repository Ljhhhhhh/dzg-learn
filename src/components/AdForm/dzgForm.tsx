import React, { useEffect, createContext, useState, useRef } from 'react';
import { Form, Button, Row } from 'antd';
import { Store } from 'antd/es/form/interface';
import { FormInstance } from 'antd/es/form';
import { message } from '@dzg/common-utils';
import _ from 'lodash';
import RenderFormItem from './dzgFormItem';
import useDebounceFn from '../../hooks/useDebounceFn';
import DzgButton from './dzgButton';
import { IDzgFormProps, IFormContext, IDzgItemProps } from './interface';
import './style.less';

// TODO 联动项的依赖关系
// TODO 表单项label的绝对宽度、样式
// TODO 只渲染，form值不需要的情况
// TODO 表单排序
// TODO 移除字段后保留值

export const FormContext = createContext<IFormContext>({
  jsonItems: [],
  dropStore: {},
  linkageStore: {},
});

export const randomKey = () => Date.now().toString() + (Math.floor(Math.random() * (9999 - 1000)) + 1000).toString();

// 整体表单
let _Fid = 0;
const LAZY_TIME = 500;

const DzgForm: React.FC<IDzgFormProps> = props => {
  const _fid = ++_Fid;
  const [formList, setFormList] = useState<IDzgItemProps[]>([]);
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
    className,
    ...formProps
  } = props;

  const _DelayMs = delayMs || LAZY_TIME;

  useEffect(() => {
    sortFormItems();
    if (initialValue) {
      form.setFieldsValue(initialValue);
    }
  }, [jsonItems]);

  // 表单项排序
  const sortFormItems = () => {
    let relFormList: Array<IDzgItemProps> = [];
    relFormList = jsonItems.map((e, index) => {
      if (!e.order && e.order !== 0) {
        e.order = index;
        return e;
      }
      return e;
    });
    relFormList = _.orderBy(relFormList, ['order'], ['asc']);
    setFormList(relFormList);
  };

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
      if (isDropFn) {
        // 初始化的时候运行一次
        const flag = isDropFn(form);
        setDrop(flag);
      }
    },
    appendToLinkage: (item: any) => {
      const { name, linkageFn, jsonItems, update } = item;
      linkageStore[name] = {
        jsonItems,
        linkageFn: linkageFn || null,
        update,
      };
      linkageFn && linkageFn(update, form); // 初始化的时候运行一次
    },
  };

  const checkFields = () => {
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
        const { linkageFn, update } = item;
        linkageFn(update, form);
      });
    }
  };

  const { run } = useDebounceFn(() => {
    checkFields();
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
    console.log(changedValues, 'changedValues');
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
    <div className={className}>
      <FormContext.Provider value={dropContext}>
        <Form
          form={form}
          {...formProps}
          name={name || '__Form__' + _fid}
          onValuesChange={handleFormChange}
          className="loopingClass"
        >
          {children}
          <Row>
            {formList.map((item: IDzgItemProps) => {
              const key = randomKey();
              return <RenderFormItem key={key} form={form} formItem={item} formProps={formProps} />;
            })}
          </Row>
          <div className="dzg-adform_btnwrap">{formBtnWrap(form)}</div>
        </Form>
      </FormContext.Provider>
    </div>
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
