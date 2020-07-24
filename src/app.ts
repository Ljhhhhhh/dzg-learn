

import React from 'react';
import theme from './theme';
import { ConfigProvider } from 'antd';

export function rootContainer(container: React.ReactNode) {
  return React.createElement(ConfigProvider, {
    prefixCls: theme["ant-prefix"]
  }, container);
}

