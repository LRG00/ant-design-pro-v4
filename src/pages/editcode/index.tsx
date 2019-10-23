import React, { Component, Fragment } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import moment from 'moment';
import { StateType } from './model';
import CreateForm from './components/CreateForm';
import { FormComponentProps } from 'antd/es/form';
import { Table, Form, Card, Button, message, Divider } from 'antd';

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  editcode: StateType;
}

interface TableListState {
  modalVisible: boolean;
  record: any;
}
@connect(({ editcode }: { editcode: StateType }) => ({
  // 必须是model 的 namespace: 'editcode',
  editcode,
}))
class editcode extends Component<TableListProps, TableListState> {
  state: TableListState = {
    modalVisible: false,
    record: {},
  };
  columns: object[] = [
    // {
    //   title: 'ID',
    //   dataIndex: 'editcodeId',
    // },
    {
      title: '示例名称',
      dataIndex: 'title',
    },
    {
      title: 'css代码',
      dataIndex: 'cssCode',
    },
    {
      title: 'html代码',
      dataIndex: 'htmlCode',
    },
    {
      title: 'js代码',
      dataIndex: 'jsCode',
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
          <a onClick={() => this.removeeditcode(record)}>删除</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'editcode/fetch',
    });
  }
  handleModalVisible = (flag?: boolean, record?: any) => {
    this.setState({
      modalVisible: !!flag,
      record,
    });
  };

  removeeditcode = (record: any) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'editcode/remove',
      payload: { ...record },
      callback: (res: any) => {
        if (res.status !== 500) {
          message.success('删除成功');
        }
      },
    });
  };

  handleAdd = (fields: any) => {
    console.log(fields, 'fields');
    const type = fields.editcodeId ? 'editcode/update' : 'editcode/add';
    const { dispatch } = this.props;
    dispatch({
      type,
      payload: { ...fields },
      callback: (res: any) => {
        if (res.status !== 500) {
          message.success(fields.editcodeId ? '修改成功' : '添加成功');
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
    const {
      editcode: { data },
    } = this.props;
    const { modalVisible, record } = this.state;
    console.log(record, 'l');
    return (
      <PageHeaderWrapper>
        <div>
          <Card bordered={false}>
            <Button
              style={{ marginBottom: '20px' }}
              icon="plus"
              type="primary"
              onClick={() => this.handleModalVisible(true)}
            >
              新建
            </Button>
            <Table rowKey="editcodeId" dataSource={data.list} columns={this.columns} />
          </Card>
          <CreateForm
            {...parentMethods}
            editcodeList={data.list}
            modalVisible={modalVisible}
            record={record}
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<TableListProps>()(editcode);
