import { connect } from 'dva';
// import { Table, Pagination, Popconfirm, Button } from 'antd';
import { Table, Popconfirm, Button, message } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Users.css';
import { PAGE_SIZE } from '../constants';
import UserModal from './UserModal';

function Users({ dispatch, list: dataSource, loading, total, page: current }) {
  function deleteHandler(id) {
    dispatch({
      type: 'users/remove',
      payload: id,
    });
  }
  function ddd() {
    message.success('dd');
  }
  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/users',
      query: { page },
    }));
  }
  function editHandler(id, values) {
    dispatch({
      type: 'users/patch',
      payload: { id, values },
    });
  }
  function createHandler(values) {
    dispatch({
      type: 'users/create',
      payload: values,
    });
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="">{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <UserModal record={record} onOk={editHandler.bind(null, record.id)}>{/* 不推荐这种写法，很难理解，推荐使用箭头函数；大概理解为，先绑定了函数，函数的第一个参数已经确定了，就是id，在modal调用的时候，传递的values自然就是函数的第二个参数了。 */}
            <a>Edit</a>
          </UserModal>
          <Popconfirm title="Confirm to delete?" onConfirm={() => deleteHandler(record.id)}>
            <a href="">Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];
  return (
    <div className={styles.normal}>
      <div>
        <div className={styles.create}>
          <UserModal record={{}} onOk={createHandler}>
            <Button type="primary" onClick={() => ddd()}>Create User</Button>
          </UserModal>
        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          rowKey={record => record.id}
          pagination={{
            className: "ant-table-pagination",
            total: total,
            current: current,
            pageSize: PAGE_SIZE,
            onChange: pageChangeHandler
          }}
        />
        {/* <Pagination
          className="ant-table-pagination"
          total={total}
          current={current}
          pageSize={PAGE_SIZE}
          onChange={pageChangeHandler}
        /> */}
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  const { list, total, page } = state.users;
  return {
    list,
    total,
    page,
    loading: state.loading.models.users
  };
}
export default connect(mapStateToProps)(Users);
