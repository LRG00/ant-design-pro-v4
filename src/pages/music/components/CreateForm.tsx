import { Form, Input, Modal, Radio, InputNumber, TreeSelect, Select, Icon } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React, { Component } from 'react';
import { arrayToJson } from '@/utils/index'

const FormItem = Form.Item;
const { Option } = Select;

interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  menuList: object[];
  handleAdd: (fieldsValue: { desc: string }) => void;
  handleModalVisible: () => void;
  record: any
}

export interface CreateFormState {
  radioType: string;
  menuList: object[];
}
class CreateForm extends Component<CreateFormProps, CreateFormState>{
  constructor(props: CreateFormProps) {
    super(props);

    this.state = {
      radioType: 'b',
      menuList: []
    };
  }

  okHandle = () => {
    const { form, handleAdd, record={} } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd({...fieldsValue, menuId: record.menuId });
    });
  };
  onChange = (value: any) => {
    console.log(value);
  };

  onTypeChange = (e: any) => {
    this.setState({
      radioType: e.target.value
    })
  };

  render() {
    const { modalVisible, form, handleModalVisible, menuList, record={} } = this.props;
    console.log(record)
    // 一定要深拷贝 防止数组重复
    const newMenuList = JSON.parse(JSON.stringify(menuList))
    let treeData: any = []
    if (modalVisible) {
      treeData = [
        {
          title: '顶级菜单',
          value: '0',
          key: '0',
          children: arrayToJson(newMenuList),
        }
      ];
    }

    let { radioType } = this.state
    if (record.type) {
      radioType = record.type
    }
    const formChange = {
      a: { label: '目录名称', hasOrder: true, hasPerms: false, hasIcon: true, hasUrl: false },
      b: { label: '菜单名称', hasOrder: true, hasPerms: true, hasIcon: true, hasUrl: true },
      c: { label: '按钮名称', hasOrder: false, hasPerms: true, hasIcon: false, hasUrl: false },
    }
    console.log(formChange[radioType].label, radioType)
    return (
      <Modal
        destroyOnClose
        title="新建菜单"
        visible={modalVisible}
        onOk={this.okHandle}
        onCancel={() => handleModalVisible()}
      >
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="菜单类型">
          {form.getFieldDecorator('type', {
            initialValue: record.type || 'a',
            rules: [{ required: true, message: '请输入菜单类型！' }],
          })(            
            <Radio.Group onChange={this.onTypeChange}>
              <Radio value="a">目录</Radio>
              <Radio value="b">菜单</Radio>
              <Radio value="c">按钮</Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label={formChange[radioType].label}>
          {form.getFieldDecorator('name', {
            initialValue: record.name,
            rules: [{ required: true, message: '请输入菜单名称！' }],
          })(<Input placeholder="请输入" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="上级菜单">
          {form.getFieldDecorator('parentId', {
            initialValue: record.parentId,
            rules: [{ required: true, message: '请输入上级菜单！' }],
          })(
            <TreeSelect
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={treeData}
            placeholder="请选择"
            treeDefaultExpandAll
            onChange={this.onChange}
          />
          )}
        </FormItem>
        {
          formChange[radioType].hasUrl ? (
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="菜单路由">
            {form.getFieldDecorator('path', {
              initialValue: record.path,
              rules: [{ required: false, message: '请输入菜单路由！' }],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          ) : null
        }

        {
          formChange[radioType].hasPerms ? (
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="授权标识">
            {form.getFieldDecorator('perms', {
              initialValue: record.perms,
              rules: [{ required: false, message: '请选择授权标识！' }],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          ) : null
        }

        {
          formChange[radioType].hasOrder ? (
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="排序号">
            {form.getFieldDecorator('orderNum', {
              initialValue: record.orderNum,
              rules: [{ required: false, message: '请选择排序号！' }],
            })(<InputNumber style={{ width: '100%' }} min={1} max={10} />)}
          </FormItem>
          ) : null
        }

        {
          formChange[radioType].hasIcon ? (
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="菜单图标">
            {form.getFieldDecorator('icon', {
              initialValue: record.icon,
              rules: [{ required: false, message: '请选择菜单图标！' }],
            })(
              <Select
                showSearch
                style={{ width: '100%' }}
                placeholder="请选择"
                optionFilterProp="children"
              >
                <Option value="box-plot"><Icon type="box-plot" /></Option>
                <Option value="radar-chart"><Icon type="radar-chart" /></Option>
                <Option value="heat-map"><Icon type="heat-map" /></Option>
              </Select>
            )}
          </FormItem>
          ) : null
        }
      </Modal>
    );
  }

};

export default Form.create<CreateFormProps>()(CreateForm);
