/*
 * @Author: lin.zehong 
 * @Date: 2018-12-15 22:28:28 
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2018-12-20 09:39:41
 * @Desc: 在线摄像头 Model
 */

import { message } from 'antd';
import {
  cameraQuery, collectTreeQuery, collectTreeCreate, collectTreeUpdate,
  collectTreeDelete, collectTreeSelectCamera, cancelCamera, favoritesList,
  insertCamera, getPlayerUrl,
} from '../services/cameraService';

// 初始状态
const initData = {
  visible: false, // 收藏夹右键功能，弹出窗状态
  modalTitle: '标题', // 收藏夹右键功能，弹出窗标题
  menuKey: '1', // 弹出窗内容区分[1：自动巡查，2：重命名，3：添加同级目录，4：添加子目录]
  isExpand: true, // 收藏夹tree收起、展开
  webcamAllData: [], // 所有摄像头数据
  collectTree: [], // 收藏夹树,包括摄像头
  onlyCollectData: [], // 只有收藏夹，没有收藏夹
  favorites: {}, // 收藏夹树节点后台返回的对象，用于crud收藏夹
  cameraNum: 0, // 收藏夹下的所有摄像头数量
  inspectionCamera: [], // 巡查的摄像头
  currentCameraId: -1, // 当前播放器摄像头的id
  currentCameraBm: "-1", // 当前播放器摄像头的编码，为了做搜索定位显示摄像头，控制选中样式，而不播放视频
};

export default {
  namespace: 'onlineCamera',
  state: { ...initData },
  effects: {
    // 查询摄像头
    *cameraQueryEff({ payload }, { call, put }) {
      const result = yield call(cameraQuery, payload);
      if (result && result.data) {
        yield put({
          type: 'querySuccess',
          payload: { list: result.data.datas || [] },
        });
      }
    },
    // 收搜摄像头，根据名称（因为要做移动，所以和cameraQueryEff区分开来）
    *cameraSearchEff({ payload }, { call, put }) {
      const result = yield call(cameraQuery, payload);
      if (result && result.data) {
        yield put({
          type: 'querySuccess',
          payload: { list: result.data.datas || [] },
        });
        return result.data.datas || [];
      }
    },
    // 查询收藏夹 以及摄像头
    *collectQueryEff({ payload }, { call, put }) {
      const result = yield call(collectTreeQuery, payload);
      if (result && result.data) {
        const resultArr = [];
        resultArr.push(result.data); // 这里后台返回有错误，应该是数组，不应该是一个对象！！！
        yield put({
          type: 'queryCollectSuccess',
          payload: { data: resultArr },
        });
      }
    },
    // 查询收藏夹 没有摄像头
    *favoritesListEff({ payload }, { call, put }) {
      const result = yield call(favoritesList, payload);
      if (result && result.data) {
        const resultArr = [];
        resultArr.push(result.data); // 这里后台返回有错误，应该是数组，不应该是一个对象！！！
        yield put({
          type: 'favoritesListSuccess',
          payload: { data: resultArr },
        });
      }
    },
    // 新增收藏夹
    *collectCreateEff({ payload }, { call, put, select }) {
      const camera = yield select(state => state.onlineCamera);
      const { menuKey, favorites } = camera;
      let id = "";
      if (menuKey === "3") { // 同级目录
        id = favorites.superScjId; // 同级目录，应该获取上级父级ID
      } else { // menuKey === 4 子目录
        id = favorites.scjId;
      }
      const params = {
        scjId: id,
        scjmc: payload.directoryName,
      }
      const result = yield call(collectTreeCreate, params);
      if (result && result.data && result.errCode === 0) {
        message.success('新增成功');
        yield put({ type: 'hideModal', payload: {} });
        yield put({ type: 'collectQueryEff', payload: {} });
      } else {
        message.error('新增失败');
      }
    },
    // 修改收藏夹（重命名）
    *collectUpdateEff({ payload }, { call, put, select }) {
      const camera = yield select(state => state.onlineCamera);
      const { favorites } = camera;
      const id = favorites.scjId;
      const params = {
        scjId: id,
        scjmc: payload.name,
      }
      const result = yield call(collectTreeUpdate, params);
      if (result && result.errCode === 0) {
        message.success('修改成功');
        yield put({ type: 'hideModal', payload: {} });
        yield put({ type: 'collectQueryEff', payload: {} });
      } else {
        message.error('修改失败');
      }
    },
    // 删除当前收藏夹及当前收藏夹下的摄像头和文件全部删除
    *collectDeteleEff({ payload }, { call, put, select }) {
      const camera = yield select(state => state.onlineCamera);
      const { favorites } = camera;
      const id = favorites.scjId;
      const params = {
        scjId: id,
        ...payload,
      }
      const result = yield call(collectTreeDelete, params);
      if (result && result.errCode === 0) {
        message.success('删除成功');
        yield put({ type: 'hideModal', payload: {} });
        yield put({ type: 'collectQueryEff', payload: {} });
      } else {
        message.error('删除失败');
      }
    },
    // 查询收藏夹下的所有摄像头
    *collectSelectCameraEff({ payload }, { call, put, select }) {
      const camera = yield select(state => state.onlineCamera);
      const { favorites } = camera;
      const id = favorites.scjId;
      const params = {
        scjId: id,
        ...payload,
      }
      const result = yield call(collectTreeSelectCamera, params);
      if (result && result.errCode === 0) {
        yield put({
          type: 'cameraListSuccess',
          payload: {
            cameraNum: result.data.total,
            data: result.data.cameras || [],
          },
        });
      }
    },
    // 取消收藏摄像头
    *cancelCameraEff({ payload }, { call, put }) {
      const result = yield call(cancelCamera, payload);
      if (result && result.errCode === 0) {
        message.success('取消收藏成功');
        yield put({ type: 'collectQueryEff', payload: {} });
      } else {
        message.error('取消收藏失败');
      }
    },
    // 收藏夹中添加摄像头
    *insertCameraEff({ payload }, { call, put }) {
      const result = yield call(insertCamera, payload);
      if (result && result.errCode === 0) {
        message.success('收藏成功');
        yield put({ type: 'collectQueryEff', payload: {} });
      } else {
        message.error('收藏失败');
      }
    },
    // 获取摄像头播放地址
    *playing({ payload }, { call }) {
      const resData = yield call(getPlayerUrl, payload);
      return resData;
    },

  },

  reducers: {
    showModal: (state, { payload }) => ({
      ...state,
      modalTitle: payload.modalTitle,
      menuKey: payload.menuKey,
      visible: true,
    }),
    hideModal: (state) => ({
      ...state,
      visible: false,
    }),
    toggleTree: (state) => ({
      ...state,
      isExpand: !state.isExpand,
    }),
    querySuccess: (state, { payload }) => ({
      ...state,
      webcamAllData: payload.list,
    }),
    queryCollectSuccess: (state, { payload }) => {
      return {
        ...state,
        collectTree: payload.data,
        onlyCollectData: [],
      }
    },
    favoritesListSuccess: (state, { payload }) => {
      return {
        ...state,
        onlyCollectData: payload.data,
      }
    },
    changefavorites: (state, { payload }) => {
      return {
        ...state,
        favorites: payload.favorites,
      }
    },
    cameraListSuccess: (state, { payload }) => {
      return {
        ...state,
        cameraNum: payload.cameraNum,
        inspectionCamera: payload.data,
      }
    },
    changeCameraId: (state, { payload }) => {
      return {
        ...state,
        currentCameraId: payload.currentCameraId,
        currentCameraBm: payload.currentCameraBm, // CameraPopover组件中使用；目的控制选中样式，而不播放视频
      }
    },
    changeCameraBm: (state, { payload }) => {
      return {
        ...state,
        currentCameraBm: payload.currentCameraBm,
      }
    },
  },
};
