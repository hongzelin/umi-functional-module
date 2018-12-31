/*
 * @Author: lin.zehong 
 * @Date: 2018-08-22 13:35:11 
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2018-08-22 13:48:21
 * @Desc: 系统管理头部标题和查询条件组件 
 */
import React from 'react';
import { Row, Col, Form, Button, Input } from 'antd';
import PropTypes from 'prop-types';
import stylesG from './HeaderSearch.less';

const FormItem = Form.Item;
const { Search } = Input;

/**
 * title 左边标题
 * fieldName form表单查询传递的值
 * placeholder input提示
 * btnText 按钮的文字
 * handleSearch 查询方法
 * handleFormReset 重置方法
 * handleAdd 右边按钮方法
 */
@Form.create()
class HeaderSearch extends React.Component {

  handleSearch = () => {
    const { form, handleSearch } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      handleSearch(fieldsValue);
    });
  }

  handleFormReset = () => {
    const { form, handleFormReset } = this.props;
    form.resetFields();
    handleFormReset();
  }

  handleAdd = () => {
    const { handleAdd } = this.props;
    handleAdd();
  }

  render() {
    const { form, children } = this.props;
    const { getFieldDecorator } = form;
    const { title, fieldName, placeholder, btnText } = this.props;
    return (
      <Form>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} className={stylesG.tableHeard}>
          <Col className={stylesG.titleLeft} md={8} sm={24}>{title}</Col>
          <Col md={16} sm={24}>
            {children}
            <div className={`${stylesG.tableSearch} ${stylesG.sysSearch}`}>
              <FormItem>
                {getFieldDecorator(fieldName)(
                  <Search
                    className="zte-enterButton"
                    placeholder={placeholder}
                    style={{ width: 200 }}
                    onSearch={() => this.handleSearch()}
                    enterButton
                  />
                )}
              </FormItem>
              <Button icon="reload" onClick={() => this.handleFormReset()}>刷新</Button>
              <Button type="primary" icon="plus" onClick={() => this.handleAdd()}>{btnText}</Button>
            </div>
          </Col>
        </Row>
      </Form>
    );
  }
}

HeaderSearch.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  handleFormReset: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
  title: PropTypes.string,
  fieldName: PropTypes.string,
  placeholder: PropTypes.string,
  btnText: PropTypes.string,
};

HeaderSearch.defaultProps = {
  title: "系统管理",
  fieldName: "name",
  placeholder: "请输入",
  btnText: "新增",
};

export default HeaderSearch;
