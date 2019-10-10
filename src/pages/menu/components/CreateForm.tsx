import { Form, Input, Modal, Radio, InputNumber, TreeSelect } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React from 'react';

const FormItem = Form.Item;

interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  handleAdd: (fieldsValue: { desc: string }) => void;
  handleModalVisible: () => void;
}
const CreateForm: React.FC<CreateFormProps> = props => {
  const state = {
    value: undefined,
  };
  const treeData = [
    {
      title: 'Node1',
      value: '0-0',
      key: '0-0',
      children: [
        {
          title: 'Child Node1',
          value: '0-0-1',
          key: '0-0-1',
        },
        {
          title: 'Child Node2',
          value: '0-0-2',
          key: '0-0-2',
        },
      ],
    },
    {
      title: 'Node2',
      value: '0-1',
      key: '0-1',
    },
  ];
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  const onChange = (value: any) => {
    console.log(value);
    // this.setState({ value });
  };
  return (
    <Modal
      destroyOnClose
      title="新建菜单"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="菜单类型">
        {form.getFieldDecorator('type', {
          rules: [{ required: true, message: '请输入菜单类型！' }],
        })(            
          <Radio.Group>
            <Radio value="a">目录</Radio>
            <Radio value="b">菜单</Radio>
            <Radio value="c">按钮</Radio>
          </Radio.Group>
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="菜单名称">
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入菜单名称！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="上级菜单">
        {form.getFieldDecorator('parentId', {
          rules: [{ required: true, message: '请输入上级菜单！' }],
        })(
          <TreeSelect
          style={{ width: '100%' }}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          treeData={treeData}
          placeholder="Please select"
          treeDefaultExpandAll
          onChange={onChange}
        />
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="菜单路由">
        {form.getFieldDecorator('url', {
          rules: [{ required: true, message: '请输入菜单路由！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="授权标识">
        {form.getFieldDecorator('perms', {
          rules: [{ required: true, message: '请选择授权标识！' }],
        })(<Input placeholder="请选择" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="排序号">
        {form.getFieldDecorator('orderNum', {
          rules: [{ required: true, message: '请选择排序号！' }],
        })(<InputNumber min={1} max={10} />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="菜单图标">
        {form.getFieldDecorator('icon', {
          rules: [{ required: true, message: '请选择菜单图标！' }],
        })(<Input placeholder="请选择" />)}
      </FormItem>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);
