import { Message } from 'antd';
import { routerRedux } from 'dva/router'
import * as constants from '../constants/constants'
import * as services from '../services/taskFLowService'

const globalEndpoints = 'CroppedImage StructedData Vector StructedData+Vector CroppedImage OriginalImage OriginalImage+StructedData+Vector RtspUrl'; // eslint-disable-line

const beginAndEndNodeData = {
  nodeData: [{
    id: -2,
    endpointId: -2,
    uuid: 'start_2_A9IQY1560309400001',
    type: 'start',
    x: 240,
    y: 50,
    taskId: -1,
    name: '开始节点',
    sourceEndpoints: [{
      dataType: globalEndpoints,
    }],
  }, {
    id: -3,
    endpointId: -3,
    uuid: 'end_3_A9IQY1560309400002',
    type: 'end',
    x: 240,
    y: 200,
    taskId: -1,
    name: '结束节点',
    targetEndpoints: [{
      dataType: globalEndpoints,
    }],
  }],
  connectionData: [],
}

const initialState = {
  nodeList: [],
  dataSource: {
    nodeData: [],
    connectionData: [],
  },
  Query: {},
  mainContainerPosition: {}, // 主绘图区域container坐标值
  stategys: [], // 策略
  algorithmList: [], // 算子列表
  algoDetail: {}, // 算子详情
  allStdoKey: '', // 算子所有输出，作为策略端点的scope作用域，匹配所有算子输入
  isActiveAlgo: '-1', // 点击当前算子
  historyRecord: [], // 历史记录，撤回
  isPass: false, // 保存验证是否通过
  runLocation: [], // 保存所有计算位置
}

export default {
  namespace: constants.NAMESPACE,
  state: initialState,
  reducers: {
    setNodelistData(state, action) {
      const { payload = {} } = action
      return {
        ...state,
        ...payload,
      }
    },
    setDataSource(state, action) {
      const { payload = {} } = action
      return {
        ...state,
        ...payload,
      }
    },
    dump(state, action) {
      const { payload = {} } = action
      return {
        ...state,
        ...payload,
      }
    },
    clear() {
      return {
        ...initialState,
      }
    },
  },
  effects: {
    * getStategys({ payload }, { call, put }) {
      const { errCode, data } = yield call(services.stategysForTask, payload)
      if (errCode === '0' && data && data.all) {
        yield put({
          type: 'dump',
          payload: {
            stategys: data.all || [],
          },
        })
      }
    },
    * getAlgorithmList({ payload }, { call, put }) {
      const { errCode, data } = yield call(services.algoForTask, payload)
      if (errCode === '0' && data) {
        yield put({
          type: 'dump',
          payload: {
            algorithmList: data,
          },
        })
      }
    },
    * getAlgorithmDetails({ payload }, { call, put }) {
      const { errCode, data } = yield call(services.algorithmDetails, payload)
      if (errCode === '0' && data) {
        yield put({
          type: 'dump',
          payload: {
            algoDetail: data,
          },
        })
      }
    },
    * getUpDownStreams1(action, { put }) {
      yield put({
        type: 'dump',
        payload: {
          dataSource: beginAndEndNodeData,
        },
      })
      return beginAndEndNodeData;
    },
    * getUpDownStreams({ payload }, { call, put }) {
      const { errCode, data } = yield call(services.getupDownStream, payload)
      if (errCode === '0' && data) {
        const ds = {
          nodeData: data.dataStreams || [],
          connectionData: data.connections || [],
        }
        yield put({
          type: 'dump',
          payload: {
            dataSource: ds,
            isPass: data.validateFlag === 'YES', // 编辑查询编排是否可以上线，
            runLocation: data.runLocations || [], // 'cloud_center,ens_engine_room'
          },
        })
        return ds;
      }
    },
    * delItem({ payload: { uuid } }, { put, select }) {
      const { dataSource, nodeList } =
        yield select(state => state[constants.NAMESPACE]);
      const newNodeList = nodeList.filter(item => item.key !== uuid);
      const newDS = dataSource.nodeData.filter(item => item.uuid !== uuid);
      dataSource.nodeData = newDS;
      yield put({
        type: 'dump',
        payload: {
          dataSource,
          nodeList: newNodeList,
        },
      })
    },
    * saveStreams({ payload }, { call, put }) {
      const result = yield call(services.upDownStream, payload)
      const { errCode, data } = result;
      yield put({
        type: 'dump',
        payload: {
          isPass: errCode === '0' && data === 'SUCCESS',
        },
      })
      return result;
    },
    * allStdoKey({ payload }, { call, put }) {
      const { errCode, data } = yield call(services.allStdoKey, payload)
      if (errCode === '0') {
        yield put({
          type: 'dump',
          payload: {
            allStdoKey: data,
          },
        })
      }
    },
    * online({ payload }, { call }) {
      const result = yield call(services.online, payload);
      return result;
    },
    * online1({ payload }, { call, put }) {
      const { errCode, errMsg, data } = yield call(services.online, payload);
      if (errCode === '0' && data === 'SUCCESS') {
        Message.success('任务上线成功');
        yield put(routerRedux.push({
          pathname: '/tasklist',
        }));
      } else {
        Message.error(errMsg || '任务上线失败');
      }
    },
  },
  subscriptions: {},
}
