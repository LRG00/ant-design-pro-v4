import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { StateType } from './model';
import CreateForm from './components/CreateForm';
import { FormComponentProps } from 'antd/es/form';
import { Table, Form, Card, Button, message } from 'antd';

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  menu: StateType;
}

interface TableListState {
  modalVisible: boolean;
}
@connect(
  ({
    menu, // 必须是model 的 namespace: 'menu',
  }: {
    menu: StateType;
  }) => ({
    menu,
  }),
)
class Menu extends Component<TableListProps, TableListState> {

  state: TableListState = {
    modalVisible: false,
  };
  columns: object[] = [
    {
      title: 'ID',
      dataIndex: 'menuId',
    },
    {
      title: '角色名称',
      dataIndex: 'name',
    },
    {
      title: '上级菜单',
      dataIndex: 'parentName',
    },
    {
      title: '图标',
      dataIndex: 'icon',
    },
    {
      title: '类型',
      dataIndex: 'type',
    },
    {
      title: '排序号',
      dataIndex: 'orderNum',
    },
    {
      title: '菜单url',
      dataIndex: 'url',
    },
    {
      title: '授权标识',
      dataIndex: 'perms',
    },
    {
      title: '创建时间',
      dataIndex: 'created',
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'menu/fetch',
    });
  }

  handleModalVisible = (flag?: boolean) => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleAdd = (fields: any) => {
    console.log(fields, 'fields')
    // const { dispatch, user } = this.props;
    // dispatch({
    //   type: 'listTableList/add',
    //   payload: { article: { ...fields, userId: user.id } },
    //   callback: (res: any) => {
    //     if (res.status !== 500) {
    //       message.success('添加成功');
    //     }
    //   },
    // });

    this.handleModalVisible();
  };

  render() {
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const { menu: { data } } = this.props
    const { modalVisible } = this.state;
    return (
      <PageHeaderWrapper>
        <div>
        <Card bordered={false}>
          <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
            新建
          </Button>
          <Table
            rowKey='menuId'
            dataSource={data.list} 
            columns={this.columns}
          />
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
        </div>
      </PageHeaderWrapper>
    )
  }
}

export default Form.create<TableListProps>()(Menu);