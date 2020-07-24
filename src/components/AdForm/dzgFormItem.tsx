import React, { useEffect, useContext, useState, useRef } from 'react';
import { Form, Col } from 'antd';
import { IDzgFormItemProps } from './interface';
import getFormItemTag from './formUtil';
import { FormContext } from './dzgForm';
import _ from 'lodash';

const FormItem = Form.Item;

const removeFunInObj = (obj: any) => {
  const objFilter = { ...obj };
  Object.keys(objFilter).map((key: any) => {
    if (Object.prototype.toString.call(objFilter[key]) === '[object Function]') {
      delete objFilter[key];
    }
    if (Object.prototype.toString.call(objFilter[key]) === '[object Object]') {
      removeFunInObj(objFilter[key]);
    }
  });
  if (objFilter.isDrop === undefined) {
    // 如果isDrop未定义 设置初始值
    objFilter.isDrop = false;
  }
  return objFilter;
};

// 表单子项
const RenderFormItem: React.FC<IDzgFormItemProps> = props => {
  const [propsData, setPropsData] = useState<any>(props);
  const { formItem, form, formProps } = propsData;
  const {
    formItemProps,
    tag,
    render,
    isDrop,
    isDropFn,
    linkageFn,
    children,
    update,
    itemObj,
    onSearch,
    layout,
    ...restProps
  } = formItem;
  const [drop, setDrop] = useState(false);
  const context = useContext(FormContext);
  const CompRef = useRef(null);

  const itemLayout = layout || { span: 24 };

  const updateWithProps = (newProps: any) => {
    const propsNew = {
      formItem: {
        ...formItem,
        ...newProps,
      },
      form,
      formProps,
    };

    // 不比较函数
    const newPropsToCompare = removeFunInObj(propsNew.formItem);
    const oldPropsToCompare = removeFunInObj(propsData.formItem);
    const flag = _.isEqual(newPropsToCompare, oldPropsToCompare);
    !flag && setPropsData({ ...propsNew });
  };

  useEffect(() => {
    console.log(CompRef.current, 'compref');
    // 如果是dzgSelect的时候 拿到他的updateOptions 啸子哥
    // if (CompRef.current && CompRef.current.updateOptions) {
    //   console.log(CompRef.current, 'compref');
    // }
  }, [CompRef]);

  useEffect(() => {
    const { name } = formItemProps;
    if (context.appendToDrop && isDropFn) {
      context.appendToDrop({
        name,
        isDropFn,
        setDrop,
      });
    }
    if (context.appendToLinkage) {
      context.appendToLinkage({
        itemObj: {
          ...context.linkageStore,
          [name]: {
            ...context.itemObj[name],
            update: updateWithProps,
          },
        },
        name,
        linkageFn: linkageFn ? linkageFn : null,
        update: updateWithProps,
      });
    }
  }, [context]);

  if (isDrop) return null;
  if (drop) return null;
  const { disabled } = formProps;
  const CompTag = render ? 'form-item-render' : tag;
  const Comp = getFormItemTag(CompTag);
  const key =
    formItemProps.name + Date.now().toString() + (Math.floor(Math.random() * (9999 - 1000)) + 1000).toString();

  if (formItem.hidden && tag?.toLowerCase() === 'input') {
    formItemProps.noStyle = true;
  }

  const searchProto = ['Select', 'TreeSelect'];
  if (onSearch && searchProto.includes(tag)) {
    restProps.onSearch = (e: any) => {
      const update = context.linkageStore[formItemProps.name].update;
      onSearch(e, update, form);
    };
  }

  return (
    <Col {...itemLayout}>
      <FormItem {...formItemProps} key={key}>
        {render ? (
          <div>{render(form, restProps, disabled)}</div>
        ) : Comp ? (
          <Comp {...restProps} disabled={disabled} ref={CompRef}>
            {children}
          </Comp>
        ) : null}
      </FormItem>
    </Col>
  );
};

export default RenderFormItem;
