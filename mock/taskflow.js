/*
 * @Author: lin.zehong
 * @Date: 2019-06-26 16:14:10
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-06-27 17:25:55
 * @Desc: 任务配置
 */

export default {
  'POST /apis/taskflow/staticData': (req, res) => {
    const data = {
      "errCode": "0",
      "errMsg": "SUCCESS",
      "data": {
        "videoCard": [{
          "paramKey": "Nvidia_Tesla_P4",
          "paramValue": "Nvidia Tesla P4",
          "paramCode": "Nvidia_Tesla_P4",
          "paramGroup": "videoCard",
          "paramDesc": "显卡",
        }],
        "computerType": [{
          "paramKey": "CPU",
          "paramValue": "CPU",
          "paramCode": "CPU",
          "paramGroup": "computerType",
          "paramDesc": "计算机型",
        }, {
          "paramKey": "GPU",
          "paramValue": "GPU",
          "paramCode": "GPU",
          "paramGroup": "computerType",
          "paramDesc": "计算机型",
        }, {
          "paramKey": "FPGA",
          "paramValue": "FPGA",
          "paramCode": "FPGA",
          "paramGroup": "computerType",
          "paramDesc": "计算机型",
        }],
        "memory": [{
          "paramKey": "0.5GiB",
          "paramValue": "0.5 GiB",
          "paramCode": "0.5GiB",
          "paramGroup": "memory",
          "paramDesc": "内存",
        }, {
          "paramKey": "1GiB",
          "paramValue": "1 GiB",
          "paramCode": "1GiB",
          "paramGroup": "memory",
          "paramDesc": "内存",
        }, {
          "paramKey": "2GiB",
          "paramValue": "2 GiB",
          "paramCode": "2GiB",
          "paramGroup": "memory",
          "paramDesc": "内存",
        }, {
          "paramKey": "4GiB",
          "paramValue": "4 GiB",
          "paramCode": "4GiB",
          "paramGroup": "memory",
          "paramDesc": "内存",
        }, {
          "paramKey": "8GiB",
          "paramValue": "8 GiB",
          "paramCode": "8GiB",
          "paramGroup": "memory",
          "paramDesc": "内存",
        }, {
          "paramKey": "12GiB",
          "paramValue": "12 GiB",
          "paramCode": "12GiB",
          "paramGroup": "memory",
          "paramDesc": "内存",
        }, {
          "paramKey": "16GiB",
          "paramValue": "16 GiB",
          "paramCode": "16GiB",
          "paramGroup": "memory",
          "paramDesc": "内存",
        }, {
          "paramKey": "24GiB",
          "paramValue": "24 GiB",
          "paramCode": "24GiB",
          "paramGroup": "memory",
          "paramDesc": "内存",
        }],
        "OSTypes": [],
        "stdio": [{
          "paramKey": "OriginalImage:CroppedImage",
          "paramValue": "原图（BGR）:目标图（目标位置坐标）",
          "paramCode": "jc",
          "paramGroup": "stdio",
          "paramDesc": null,
        }, {
          "paramKey": "CroppedImage:StructedData+Vector",
          "paramValue": "目标图（目标位置坐标）:结构化数据+向量",
          "paramCode": "jgh",
          "paramGroup": "stdio",
          "paramDesc": null,
        }, {
          "paramKey": "RtspUrl:CroppedImage",
          "paramValue": "视频流（RTSP URL）:目标图（目标位置坐标）",
          "paramCode": "jmjc",
          "paramGroup": "stdio",
          "paramDesc": null,
        }, {
          "paramKey": "RtspUrl:OriginalImage",
          "paramValue": "视频流（RTSP URL）:原图（BGR）",
          "paramCode": "jm",
          "paramGroup": "stdio",
          "paramDesc": null,
        }, {
          "paramKey": "RtspUrl:OriginalImage+StructedData+Vector",
          "paramValue": "视频流（RTSP URL）:原图（BGR）+结构化数据+向量",
          "paramCode": "jmjcjgh",
          "paramGroup": "stdio",
          "paramDesc": null,
        }, {
          "paramKey": "OriginalImage:StructedData+Vector",
          "paramValue": "原图（BGR）:结构化数据+向量",
          "paramCode": "jcjgh",
          "paramGroup": "stdio",
          "paramDesc": null,
        }],
        "calculateLocation": [{
          "paramKey": "cloud_center",
          "paramValue": "云中心",
          "paramCode": null,
          "paramGroup": "calculateLocation",
          "paramDesc": "cloud_center",
        }, {
          "paramKey": "ens_engine_room",
          "paramValue": "ENS机房",
          "paramCode": null,
          "paramGroup": "calculateLocation",
          "paramDesc": "ens_engine_room",
        }],
        "videoCardDrive": [{
          "paramKey": "CUDA_8.0",
          "paramValue": "CUDA 8.0",
          "paramCode": "CUDA_8.0",
          "paramGroup": "videoCardDrive",
          "paramDesc": "显卡驱动",
        }],
        "algoType": [{
          "paramKey": "face",
          "paramValue": "人脸",
          "paramCode": null,
          "paramGroup": "algoType",
          "paramDesc": "vcs_op_data_renlian1.0",
        }, {
          "paramKey": "body",
          "paramValue": "人体",
          "paramCode": null,
          "paramGroup": "algoType",
          "paramDesc": "vcs_op_data_renti1.0",
        }, {
          "paramKey": "motor",
          "paramValue": "机动车",
          "paramCode": null,
          "paramGroup": "algoType",
          "paramDesc": "vcs_op_data_jdc1.0",
        }, {
          "paramKey": "non_motor",
          "paramValue": "非机动车",
          "paramCode": null,
          "paramGroup": "algoType",
          "paramDesc": "vcs_op_data_fjdc1.0",
        }, {
          "paramKey": "event",
          "paramValue": "事件",
          "paramCode": null,
          "paramGroup": "algoType",
          "paramDesc": "vcs_op_data_shijian1.0",
        }, {
          "paramKey": "index",
          "paramValue": "指数",
          "paramCode": null,
          "paramGroup": "algoType",
          "paramDesc": "vcs_op_data_zhishu1.0",
        }],
        "cpu": [{
          "paramKey": "1vCPU",
          "paramValue": "1vCPU",
          "paramCode": "1vCPU",
          "paramGroup": "cpu",
          "paramDesc": "cpu",
        }, {
          "paramKey": "2vCPU",
          "paramValue": "2vCPU",
          "paramCode": "2vCPU",
          "paramGroup": "cpu",
          "paramDesc": "cpu",
        }, {
          "paramKey": "4vCPU",
          "paramValue": "4vCPU",
          "paramCode": "4vCPU",
          "paramGroup": "cpu",
          "paramDesc": "cpu",
        }, {
          "paramKey": "8vCPU",
          "paramValue": "8vCPU",
          "paramCode": "8vCPU",
          "paramGroup": "cpu",
          "paramDesc": "cpu",
        }, {
          "paramKey": "12vCPU",
          "paramValue": "12vCPU",
          "paramCode": "12vCPU",
          "paramGroup": "cpu",
          "paramDesc": "cpu",
        }, {
          "paramKey": "16vCPU",
          "paramValue": "16vCPU",
          "paramCode": "16vCPU",
          "paramGroup": "cpu",
          "paramDesc": "cpu",
        }, {
          "paramKey": "24vCPU",
          "paramValue": "24vCPU",
          "paramCode": "24vCPU",
          "paramGroup": "cpu",
          "paramDesc": "cpu",
        }, {
          "paramKey": "32vCPU",
          "paramValue": "32vCPU",
          "paramCode": "32vCPU",
          "paramGroup": "cpu",
          "paramDesc": "cpu",
        }],
        "diskType": [{
          "paramKey": "SSD",
          "paramValue": "SSD云盘",
          "paramCode": "SSD",
          "paramGroup": "diskType",
          "paramDesc": "磁盘类型",
        }, {
          "paramKey": "HITH_SPEED",
          "paramValue": "高效云盘",
          "paramCode": "SSD",
          "paramGroup": "diskType",
          "paramDesc": "磁盘类型",
        }],
      },
    }
    res.status(200).json(data);
  },

  'GET /apis/stategysForTask': (req, res) => {
    const data = {
      "errCode": "0",
      "errMsg": "SUCCESS",
      "data": {
        "decodes": [{
          "stategyId": 2,
          "stategyName": "test",
          "type": "decode_strategy",
        }, {
          "stategyId": 5,
          "stategyName": "策略测试0",
          "type": "decode_strategy",
        }, {
          "stategyId": 6,
          "stategyName": "策略测试4",
          "type": "decode_strategy",
        }, {
          "stategyId": 7,
          "stategyName": "策略测试7",
          "type": "decode_strategy",
        }],
        "storages": [{
          "stategyId": 2,
          "stategyName": "原始图片",
          "type": "storage_strategy",
        }, {
          "stategyId": 3,
          "stategyName": "原始",
          "type": "storage_strategy",
        }],
        "all": [{
          "stategyId": 2,
          "stategyName": "test",
          "type": "decode_strategy",
        }, {
          "stategyId": 5,
          "stategyName": "策略测试0",
          "type": "decode_strategy",
        }, {
          "stategyId": 6,
          "stategyName": "策略测试4",
          "type": "decode_strategy",
        }, {
          "stategyId": 7,
          "stategyName": "策略测试7",
          "type": "decode_strategy",
        }, {
          "stategyId": 2,
          "stategyName": "原始图片",
          "type": "storage_strategy",
        }, {
          "stategyId": 3,
          "stategyName": "原始",
          "type": "storage_strategy",
        }],
      },
    }
    res.status(200).json(data);
  },

  'GET /apis/algorithmVersionsForTask': (req, res) => {
    const data = {
      "errCode": "0",
      "errMsg": "SUCCESS",
      "data": [{
        "algorithmName": "让请问热情为",
        "algorithmVersionId": 598,
        "status": "PUBLISHED",
        "stdioKey": "CroppedImage:StructedData+Vector",
        "stdiKey": "CroppedImage",
        "stdoKey": "StructedData+Vector",
      }, {
        "algorithmName": "映射测试",
        "algorithmVersionId": 600,
        "status": "PUBLISHED",
        "stdioKey": "OriginalImage:CroppedImage+OriginalImage",
        "stdiKey": "OriginalImage",
        "stdoKey": "CroppedImage+OriginalImage",
      }],
    }
    res.status(200).json(data);
  },

  'GET /apis/algorithmDetails': (req, res) => {
    const data = {
      "errCode": "0",
      "errMsg": "SUCCESS",
      "data": {
        "algorithmVersionId": 598,
        "algorithmId": 615,
        "algorithmVersionNo": "V1.0",
        "description": "温柔请问",
        "quietPeriod": null,
        "computerType": "CPU",
        "videoCard": "Nvidia_Tesla_P4",
        "cpu": "4vCPU",
        "memory": "2GiB",
        "videoCardDrive": "CUDA_8.0",
        "streamSpeed": 3,
        "photoSpeed": 2,
        "mirrorImageRepositoryUrl": null,
        "mirrorImageOssUrl": null,
        "fileFingerprint": null,
        "authorityFileMachineIp": null,
        "authorityFileOssUrl": null,
        "authorityFilePath": null,
        "algorithmContainer": 0,
        "deployId": null,
        "gmtCreateBy": "nobody",
        "gmtCreate": 1558577560000,
        "gmtModifiedBy": "nobody",
        "gmtModified": 1558577560000,
        "status": "PUBLISHED",
        "algorithmModel": [{
          "algorithmModelId": 820,
          "algorithmVersionId": 598,
          "modelCode": "face",
          "dimension": 2,
          "gmtCreateBy": "nobody",
          "gmtCreate": 1558577561000,
          "gmtModifiedBy": "nobody",
          "gmtModified": 1558577561000,
        }],
        "disk": [{
          "diskId": 773,
          "algorithmVersionId": 598,
          "diskType": "SYSTEM",
          "diskSize": 1,
          "storeType": "SSD",
          "gmtCreateBy": "nobody",
          "gmtCreate": 1558577561000,
          "gmtModifiedBy": "nobody",
          "gmtModified": 1558577561000,
        }, {
          "diskId": 774,
          "algorithmVersionId": 598,
          "diskType": "DATA",
          "diskSize": 2,
          "storeType": "HITH_SPEED",
          "gmtCreateBy": "nobody",
          "gmtCreate": 1558577561000,
          "gmtModifiedBy": "nobody",
          "gmtModified": 1558577561000,
        }],
        "osVersion": {
          "osVersionId": 2,
          "osId": 2,
          "osVersionNo": "7.2 64位",
          "repository": "https://opsx.alibaba.com/mirror",
          "imageId": "Ubuntu",
          "gmtCreateBy": "PROVIDER",
          "gmtCreate": 1554256028000,
          "gmtModifiedBy": "PROVIDER",
          "gmtModified": 1554256028000,
          "osType": "Ubuntu",
        },
        "containerTotal": 8,
        "containerTotalAvailable": 4,
        "machineTotal": 2,
        "machineAuthenticatedCount": 0,
        "machineUnauthenticatedCount": 2,
        "authenAndDeployeds": null,
        "providerId": 2,
        "algorithmName": "让请问热情为",
        "applicant": null,
        "applicantCode": null,
        "administrator": null,
        "administratorCode": null,
        "interfaceCodes": null,
        "quietPeriodVO": [],
        "algorithmModelStr": "人脸(2维)",
        "stdioKey": "CroppedImage:StructedData+Vector",
        "stdiKey": "目标图（目标位置坐标）",
        "stdoKey": "结构化数据+向量",
        "providerName": "达摩院",
      },
    }
    res.status(200).json(data);
  },

  'POST /apis/upDownStream': (req, res) => {
    const data = {
      errCode: '0',
      errMsg: '',
      data: '任务中算子间的输入输出关系验证未通过，存在如下问题，请修改后重试：||1） XX算子缺少输入||2） YY算子缺少输出',
    };
    res.status(200).json(data);
  },

  'GET /apis/viewAlgorithmTaskStream': (req, res) => {
    const data = {
      "errCode": "0",
      "errMsg": "SUCCESS",
      "data": {
        "taskId": -1,
        "dataStreams": [{
          "id": null,
          "endpointId": 598,
          "uuid": "algorithm_598_5WA12D1559116955201",
          "type": "algorithm",
          "x": 240.0000000000,
          "y": 70.0000000000,
          "gmtCreate": null,
          "gmtModified": null,
          "gmtCreatedBy": null,
          "gmtModifiedBy": null,
          "taskId": -1,
          "name": "让请问热情为",
          "sourceEndpoints": [{
            "dataType": "CroppedImage",
          }],
          "targetEndpoints": [{
            "dataType": "StructedData+Vector",
          }],
        }, {
          "id": null,
          "endpointId": 600,
          "uuid": "algorithm_600_P0GIK041559116955967",
          "type": "algorithm",
          "x": 220.0000000000,
          "y": 280.0000000000,
          "gmtCreate": null,
          "gmtModified": null,
          "gmtCreatedBy": null,
          "gmtModifiedBy": null,
          "taskId": -1,
          "name": "映射测试",
          "sourceEndpoints": [{
            "dataType": "OriginalImage",
          }],
          "targetEndpoints": [{
            "dataType": "CroppedImage",
          }],
        }, {
          "id": null,
          "endpointId": 2,
          "uuid": "strategy_2_YYDI4BE1559120413754",
          "type": "decode_strategy",
          "x": 340.0000000000,
          "y": 190.0000000000,
          "gmtCreate": null,
          "gmtModified": null,
          "gmtCreatedBy": null,
          "gmtModifiedBy": null,
          "taskId": -1,
          "name": "策略测试2",
          "sourceEndpoints": [{
            "dataType": "OriginalImage CroppedImage RtspUrl",
          }],
          "targetEndpoints": [{
            "dataType": "OriginalImage CroppedImage RtspUrl",
          }],
        }, {
          "id": null,
          "endpointId": 5,
          "uuid": "strategy_5_3B43UQUS1559186097948",
          "type": "decode_strategy",
          "x": 90.0000000000,
          "y": 190.0000000000,
          "gmtCreate": null,
          "gmtModified": null,
          "gmtCreatedBy": null,
          "gmtModifiedBy": null,
          "taskId": -1,
          "name": "策略测试0",
          "sourceEndpoints": [{
            "dataType": "OriginalImage CroppedImage RtspUrl",
          }],
          "targetEndpoints": [{
            "dataType": "OriginalImage CroppedImage RtspUrl",
          }],
        }],
        "connections": [{
          "upDownStreamId": null,
          "taskId": -1,
          "sourceEndpointId": "source_algorithm_598_5WA12D1559116955201",
          "targetEndpointId": "target_strategy_2_YYDI4BE1559120413754",
          "gmtCreate": null,
          "gmtModified": null,
          "gmtCreatedBy": null,
          "gmtModifiedBy": null,
        }, {
          "upDownStreamId": null,
          "taskId": -1,
          "sourceEndpointId": "source_strategy_2_YYDI4BE1559120413754",
          "targetEndpointId": "target_algorithm_600_P0GIK041559116955967",
          "gmtCreate": null,
          "gmtModified": null,
          "gmtCreatedBy": null,
          "gmtModifiedBy": null,
        }, {
          "upDownStreamId": null,
          "taskId": -1,
          "sourceEndpointId": "source_algorithm_598_5WA12D1559116955201",
          "targetEndpointId": "target_strategy_5_3B43UQUS1559186097948",
          "gmtCreate": null,
          "gmtModified": null,
          "gmtCreatedBy": null,
          "gmtModifiedBy": null,
        }],
        "runLocations": [{
          "id": null,
          "taskId": -1,
          "algorithmVersionId": 444,
          "runLocation": "cloud_center",
          "gmtCreate": null,
          "gmtModified": null,
          "gmtCreatedBy": null,
          "gmtModifiedBy": null,
        }, {
          "id": null,
          "taskId": -1,
          "algorithmVersionId": 600,
          "runLocation": "cloud_center",
          "gmtCreate": null,
          "gmtModified": null,
          "gmtCreatedBy": null,
          "gmtModifiedBy": null,
        }, {
          "id": null,
          "taskId": -1,
          "algorithmVersionId": 530,
          "runLocation": "cloud_center",
          "gmtCreate": null,
          "gmtModified": null,
          "gmtCreatedBy": null,
          "gmtModifiedBy": null,
        }, {
          "id": null,
          "taskId": -1,
          "algorithmVersionId": 575,
          "runLocation": "cloud_center",
          "gmtCreate": null,
          "gmtModified": null,
          "gmtCreatedBy": null,
          "gmtModifiedBy": null,
        }],
      },
    }
    res.status(200).json(data);
  },

  'GET /apis/stdoKey': (req, res) => {
    const data = {
      "errCode": "0",
      "errMsg": "SUCCESS",
      "data": "CroppedImage StructedData+Vector CroppedImage OriginalImage OriginalImage+StructedData+Vector StructedData+Vector",
    }
    res.status(200).json(data);
  },

  'POST /apis/editAlgorithmTask': (req, res) => {
    const data = {
      errCode: '0',
      errMsg: 'SUCCESS',
      data: '任务中算子间的输入输出关系验证未通过，存在如下问题，请修改后重试：1） XX算子缺少输入2） YY算子缺少输出',
    }
    res.status(200).json(data);
  },

}
