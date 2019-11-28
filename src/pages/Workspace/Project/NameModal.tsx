import React, { useRef } from 'react';

import { Modal, Input } from 'antd';

export default (props: any) => {
  const { visible, onOk, onCancel } = props;

  const ref = useRef(null);

  const handleOk = () => {
    const target: any = ref.current;
    onOk(target.value);
  };

  return (
    <Modal
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Input ref={ref} placeholder="输入文件/文件夹名称" />
    </Modal>
  );
}
