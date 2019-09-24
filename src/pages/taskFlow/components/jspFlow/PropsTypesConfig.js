import PropTypes from 'prop-types';

const PropsTypeConfig = {
  propTypes: {
    isLoading: PropTypes.bool,
    runLocation: PropTypes.string,
    taskId: PropTypes.string,
    type: PropTypes.string,
    algoDetail: PropTypes.objectOf(PropTypes.any),
    data4: PropTypes.objectOf(PropTypes.any),
    history: PropTypes.objectOf(PropTypes.any),
    historyRecord: PropTypes.arrayOf(PropTypes.any),
    mainContainerPosition: PropTypes.objectOf(PropTypes.any),
    delItem: PropTypes.func,
    saveStreams: PropTypes.func,
    getUpDownStreams: PropTypes.func,
    dump: PropTypes.func,
    getAlgorithmDetails: PropTypes.func,
    online: PropTypes.func,
    clear: PropTypes.func,
  },
  defaultProps: {
    isLoading: false,
    taskId: '-1',
    algoDetail: {},
    runLocation: '',
    type: 'create',
    data4: {},
    history: {},
    historyRecord: [],
    mainContainerPosition: {},
    delItem: () => { },
    saveStreams: () => { },
    getUpDownStreams: () => { },
    dump: () => { },
    getAlgorithmDetails: () => { },
    online: () => { },
    clear: () => { },
  },
}

export default PropsTypeConfig;
