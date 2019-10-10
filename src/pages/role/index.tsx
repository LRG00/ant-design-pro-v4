import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { StateType } from './model';
import { FormComponentProps } from 'antd/es/form';
import { Table, Form, Card } from 'antd';

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  role: StateType;
}

interface TableListState {
  // user: CurrentUser;
}
@connect(
  ({
    role, // 必须是model 的 namespace: 'role',
  }: {
    role: StateType;
  }) => ({
    role,
  }),
)
class Role extends Component<TableListProps, TableListState> {

  columns: object[] = [
    {
      title: 'ID',
      dataIndex: 'roleId',
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title: '所属公司',
      dataIndex: 'unitId',
    },
    {
      title: '备注',
      dataIndex: 'remark',
    },
    {
      title: '创建时间',
      dataIndex: 'created',
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'role/fetch',
    });
  }

  render() {
    const { role: { data } } = this.props
    return (
      <PageHeaderWrapper>
        <div>
        <Card bordered={false}>
          <Table
            rowKey='roleId'
            dataSource={data.list} 
            columns={this.columns}
          />
        </Card>

        </div>
      </PageHeaderWrapper>
    )
  }
}

export default Form.create<TableListProps>()(Role);