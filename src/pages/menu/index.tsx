import React, { Component, Fragment } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import moment from 'moment';
import { StateType } from './model';
import CreateForm from './components/CreateForm';
import { FormComponentProps } from 'antd/es/form';
import { Table, Form, Card, Button, message, Tag, Divider } from 'antd';
import { arrayToJson } from '@/utils/index'

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  menu: StateType;
}

interface TableListState {
  modalVisible: boolean;
  record: any;
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
    record: {}
  };
  columns: object[] = [
    // {
    //   title: 'ID',
    //   dataIndex: 'menuId',
    // },
    {
      title: '角色名称',
      dataIndex: 'name',
    },
    {
      title: '上级菜单',
      dataIndex: 'parentName',
      render: (val: string) => <span>{ val === '' ? '无' : val }</span>,
    },
    {
      title: '图标',
      dataIndex: 'icon',
    },
    {
      title: '类型',
      dataIndex: 'type',
      render(val: string) {
        if (val === 'a') {
          return (<Tag color="#108ee9">目录</Tag>)
        } else if (val === 'b'){
          return (<Tag color="#87d068">菜单</Tag>)
        } else {
          return (<Tag color="#f50">按钮</Tag>)
        }
      },
    },
    {
      title: '菜单路径',
      dataIndex: 'path',
    },
    {
      title: '授权标识',
      dataIndex: 'perms',
    },
    {
      title: '创建时间',
      dataIndex: 'created',
      render: (val: string) => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '操作',
      dataIndex: 'operat',
      render: (text: any, record: any) => (
        <Fragment>
          <a onClick={() => this.handleModalVisible(true, record)}>修改</a>
          <Divider type="vertical" />
          <a onClick={() => this.removeMenu(record)}>删除</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'menu/fetch',
    });
  }
  handleModalVisible = (flag?: boolean, record?: any) => {
    this.setState({
      modalVisible: !!flag,
      record
    });
  };

  removeMenu = (record: any) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'menu/remove',
      payload: { ...record },
      callback: (res: any) => {
        if (res.status !== 500) {
          message.success('删除成功');
        }
      },
    }); 
  }

  handleAdd = (fields: any) => {
    console.log(fields, 'fields')
    const type = fields.menuId ? 'menu/update' : 'menu/add'
    const { dispatch } = this.props;
    dispatch({
      type,
      payload: { ...fields },
      callback: (res: any) => {
        if (res.status !== 500) {
          message.success(fields.menuId ? '修改成功' : '添加成功');
        }
      },
    });

    this.handleModalVisible();
  };

  render() {
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const { menu: { data } } = this.props
    const newMenuList = JSON.parse(JSON.stringify(data.list))
    const { modalVisible, record } = this.state;
    return (
      <PageHeaderWrapper>
        <div>
        <Card bordered={false}>
          <Button style={{ marginBottom: '20px' }} icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
            新建
          </Button>
          <Table
            rowKey='menuId'
            dataSource={arrayToJson(newMenuList)} 
            columns={this.columns}
          />
        </Card>
        <CreateForm {...parentMethods} menuList={data.list} modalVisible={modalVisible} record={record} />
        </div>
      </PageHeaderWrapper>
    )
  }
}

export default Form.create<TableListProps>()(Menu);