import { Form, Input, Modal, Upload, Button, Icon } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React, { Component } from 'react';

const FormItem = Form.Item;

interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  musicList: object[];
  handleAdd: (fieldsValue: { desc: string }) => void;
  handleModalVisible: () => void;
  record: any;
}

export interface CreateFormState {
  radioType: string;
  response: any;
  musicList: object[];
}
class CreateForm extends Component<CreateFormProps, CreateFormState> {
  constructor(props: CreateFormProps) {
    super(props);

    this.state = {
      radioType: 'b',
      response: {},
      musicList: [],
    };
  }

  okHandle = () => {
    const { form, handleAdd, record = {} } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd({ ...fieldsValue, musicId: record.musicId, ...this.state.response });
    });
  };
  onChange = (value: any) => {
    console.log(value);
  };

  onTypeChange = (e: any) => {
    this.setState({
      radioType: e.target.value,
    });
  };
  normFile = (e: any) => {
    if (e.file.status === 'done') {
      const { response } = e.file;
      this.setState({
        response,
      });
    }
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  render() {
    const { modalVisible, form, handleModalVisible, record = {} } = this.props;
    console.log(record, this.state.response);
    // 一定要深拷贝 防止数组重复

    return (
      <Modal
        destroyOnClose
        title="新建菜单"
        visible={modalVisible}
        onOk={this.okHandle}
        onCancel={() => handleModalVisible()}
      >
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="音乐名称">
          {form.getFieldDecorator('name', {
            initialValue: record.name,
            rules: [{ required: true, message: '请输入音乐名称！' }],
          })(<Input placeholder="请输入" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="创作者">
          {form.getFieldDecorator('author', {
            initialValue: record.author,
            rules: [{ required: true, message: '请输入创作者！' }],
          })(<Input placeholder="请输入" />)}
        </FormItem>
        <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="上传音乐">
          {form.getFieldDecorator('upload', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload name="file" action="http://localhost:3000/api/upload" listType="picture">
              <Button>
                <Icon type="upload" /> 点击上传
              </Button>
            </Upload>,
          )}
        </Form.Item>
      </Modal>
    );
  }
}

export default Form.create<CreateFormProps>()(CreateForm);
