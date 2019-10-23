import { Form, Input, Modal } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React, { Component } from 'react';

const FormItem = Form.Item;
const Textarea = Input.TextArea;

interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  editcodeList: object[];
  handleAdd: (fieldsValue: { desc: string }) => void;
  handleModalVisible: () => void;
  record: any;
}

export interface CreateFormState {
  radioType: string;
  response: any;
  editcodeList: object[];
}
class CreateForm extends Component<CreateFormProps, CreateFormState> {
  constructor(props: CreateFormProps) {
    super(props);

    this.state = {
      radioType: 'b',
      response: {},
      editcodeList: [],
    };
  }

  okHandle = () => {
    const { form, handleAdd, record = {} } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd({ ...fieldsValue, editcodeId: record.editcodeId, ...this.state.response });
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
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="示例名称">
          {form.getFieldDecorator('title', {
            initialValue: record.title,
            rules: [{ required: true, message: '请输入示例名称！' }],
          })(<Input placeholder="请输入" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="css代码">
          {form.getFieldDecorator('cssCode', {
            initialValue: record.cssCode,
            rules: [{ required: true, message: '请输入css代码！' }],
          })(<Textarea placeholder="请输入" autosize={{ minRows: 5 }} />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="html代码">
          {form.getFieldDecorator('htmlCode', {
            initialValue: record.htmlCode,
            rules: [{ required: true, message: '请输入html代码！' }],
          })(<Textarea placeholder="请输入" autosize={{ minRows: 5 }} />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="js代码">
          {form.getFieldDecorator('jsCode', {
            initialValue: record.jsCode,
            rules: [{ required: true, message: '请输入js代码！' }],
          })(<Textarea placeholder="请输入" autosize={{ minRows: 5 }} />)}
        </FormItem>
      </Modal>
    );
  }
}

export default Form.create<CreateFormProps>()(CreateForm);
