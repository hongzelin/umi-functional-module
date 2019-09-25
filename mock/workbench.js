import mockjs from "mockjs";

export default {
  "POST /apis/work/query": (req, res) => {
    res.json({
      ...mockjs.mock({
        "data|10": [
          {
            "id|+1": 1,
            "codeId|+1": 11111111,
            name: "事项事实上的合适的是滴是滴",
            dept: "财务部",
            catalog: "公民信息公民信息公民信息",
            liyou: "事项信息共享",
            status: "待審批",
            item1: "item1",
            item2: "item2",
            item3: "item3",
            createTime: "2019-09-09 12:21:32",
            spTime: "2019-09-09 12:21:32",
          },
        ],
      }),
      errCode: "0",
      errMsg: "成功",
      totalCount: 10,
    });
  },

  "POST /apis/apply/businessDataApplyPage": (req, res) => {
    res.json({
      success: true,
      errCode: "0",
      errName: "success",
      errMsg: "success",
      totalCount: null,
      pageNum: null,
      pageSize: null,
      data: {
        applyId: null,
        applyCode: "SQ-1160214811114401792", // 申請單編號
        userId: "13888888888",
        applyReason: "dddddddddddssssssss", // 申請理由
        approvalIds: null,
        applyState: null,
        gmtCreate: "2019-09-09 12:12:21",
        gmtModify: null,
        businessNameList: [
          {
            businessId: 1,
            businessName: "醫保報銷事項", // 事項名稱
          },
          {
            businessId: 2,
            businessName: "養老金申請事項",
          },
        ],
        dataDirectoryNameList: [
          {
            dataDirectoryName: "數據目錄名稱1", // 數據目錄名稱
            dataDirectoryId: 1,
          },
          {
            dataDirectoryName: "數據目錄名稱2",
            dataDirectoryId: 2,
          },
        ],
        dataDirectoryList: [
          {
            dataDirectoryId: 1,
            dataDirectoryName: "數據目錄名稱1",
            paramDetailList: [
              {
                paramId: 1,
                paramCode: "BIRTD_DATE",
                dataDirectoryId: 7,
                apiId: 111,
                paramCodeAlias: "BIRTD_DATE", // 共享欄位CODE別名(頁面上對應欄位CODE)
                paramName: "出生日期",
                paramNameAlias: "出生日期", // 共享欄位名稱別名(頁面上對應欄位名稱)
                paramType: "DATE", // 欄位類型
                paramDesc: 1,
                paramIntro: "欄位描述111", // 欄位描述
                paramValue: null,
                isRequired: 1,
                isShared: 1,
                gmtCreate: 1565333869000,
                gmtModify: 1565333870000,
                businessList: [
                  {
                    businessId: 1,
                    businessName: "醫保報銷事項", // 事項名稱
                    isChoosed: true,
                  },
                  {
                    businessId: 2,
                    businessName: "養老金申請事項",
                    isChoosed: false,
                  },
                ],
              },
              {
                paramId: 2,
                paramCode: "MARY_DATE",
                dataDirectoryId: 7,
                apiId: 222,
                paramCodeAlias: "MARY_DATE",
                paramName: "結婚日期",
                paramNameAlias: "結婚日期",
                paramType: "DATE",
                paramDesc: 1,
                paramIntro: "欄位描述222",
                paramValue: null,
                isRequired: 1,
                isShared: 1,
                gmtCreate: 1565333870000,
                gmtModify: 1565333870000,
                businessList: [
                  {
                    businessId: 1,
                    businessName: "醫保報銷事項", // 事項名稱
                    isChoosed: true,
                  },
                  {
                    businessId: 2,
                    businessName: "養老金申請事項",
                    isChoosed: true,
                  },
                ],
              },
            ],
          },
          {
            dataDirectoryId: 2,
            dataDirectoryName: "數據目錄名稱2",
            paramDetailList: [
              {
                paramId: 3,
                paramCode: "BIRTD_DATE1",
                dataDirectoryId: 7,
                apiId: 111,
                paramCodeAlias: "BIRTD_DATE1",
                paramName: "出生日期",
                paramNameAlias: "出生日期",
                paramType: "DATE",
                paramDesc: 1,
                paramIntro: "欄位描述111",
                paramValue: null,
                isRequired: 1,
                isShared: 1,
                gmtCreate: 1565333869000,
                gmtModify: 1565333870000,
                businessList: [
                  {
                    businessId: 1,
                    businessName: "醫保報銷事項", // 事項名稱
                    isChoosed: false,
                  },
                  {
                    businessId: 2,
                    businessName: "養老金申請事項",
                    isChoosed: false,
                  },
                ],
              },
              {
                paramId: 4,
                paramCode: "MARY_DATE2",
                dataDirectoryId: 7,
                apiId: 222,
                paramCodeAlias: "MARY_DATE2",
                paramName: "結婚日期",
                paramNameAlias: "結婚日期",
                paramType: "DATE",
                paramDesc: 1,
                paramIntro: "欄位描述222",
                paramValue: null,
                isRequired: 1,
                isShared: 1,
                gmtCreate: 1565333870000,
                gmtModify: 1565333870000,
                businessList: [
                  {
                    businessId: 1,
                    businessName: "醫保報銷事項", // 事項名稱
                    isChoosed: true,
                  },
                  {
                    businessId: 2,
                    businessName: "養老金申請事項",
                    isChoosed: false,
                  },
                ],
              },
            ],
          },
        ],
        approvalFormList: [
          {
            approvalId: 4,
            approvalCode: "SP-1160736977299894272",
            applyCode: "SQ-1160121047813386241",
            approvalDept: 1,
            approvalDeptName: "法务局", // 审批部门
            approvalResult: 0, // 0 不通过， 1 通过
            approvalOpinion: "想说的是颠三倒四",
            userId: null,
            approvalState: 0,
            gmtCreate: 1565576235000,
            gmtModify: null,
          },
          {
            approvalId: 5,
            approvalCode: "SP-1160736977601884160",
            applyCode: "SQ-1160121047813386241",
            approvalDept: 2,
            approvalDeptName: "法务局2", // 审批部门
            approvalResult: 1,
            approvalOpinion: "颠三倒四多",
            userId: null,
            approvalState: 0,
            gmtCreate: 1565576236000,
            gmtModify: null,
          },
        ],
      },
    });
  },

  "POST /apis/apply/addApplyForm": (req, res) => {
    res.json({
      data: null,
      errCode: "0",
      errMsg: "成功",
      totalCount: 10,
    });
  },

  "POST /apis/workplatform/updateApprovalForm": (req, res) => {
    res.json({
      data: null,
      errCode: "0",
      errMsg: "成功",
      totalCount: 10,
    });
  },

  "GET /apis/resource": (req, res) => {
    res.json({
      data: {
        dataDirectoryCount: 1215,
        businessCount: 123,
        apiCount: 123,
        authorizedRecord: 112,
        authorizedBusinessCall: 1234541654,
      },
      errCode: 0,
      errMsg: "成功",
    });
  },

  "POST /apis/workplatform/cancelApplyForm": (req, res) => {
    res.json({
      data: null,
      errCode: 0,
      errMsg: "成功",
    });
  },

  "POST /apis/workplatform/countByState": (req, res) => {
    res.json({
      data: {
        applyCount: {
          hasBeenApprovaledSum: 1, // 已審批
          type: "申請單",
          canceledSum: 40, // 已撤銷
          toBeApprovaledSum: 12, // 待審批
        },
        approvalCount: {
          hasBeenApprovaledSum: 3,
          type: "審批單",
          toBeApprovaledSum: 10,
        },
      },
      errCode: "0",
      errMsg: "成功",
      totalCount: 10,
    });
  },

  "POST /apis/workplatform/approvalFormDetail": (req, res) => {
    res.json({
      success: true,
      errCode: 0,
      errName: "success",
      errMsg: "success",
      totalCount: null,
      pageNum: null,
      pageSize: null,
      data: {
        applyId: null,
        applyCode: "SQ-1160121047813386241",
        userId: null,
        applyReason: null,
        approvalIds: null,
        applyState: null,
        applyResult: null,
        gmtCreate: null,
        gmtModify: null,
        businessNameList: [
          {
            businessId: 1,
            businessName: "醫保報銷事項",
          },
          {
            businessId: 2,
            businessName: "養老金申請事項",
          },
        ],
        dataDirectoryNameList: [
          {
            dataDirectoryName: "公民數據目錄2",
            dataDirectoryId: 7,
          },
        ],
        dataDirectoryList: [
          {
            dataDirectoryName: "公民數據目錄2",
            paramDetailList: [
              {
                paramId: 17,
                paramCode: "SFID",
                dataDirectoryId: 7,
                apiId: 111,
                paramCodeAlias: "SFID",
                paramName: "身份標識",
                paramNameAlias: "身份標識",
                paramType: "CHAR",
                paramDesc: 0,
                paramIntro: "欄位描述111",
                paramValue: null,
                isRequired: 1,
                isShared: 1,
                gmtCreate: "2019-08-09 14:57:49",
                gmtModify: "2019-08-09 14:57:49",
                businessList: [],
              },
              {
                paramId: 18,
                paramCode: "BIRTD_DATE",
                dataDirectoryId: 7,
                apiId: 111,
                paramCodeAlias: "BIRTD_DATE",
                paramName: "出生日期",
                paramNameAlias: "出生日期",
                paramType: "DATE",
                paramDesc: 1,
                paramIntro: "欄位描述111",
                paramValue: null,
                isRequired: 1,
                isShared: 1,
                gmtCreate: "2019-08-09 14:57:49",
                gmtModify: "2019-08-09 14:57:49",
                businessList: [
                  {
                    isChoosed: true,
                    businessId: 1,
                    businessName: "醫保報銷事項",
                  },
                  {
                    isChoosed: true,
                    businessId: 2,
                    businessName: "養老金申請事項",
                  },
                ],
              },
              {
                paramId: 19,
                paramCode: "SFID",
                dataDirectoryId: 7,
                apiId: 222,
                paramCodeAlias: "SFID2",
                paramName: "身份標識",
                paramNameAlias: "身份標識",
                paramType: "CHAR",
                paramDesc: 0,
                paramIntro: "欄位描述222",
                paramValue: null,
                isRequired: 1,
                isShared: 1,
                gmtCreate: "2019-08-09 14:57:50",
                gmtModify: "2019-08-09 14:57:50",
                businessList: [],
              },
              {
                paramId: 20,
                paramCode: "MARY_DATE",
                dataDirectoryId: 7,
                apiId: 222,
                paramCodeAlias: "MARY_DATE",
                paramName: "結婚日期",
                paramNameAlias: "結婚日期",
                paramType: "DATE",
                paramDesc: 1,
                paramIntro: "欄位描述222",
                paramValue: null,
                isRequired: 1,
                isShared: 1,
                gmtCreate: "2019-08-09 14:57:50",
                gmtModify: "2019-08-09 14:57:50",
                businessList: [
                  {
                    isChoosed: true,
                    businessId: 2,
                    businessName: "養老金申請事項",
                  },
                ],
              },
              {
                paramId: 21,
                paramCode: "SFID",
                dataDirectoryId: null,
                apiId: 111,
                paramCodeAlias: "SFID3",
                paramName: "身份標識",
                paramNameAlias: "身份標識",
                paramType: "CHAR",
                paramDesc: 0,
                paramIntro: null,
                paramValue: null,
                isRequired: 1,
                isShared: 1,
                gmtCreate: "2019-08-12 13:29:14",
                gmtModify: "2019-08-12 13:29:14",
                businessList: [],
              },
              {
                paramId: 22,
                paramCode: "BIRTD_DATE",
                dataDirectoryId: null,
                apiId: 111,
                paramCodeAlias: "BIRTD_DATE2",
                paramName: "出生日期",
                paramNameAlias: "出生日期",
                paramType: "DATE",
                paramDesc: 1,
                paramIntro: null,
                paramValue: null,
                isRequired: 1,
                isShared: 1,
                gmtCreate: "2019-08-12 13:29:14",
                gmtModify: "2019-08-12 13:29:14",
                businessList: [],
              },
              {
                paramId: 23,
                paramCode: "SFID",
                dataDirectoryId: null,
                apiId: 222,
                paramCodeAlias: "SFID4",
                paramName: "身份標識",
                paramNameAlias: "身份標識",
                paramType: "CHAR",
                paramDesc: 0,
                paramIntro: null,
                paramValue: null,
                isRequired: 1,
                isShared: 1,
                gmtCreate: "2019-08-12 13:29:14",
                gmtModify: "2019-08-12 13:29:14",
                businessList: [],
              },
              {
                paramId: 24,
                paramCode: "MARY_DATE",
                dataDirectoryId: null,
                apiId: 222,
                paramCodeAlias: "MARY_DATE2",
                paramName: "結婚日期",
                paramNameAlias: "結婚日期",
                paramType: "DATE",
                paramDesc: 1,
                paramIntro: null,
                paramValue: null,
                isRequired: 1,
                isShared: 1,
                gmtCreate: "2019-08-12 13:29:14",
                gmtModify: "2019-08-12 13:29:14",
                businessList: [],
              },
              {
                paramId: 32,
                paramCode: "SFID",
                dataDirectoryId: null,
                apiId: 2,
                paramCodeAlias: "SFID12",
                paramName: "身份標識",
                paramNameAlias: null,
                paramType: "CHAR",
                paramDesc: 0,
                paramIntro: "身份標識信息",
                paramValue: null,
                isRequired: null,
                isShared: null,
                gmtCreate: "2019-08-12 17:12:05",
                gmtModify: "2019-08-12 17:12:05",
                businessList: [],
              },
              {
                paramId: 33,
                paramCode: "XM",
                dataDirectoryId: null,
                apiId: 2,
                paramCodeAlias: "SFID13",
                paramName: "姓名",
                paramNameAlias: null,
                paramType: "CHAR",
                paramDesc: 0,
                paramIntro: "姓名",
                paramValue: null,
                isRequired: null,
                isShared: null,
                gmtCreate: "2019-08-12 17:12:05",
                gmtModify: "2019-08-12 17:12:05",
                businessList: [],
              },
              {
                paramId: 34,
                paramCode: "CSRC_1",
                dataDirectoryId: null,
                apiId: 2,
                paramCodeAlias: "SFID14",
                paramName: "測試入參_1",
                paramNameAlias: null,
                paramType: "CHAR",
                paramDesc: 0,
                paramIntro: "測試入參_1",
                paramValue: null,
                isRequired: null,
                isShared: null,
                gmtCreate: "2019-08-12 17:12:05",
                gmtModify: "2019-08-12 17:12:05",
                businessList: [],
              },
              {
                paramId: 35,
                paramCode: "MARY_DATE",
                dataDirectoryId: null,
                apiId: 2,
                paramCodeAlias: "SFID15",
                paramName: "結婚日期",
                paramNameAlias: null,
                paramType: "DATE",
                paramDesc: 1,
                paramIntro: "結婚日期",
                paramValue: null,
                isRequired: null,
                isShared: null,
                gmtCreate: "2019-08-12 17:12:05",
                gmtModify: "2019-08-12 17:12:05",
                businessList: [],
              },
              {
                paramId: 36,
                paramCode: "OSS_URL",
                dataDirectoryId: null,
                apiId: 2,
                paramCodeAlias: "SFID16",
                paramName: "證照URL",
                paramNameAlias: null,
                paramType: "CHAR",
                paramDesc: 1,
                paramIntro: "證照URL",
                paramValue: null,
                isRequired: null,
                isShared: null,
                gmtCreate: "2019-08-12 17:12:05",
                gmtModify: "2019-08-12 17:12:05",
                businessList: [],
              },
              {
                paramId: 37,
                paramCode: "MALE_NAME",
                dataDirectoryId: null,
                apiId: 2,
                paramCodeAlias: "SFID17",
                paramName: "男方姓名",
                paramNameAlias: null,
                paramType: "CHAR",
                paramDesc: 1,
                paramIntro: "男方姓名",
                paramValue: null,
                isRequired: null,
                isShared: null,
                gmtCreate: "2019-08-12 17:12:05",
                gmtModify: "2019-08-12 17:12:05",
                businessList: [],
              },
              {
                paramId: 38,
                paramCode: "FAMALE_NAME",
                dataDirectoryId: null,
                apiId: 2,
                paramCodeAlias: "SFID18",
                paramName: "女方姓名",
                paramNameAlias: null,
                paramType: "CHAR",
                paramDesc: 1,
                paramIntro: "女方姓名",
                paramValue: null,
                isRequired: null,
                isShared: null,
                gmtCreate: "2019-08-12 17:12:05",
                gmtModify: "2019-08-12 17:12:05",
                businessList: [],
              },
            ],
            dataDirectoryId: 7,
          },
        ],
        approvalFormList: null,
      },
    });
  },

  "POST /apis/workplatform/applyFormDetail": (req, res) => {
    res.json({
      success: true,
      errCode: 0,
      errName: "success",
      errMsg: "success",
      totalCount: null,
      pageNum: null,
      pageSize: null,
      data: {
        applyId: null,
        applyCode: "SQ-1160121047813386241",
        userId: "13888888888",
        applyReason: "yb的申請原因0812",
        approvalIds: null,
        applyState: null,
        applyResult: 0,
        gmtCreate: "2019-08-12 10:17:15",
        gmtModify: null,
        businessNameList: [
          {
            businessId: 1,
            businessName: "醫保報銷事項",
          },
          {
            businessId: 2,
            businessName: "養老金申請事項",
          },
        ],
        dataDirectoryNameList: [
          {
            dataDirectoryName: "公民數據目錄2",
            dataDirectoryId: 7,
          },
        ],
        dataDirectoryList: [
          {
            dataDirectoryName: "公民數據目錄2",
            paramDetailList: [
              {
                paramId: 18,
                paramCode: "BIRTD_DATE",
                dataDirectoryId: 7,
                apiId: 111,
                paramCodeAlias: "BIRTD_DATE",
                paramName: "出生日期",
                paramNameAlias: "出生日期",
                paramType: "DATE",
                paramDesc: 1,
                paramIntro: "欄位描述111",
                paramValue: null,
                isRequired: 1,
                isShared: 1,
                gmtCreate: "2019-08-09 14:57:49",
                gmtModify: "2019-08-09 14:57:49",
                businessList: [
                  {
                    isChoosed: true,
                    businessId: 1,
                    businessName: "醫保報銷事項",
                  },
                  {
                    isChoosed: true,
                    businessId: 2,
                    businessName: "養老金申請事項",
                  },
                  {
                    isChoosed: true,
                    businessId: 2,
                    businessName: "養老金申請事項",
                  },
                ],
              },
              {
                paramId: 18,
                paramCode: "BIRTD_DATE",
                dataDirectoryId: 7,
                apiId: 111,
                paramCodeAlias: "BIRTD_DATE",
                paramName: "出生日期",
                paramNameAlias: "出生日期",
                paramType: "DATE",
                paramDesc: 1,
                paramIntro: "欄位描述111",
                paramValue: null,
                isRequired: 1,
                isShared: 1,
                gmtCreate: "2019-08-09 14:57:49",
                gmtModify: "2019-08-09 14:57:49",
                businessList: [
                  {
                    isChoosed: true,
                    businessId: 1,
                    businessName: "醫保報銷事項",
                  },
                  {
                    isChoosed: true,
                    businessId: 2,
                    businessName: "養老金申請事項",
                  },
                  {
                    isChoosed: true,
                    businessId: 2,
                    businessName: "養老金申請事項",
                  },
                ],
              },
              {
                paramId: 20,
                paramCode: "MARY_DATE",
                dataDirectoryId: 7,
                apiId: 222,
                paramCodeAlias: "MARY_DATE",
                paramName: "結婚日期",
                paramNameAlias: "結婚日期",
                paramType: "DATE",
                paramDesc: 1,
                paramIntro: "欄位描述222",
                paramValue: null,
                isRequired: 1,
                isShared: 1,
                gmtCreate: "2019-08-09 14:57:50",
                gmtModify: "2019-08-09 14:57:50",
                businessList: [
                  {
                    isChoosed: true,
                    businessId: 1,
                    businessName: "醫保報銷事項",
                  },
                  {
                    isChoosed: true,
                    businessId: 2,
                    businessName: "養老金申請事項",
                  },
                  {
                    isChoosed: true,
                    businessId: 2,
                    businessName: "養老金申請事項",
                  },
                ],
              },
            ],
            dataDirectoryId: 7,
          },
        ],
        approvalFormList: [
          {
            approvalId: 4,
            approvalCode: "SP-1160736977299894272",
            applyCode: "SQ-1160121047813386241",
            approvalDept: 1,
            approvalResult: 0,
            approvalOpinion: null,
            userId: null,
            approvalState: 0,
            gmtCreate: "2019-08-12 10:17:15",
            gmtModify: null,
            approvalDeptName: "社保局",
          },
          {
            approvalId: 5,
            approvalCode: "SP-1160736977601884160", // 審批單編號
            applyCode: "SQ-1160121047813386241", // 申請單編號
            approvalDept: 2, // 審批部門ID
            approvalResult: 0, // 審批結果,0代表審批不通過,1代表通過
            approvalOpinion: null, // 審批意見
            userId: null, // 申請人(庫表中暫未有userName)
            approvalState: 0, // 审批状态,0代表待审批,1代表已审批
            gmtCreate: "2019-08-12 10:17:16",
            gmtModify: null,
            approvalDeptName: "法務局", // 審批部門名稱
          },
        ],
      },
    });
  },

  "POST /apis/workplatform/listApprovalForm": (req, res) => {
    res.json({
      success: true,
      errCode: 0,
      errName: "success",
      errMsg: "success",
      totalCount: 10,
      pageNum: 1,
      pageSize: 1,
      data: {
        pageNum: 1,
        pageSize: 1,
        size: 1,
        startRow: 0,
        endRow: 0,
        total: 10,
        pages: 1,
        ...mockjs.mock({
          "list|10": [
            {
              "approvalCode|+1": 1, // 審批單編碼
              launchBusinessNames: "發起事項的名稱", // 發起事項的名稱,List轉Json字符串
              launchDeptName: "發起部門", // 發起部門的名稱,List轉Json字符串
              dataDirectoryNames: "申請數據目錄的名稱", // 申請數據目錄的名稱,List轉Json字符串
              applyReason: "申請理由222", // 申請理由
              stateAndResult: "審批通過", // 狀態
              approvalOpinion: "請謹慎使用數據,注意信息保密", // 審批意見
              launchTime: "2019-08-12 10:17:15", // 發起時間
              approvalTime: "2019-08-12 10:17:15", // 審批時間
            },
          ],
        }),
        prePage: 0,
        nextPage: 0,
        isFirstPage: true,
        isLastPage: true,
        hasPreviousPage: false,
        hasNextPage: false,
        navigatePages: 8,
        navigatepageNums: [1],
        navigateFirstPage: 1,
        navigateLastPage: 1,
        lastPage: 1,
        firstPage: 1,
      },
    });
  },

  "POST /apis/workplatform/listApplyForm": (req, res) => {
    res.json({
      success: true,
      errCode: 0,
      errName: "success",
      errMsg: "success",
      totalCount: 10,
      pageNum: 1,
      pageSize: 1,
      data: {
        pageNum: 1,
        pageSize: 1,
        size: 1,
        startRow: 0,
        endRow: 0,
        total: 10,
        pages: 1,
        ...mockjs.mock({
          "list|10": [
            {
              "approvalId|+1": 1,
              approvalCode: "SP-1160736977299894272",
              approvalDept: 2,
              approvalState: 1,
              approvalResult: 0,
              approvalOpinion: "請謹慎使用數據,注意信息保密",
              userId: "13888888888",
              applyState: 1,
              applyResult: 0,
              applyCode: "SQ-1160121047813386241",
              applyReason: "yb的申請原因0812",
              stateAndResult: "審批不通過",
              launchTime: "2019-08-12 10:17:15",
              approvalTime: "2019-08-13 12:08:36",
              launchBusinessNames: '["公民數據目錄2"]',
              launchDeptName: "法務局",
              dataDirectoryNames: null,
            },
          ],
        }),
        prePage: 0,
        nextPage: 0,
        isFirstPage: true,
        isLastPage: true,
        hasPreviousPage: false,
        hasNextPage: false,
        navigatePages: 8,
        navigatepageNums: [1],
        navigateFirstPage: 1,
        navigateLastPage: 1,
        lastPage: 1,
        firstPage: 1,
      },
    });
  },

  // 普通用户 （申请方）
  "GET /apis/permission/user-info1": (req, res) => {
    res.json({
      success: true,
      errCode: 0,
      errName: "success",
      errMsg: "success",
      totalCount: null,
      pageNum: null,
      pageSize: null,
      data: {
        userInfo: {
          userId: "sbj_user2",
          userName: "社保局普通用戶",
          deptId: 1,
          token: "chendawen_token",
          roleCharacter: "deptNormalUser",
        },
        permissions: [
          {
            id: 2,
            name: "個人工作台",
            icon: "desktop",
            url: "/workbench",
            children: null,
          },
          {
            id: 4,
            name: "事項管理",
            icon: "container",
            url: "/projects",
            children: null,
          },
        ],
      },
    });
  },

  // 社保局 admin （委办局）
  "GET /apis/permission/user-info2": (req, res) => {
    res.json({
      success: true,
      errCode: 0,
      errName: "success",
      errMsg: "success",
      totalCount: null,
      pageNum: null,
      pageSize: null,
      data: {
        userInfo: {
          userId: "sbj_user1",
          userName: "社保局Admin",
          deptId: 1,
          token: "chendawen_token",
          roleCharacter: "deptAdminUser",
        },
        permissions: [
          {
            id: 2,
            name: "個人工作台",
            icon: "desktop",
            url: "/workbench",
            children: null,
          },
          {
            id: 4,
            name: "事項管理",
            icon: "container",
            url: "/projects",
            children: null,
          },
        ],
      },
    });
  },

  // 系統管理員
  "GET /apis/permission/user-info": (req, res) => {
    res.json({
      "success": true,
      "errCode": 0,
      "errName": "success",
      "errMsg": "success",
      "totalCount": null,
      "pageNum": null,
      "pageSize": null,
      "data": {
        "userInfo": {
          "userId": "admin1",
          "userName": "數據交換系統管理員",
          "deptId": 1,
          "token": "chendawen_token",
          "roleCharacter": "sysAdmin",
        },
        "permissions": [{
          "id": 2,
          "name": "個人工作台",
          "icon": "desktop",
          "url": "/workbench",
          "children": null,
        }, {
          "id": 3,
          "name": "數據交換接口管理",
          "icon": "profile",
          "url": null,
          "children": [{
            "id": 14,
            "name": "我的數據交換接口",
            "icon": null,
            "url": "/directory/directorylist",
            "children": null,
          }, {
            "id": 15,
            "name": "數據交換接口註冊",
            "icon": null,
            "url": "/directory/registerdirectory",
            "children": null,
          }],
        }, {
          "id": 4,
          "name": "事項管理",
          "icon": "container",
          "url": "/projects",
          "children": null,
        }, {
          "id": 5,
          "name": "API接入管理",
          "icon": "deployment-unit",
          "url": "/API",
          "children": null,
        }, {
          "id": 6,
          "name": "系統運行監控",
          "icon": "monitor",
          "url": "/monitor",
          "children": null,
        }],
      },
    });
  },
};
