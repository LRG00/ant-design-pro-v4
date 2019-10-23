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
  music: StateType;
}

interface TableListState {
  modalVisible: boolean;
  record: any;
}
@connect(({ music }: { music: StateType }) => ({
  // 必须是model 的 namespace: 'music',
  music,
}))
class music extends Component<TableListProps, TableListState> {
  state: TableListState = {
    modalVisible: false,
    record: {},
  };
  columns: object[] = [
    // {
    //   title: 'ID',
    //   dataIndex: 'musicId',
    // },
    {
      title: '音乐名称',
      dataIndex: 'name',
    },
    {
      title: '创作者',
      dataIndex: 'author',
    },
    {
      title: '音乐路径',
      dataIndex: 'url',
    },
    {
      title: '大小',
      dataIndex: 'size',
    },
    {
      title: '类型',
      dataIndex: 'mimetype',
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
          <a onClick={() => this.removemusic(record)}>删除</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'music/fetch',
    });
  }
  handleModalVisible = (flag?: boolean, record?: any) => {
    this.setState({
      modalVisible: !!flag,
      record,
    });
  };

  removemusic = (record: any) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'music/remove',
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
    const type = fields.musicId ? 'music/update' : 'music/add';
    const { dispatch } = this.props;
    dispatch({
      type,
      payload: { ...fields },
      callback: (res: any) => {
        if (res.status !== 500) {
          message.success(fields.musicId ? '修改成功' : '添加成功');
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
      music: { data },
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
            <Table rowKey="musicId" dataSource={data.list} columns={this.columns} />
          </Card>
          <CreateForm
            {...parentMethods}
            musicList={data.list}
            modalVisible={modalVisible}
            record={record}
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<TableListProps>()(music);
