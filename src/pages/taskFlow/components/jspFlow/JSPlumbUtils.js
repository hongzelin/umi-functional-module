/*
 * @Author: lin.zehong
 * @Date: 2019-06-10 10:56:48
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-06-10 10:59:19
 * @Desc: jspulumb 操作相关方法抽取
 */
import JspDefaultOptions from './JspDefaultOptions';

const containerId = 'diagramContainer';

export default class JSPUtils {
  // 获取 jsPlumbForword 实例
  constructor(jsPlumbForword) {
    this.jsPlumbForword = jsPlumbForword;
  }

  // jspPlumb 方法抽象
  createPlumbAndBindEvent = (tache, node) => {
    this.setDraggable(tache); // 此环节可拖动

    const sourceEndpoints = node.sourceEndpoints || [];
    const targetEndpoints = node.targetEndpoints || [];

    if (sourceEndpoints.length > 0) {
      this.jsPlumbForword.makeSource(tache, {
        // 源对象
        filter: '.ep',
        anchor: 'Continuous',
        connector: ['Bezier', { curviness: 20 }],
      });
      for (let i = 0; i < sourceEndpoints.length; i += 1) {
        const sourceEndpoint = sourceEndpoints[i];
        this.addSourceEndpoint(sourceEndpoints, i, sourceEndpoint, tache);
      }
    }

    if (targetEndpoints.length > 0) {
      this.jsPlumbForword.makeTarget(tache, {
        // 目标对象
        dropOptions: { hoverClass: 'dragHover' },
        anchor: 'Continuous',
        endpoint: ['Rectangle', { width: 1, height: 1 }],
        allowLoopback: true,
      });

      for (let i = 0; i < targetEndpoints.length; i += 1) {
        const targetEndpoint = targetEndpoints[i];
        this.addTargetEndpoint(targetEndpoints, i, targetEndpoint, tache);
      }
    }
  };

  // 设置指定节点可拖动
  setDraggable = id => {
    this.jsPlumbForword.draggable(id, {
      containment: containerId, // 限制节点的拖动区域
      grid: [10, 10], // 设置网格
    });
  };

  // 连线
  setConnection = info => {
    this.jsPlumbForword.connect({
      uuids: [info.sourceEndpointId, info.targetEndpointId],
    });
  };

  // 输出端点
  addSourceEndpoint = (sourceEndpoints, i, sourceEndpoint, tache) => {
    // 锚点的位置需要计算
    const anchor = this.getSourceEndpointAnchor(sourceEndpoints, i);
    const scope = sourceEndpoint.dataType && sourceEndpoint.dataType.replace(/\+/g, ' ');

    const opts = Object.assign(
      {
        scope, // 这里定义了点到点能互相连的范围，这个很重要；作用域，用来区分哪些端点可以连接，作用域相同的可以连接
      },
      JspDefaultOptions.sourceEndpointOpts,
    );

    const endpoint = this.jsPlumbForword.addEndpoint(tache, opts, {
      anchor,
      uuid: `source_${tache}`,
    });
    return endpoint;
  };

  // 输入端点
  addTargetEndpoint = (targetEndpoints, i, targetEndpoint, tache) => {
    // 锚点的位置需要计算
    const anchor = this.getTargetEndpointAnchor(targetEndpoints, i);
    const scope = targetEndpoint.dataType && targetEndpoint.dataType.replace(/\+/g, ' ');

    const opts = Object.assign(
      {
        scope, // 这里定义了点到点能互相连的范围，这个很重要
      },
      JspDefaultOptions.targetEndpointOpts,
    );

    const endpoint = this.jsPlumbForword.addEndpoint(tache, opts, {
      anchor,
      uuid: `target_${tache}`,
    });
    return endpoint;
  };

  // 计算来源节点的锚点位置
  getSourceEndpointAnchor = (endpoints, i) => {
    let anchor = '';
    const anchors = ['BottomCenter', 'BottomLeft', 'BottomRight'];
    if (endpoints.length <= 1) {
      anchor = anchors[i];
    } else {
      // 左上角为起点，0.2表示相对x的偏移量，0.5表示相对y的偏移量
      const avg = 1 / endpoints.length;
      const off = 1 / (endpoints.length * 2);
      const pos = avg * i + off;

      anchor = [[pos, 1, 0, 0]];
    }
    return anchor;
  };

  // 计算目标节点的锚点位置
  getTargetEndpointAnchor = (endpoints, i) => {
    let anchor = '';
    const anchors = ['TopCenter', 'TopLeft', 'TopRight'];
    if (endpoints.length <= 1) {
      anchor = anchors[i];
    } else {
      // 左上角为起点，0.2表示相对x的偏移量，0.5表示相对y的偏移量
      const avg = 1 / endpoints.length;
      const off = 1 / (endpoints.length * 2);
      const pos = avg * i + off;

      anchor = [[pos, 0, 0, 0]];
    }
    return anchor;
  };
}
