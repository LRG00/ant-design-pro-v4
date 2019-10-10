import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { StateType } from './model';
import { FormComponentProps } from 'antd/es/form';
import { Table, Form, Card, Tag } from 'antd';

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  sysUser: StateType;
}

interface TableListState {
  // user: CurrentUser;
}
@connect(
  ({
    sysUser, // 必须是model 的 namespace: 'sysUser',
  }: {
    sysUser: StateType;
  }) => ({
    sysUser,
  }),
)
class Role extends Component<TableListProps, TableListState> {

  columns: object[] = [
    {
      title: 'ID',
      dataIndex: 'userId',
    },
    {
      title: '角色名称',
      dataIndex: 'username',
    },
    {
      title: '所属公司',
      dataIndex: 'unitId',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render(val: boolean) {
        if (val) {
          return (<Tag color="#87d068">启用</Tag>)
        } else {
          return (<Tag color="#f50">禁用</Tag>)
        }
      },
    },
    {
      title: '创建时间',
      dataIndex: 'created',
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'sysUser/fetch',
    });
  }

  render() {
    const { sysUser: { data } } = this.props
    return (
      <PageHeaderWrapper>
        <div>
        <Card bordered={false}>
          <Table
            rowKey='userId'
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