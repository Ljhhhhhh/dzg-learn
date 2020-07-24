import React from 'react';
import { TreeSelect } from 'antd';

class DzgTreeSelect extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return <TreeSelect {...this.props} />;
  }
}

export default DzgTreeSelect;
