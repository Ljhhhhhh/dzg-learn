import React, { useState, useRef, useImperativeHandle } from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';

const DzgButton = React.forwardRef((props: ButtonProps, ref) => {
  const [loading, setLoading] = useState(false);
  const compRef = useRef(null);

  useImperativeHandle(ref, () => ({
    ref: compRef,
    setLoading: (flag: boolean) => {
      setLoading(flag);
    },
  }));

  return <Button ref={compRef} {...props} loading={loading} />;
});

export default DzgButton;
