import React from 'react';
import { Link } from 'umi';
import './index.css';

const BasicLayout: React.FC = props => {
  return (
    <div className="layout-normal">
      <div>
        <Link to="/">基础功能</Link>|<Link to="/drop">Drop功能</Link>|<Link to="/linkage">联动功能</Link>|
        <Link to="/layout">布局</Link>
      </div>
      {props.children}
    </div>
  );
};

export default BasicLayout;
