import React, { useEffect, useContext, useState, useRef } from 'react';
import { Form, Col } from 'antd';
import { IDzgFormItemProps } from './interface';
import getFormItemTag from './formUtil';
import { FormContext, randomKey } from './dzgForm';
import _ from 'lodash';

const FormItem = Form.Item;
const updateInCompKeys = ['options', 'treeData'];

const removeFunInObj = (obj: any) => {
  const objFilter = { ...obj };
  updateInCompKeys.forEach(key => {
    if (objFilter[key]) {
      delete objFilter[key];
    }
  });
  Object.keys(objFilter).forEach((key: any) => {
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
  let {
    formItemProps,
    className,
    labelWidth,
    labelStyle,
    tag,
    dependencies,
    render,
    isDrop,
    isDropFn,
    linkageFn,
    children,
    update,
    onSearch,
    layout,
    ...restProps
  } = formItem;
  const [drop, setDrop] = useState(false);
  const context = useContext(FormContext);
  const CompRef = useRef<{ updateOptions: (options: any[]) => void }>(null);

  const itemLayout = layout || { span: 24 };

  const updateWithProps = (newProps: any) => {
    const { options, treeData, ...restProps } = newProps;
    const propsNew = {
      formItem: {
        ...formItem,
        ...restProps,
      },
      form,
      formProps,
    };

    // 不比较函数 removeFunInObj
    const newPropsToCompare = removeFunInObj(propsNew.formItem);
    const oldPropsToCompare = removeFunInObj(propsData.formItem);
    const flag = _.isEqual(newPropsToCompare, oldPropsToCompare);
    !flag && setPropsData({ ...propsNew });
    if ((options || treeData) && CompRef.current) {
      // checkbox
      let newOpt = options || treeData;
      // 如果是updateInCompKeys中定义的属性，则忽略此属性比对，走updateOptions方法
      const { updateOptions } = CompRef.current;
      updateOptions(newOpt);
    }
  };

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
        name,
        linkageFn,
        dependencies,
        update: updateWithProps,
      });
    }
  }, [context]);

  if (isDrop) return null;
  if (drop) return null;
  const { disabled } = formProps;
  const CompTag = render ? 'form-item-render' : tag;
  const Comp = getFormItemTag(CompTag);

  if (formItem.hidden) {
    formItemProps.noStyle = true;
  }

  const searchProto = ['Select', 'TreeSelect'];
  if (onSearch) {
    if (searchProto.includes(tag)) {
      restProps.onSearch = (e: any) => {
        const update = context.linkageStore[formItemProps.name].update;
        onSearch(e, update, form);
      };
    } else {
      restProps.onSearch = (e: string) => {
        onSearch(e);
      };
    }
  }

  if (labelStyle) {
    formItemProps.label = <span style={{ display: 'inline-block', ...labelStyle }}>{formItemProps.label}</span>;
  }

  let cname = className || '';
  if (typeof labelWidth === 'number') {
    cname = `${cname} form-item-label--${labelWidth.toFixed(1)}em`;
  }

  const key = randomKey();

  return (
    <Col {...itemLayout} className={cname}>
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
