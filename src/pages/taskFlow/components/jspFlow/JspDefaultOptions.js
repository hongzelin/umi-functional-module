/*
 * @Author: lin.zehong
 * @Date: 2019-05-22 11:02:36
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-05-24 11:02:31
 * @Desc: jspplumb 端点样式配置
 */
const defStyles = {
  connectorPaintStyle: {
    strokeWidth: 1,
    stroke: '#858686',
    joinstyle: 'round',
    outlineStroke: 'transparent',
    outlineWidth: 2,
  },
  // .. and this is the hover style.
  connectorHoverStyle: {
    strokeWidth: 2,
    stroke: '#1e8151',
    outlineWidth: 5,
    outlineStroke: 'transparent',
  },
  endpointHoverStyle: {
    fill: '#1e8151',
    stroke: '#1e8151',
  },
}

const JspDefaultOptions = {

  instanceConfig: {
    Endpoint: ['Dot', { radius: 2 }],
    HoverPaintStyle: { strokeStyle: '#1e8151', lineWidth: 2 },
    ConnectionOverlays: [
      [
        'Arrow',
        {
          location: 0.97,
          id: 'arrow',
          length: 6,
          width: 6,
          foldback: 0.8,
        },
      ],
    ],
  },

  sourceEndpointOpts: {
    endpoint: 'Dot',
    paintStyle: {
      stroke: '#74bee6',
      fill: '#fff',
      radius: 4,
      strokeWidth: 1,
    },
    isSource: true,
    maxConnections: 5,
    connector: ['Bezier', {
      curviness: 50,
      stub: [40, 60],
      gap: 10,
      cornerRadius: 5,
      alwaysRespectStubs: true,
    }],
    connectorStyle: defStyles.connectorPaintStyle,
    hoverPaintStyle: defStyles.endpointHoverStyle,
    connectorHoverStyle: defStyles.connectorHoverStyle,
    dragOptions: {},
    overlays: [
      ['Label', {
        location: [0.5, 1.5],
        label: 'Drag',
        cssClass: 'endpointSourceLabel',
        visible: false,
      }],
    ],
  },

  targetEndpointOpts: {
    endpoint: 'Dot',
    paintStyle: {
      stroke: '#74bee6',
      fill: '#fff',
      radius: 4,
      strokeWidth: 1,
    },
    hoverPaintStyle: defStyles.endpointHoverStyle,
    maxConnections: -1,
    dropOptions: { hoverClass: 'dropHover', activeClass: 'dragActive' },
    isTarget: true,
    overlays: [
      ['Label', {
        location: [0.5, -0.5],
        label: 'Drop',
        cssClass: 'endpointTargetLabel',
        visible: false,
      }],
    ],
  },
}

export default JspDefaultOptions;
