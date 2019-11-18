import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import { Table, Card, Button, Icon, Modal, Spin } from 'antd';
import router from 'umi/router';

import { naturalSorter } from '@/utils/lazy-ant/sorter';
import { searchFilter } from '@/utils/lazy-ant/filter';

import ModalUpsert from './ModalUpsert';

const Test: React.FC<any> = props => {
  const { dispatch, list, modalUpsertVisible, loading, current } = props;

  useEffect(() => {
    dispatch({
      type: 'test/list',
    });
  }, []);

  const columns: any[] = [
    {
      title: 'No.',
      dataIndex: '_idx',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Action',
      align: 'center',
      render: (txt: any, record: any) => (
        <React.Fragment>
          <Button
            type="link"
            icon="file-text"
            onClick={() => router.push(`/test/${record.id}`)}
          />
          <Button
            type="link"
            icon="edit"
            onClick={() => dispatch({type: 'test/showModalUpsert', payload: record})}
          />
          <Button
            type="link"
            icon="delete"
            onClick={() => handleDelete(record.id)}
          />
        </React.Fragment>
      ),
    },
  ];

  const handleAdd = (values: any) => {
    if (current) {
      dispatch({
        type: `test/update`,
        payload: {
          id: current.id,
          values,
        },
      });
    } else {
      dispatch({
        type: `test/create`,
        payload: values,
      });
    }
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Confirm',
      content: 'Do you confirm delete this test?',
      onOk: () => {
        dispatch({
          type: 'test/remove',
          payload: id,
        });
      },
    });
  };

  const dataSource = list.map((d: any, i: number) => ({...d, _idx: i + 1}));

  return (
    <Spin spinning={loading}>
      <div style={{ marginBottom: 15, textAlign: 'right' }}>
        <Button onClick={() => dispatch({ type: 'test/showModalUpsert' })}>
          <Icon type="plus" /> New
        </Button>
        <ModalUpsert
          visible={modalUpsertVisible}
          onOk={handleAdd}
          defaultValue={current}
          onCancel={() => dispatch({ type: 'test/hideModalUpsert' })}
        />
      </div>
      <Card bodyStyle={{ padding: 0 }}>
        <Table
          columns={columns}
          dataSource={dataSource}
          
          rowKey="id"
        />
      </Card>
    </Spin>
  );
};

export default connect(({ test, loading }: any) => ({
  ...test,
  loading: loading.models.test,
}))(Test);