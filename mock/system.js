export default {

  // 菜单
  'POST /apis/system/menuController/qryMenuPage': (req, res) => {
    res.json({
      "data": [{ "menuId": 62, "menuName": "首页", "menuUrl": "/", "menuIcon": "icon-home", "orderId": 1, "parentMenuId": -1, "menuLevel": 1, "useState": 10301, "createUserId": 1, "createTime": 1532133546000, "children": null, "isLeaf": true, "related": null, "parentMenuName": "测试上级菜单", "disabled": null }, { "menuId": 44, "menuName": "源端配置", "menuUrl": "/gatewayConfig", "menuIcon": "icon-gateway", "orderId": 2, "parentMenuId": -1, "menuLevel": 1, "useState": 10301, "createUserId": 1, "createTime": 1532102297000, "children": null, "isLeaf": true, "related": null, "parentMenuName": "测试上级菜单", "disabled": null }, { "menuId": 45, "menuName": "输出关联", "menuUrl": "/command", "menuIcon": "icon-instructions", "orderId": 3, "parentMenuId": -1, "menuLevel": 1, "useState": 10301, "createUserId": 1, "createTime": 1532102339000, "children": null, "isLeaf": true, "related": null, "parentMenuName": "测试上级菜单", "disabled": null }, { "menuId": 46, "menuName": "输出配置", "menuUrl": "/protocol", "menuIcon": "icon-agreement", "orderId": 4, "parentMenuId": -1, "menuLevel": 1, "useState": 10301, "createUserId": 1, "createTime": 1532102472000, "children": null, "isLeaf": true, "related": null, "parentMenuName": "测试上级菜单", "disabled": null }, { "menuId": 47, "menuName": "作业运维", "menuUrl": "/SubscibeConfig", "menuIcon": "icon-subscribe", "orderId": 5, "parentMenuId": -1, "menuLevel": 1, "useState": 10301, "createUserId": 1, "createTime": 1532102507000, "children": null, "isLeaf": true, "related": null, "parentMenuName": "测试上级菜单", "disabled": null }, { "menuId": 48, "menuName": "监控报警", "menuUrl": "/monitoring", "menuIcon": "icon-monitor", "orderId": 6, "parentMenuId": -1, "menuLevel": 1, "useState": 10301, "createUserId": 1, "createTime": 1532102570000, "children": [{ "menuId": 49, "menuName": "运维主页", "menuUrl": "/monitoring/homePage", "menuIcon": null, "orderId": 1, "parentMenuId": 48, "menuLevel": 2, "useState": 10301, "createUserId": 1, "createTime": 1532102648000, "children": null, "isLeaf": true, "related": null, "parentMenuName": "测试上级菜单", "disabled": null }, { "menuId": 50, "menuName": "运维实例", "menuUrl": "/monitoring/OperationExample", "menuIcon": null, "orderId": 2, "parentMenuId": 48, "menuLevel": 2, "useState": 10301, "createUserId": 1, "createTime": 1532102710000, "children": null, "isLeaf": true, "related": null, "parentMenuName": "测试上级菜单", "disabled": null }, { "menuId": 51, "menuName": "运维报表", "menuUrl": "/monitoring/OperationStatment", "menuIcon": null, "orderId": 3, "parentMenuId": 48, "menuLevel": 2, "useState": 10301, "createUserId": 1, "createTime": 1532102749000, "children": null, "isLeaf": true, "related": null, "parentMenuName": "测试上级菜单", "disabled": null }], "isLeaf": false, "related": null, "parentMenuName": "测试上级菜单", "disabled": null }, { "menuId": 52, "menuName": "系统管理", "menuUrl": "/System", "menuIcon": "icon-system", "orderId": 7, "parentMenuId": -1, "menuLevel": 1, "useState": 10301, "createUserId": 1, "createTime": 1532102820000, "children": [{ "menuId": 53, "menuName": "菜单管理", "menuUrl": "/System/Menu", "menuIcon": null, "orderId": 1, "parentMenuId": 52, "menuLevel": 2, "useState": 10301, "createUserId": 1, "createTime": 1532102876000, "children": null, "isLeaf": true, "related": null, "parentMenuName": "测试上级菜单", "disabled": null }, { "menuId": 54, "menuName": "权限管理", "menuUrl": "/System/Privilege", "menuIcon": null, "orderId": 2, "parentMenuId": 52, "menuLevel": 2, "useState": 10301, "createUserId": 1, "createTime": 1532102901000, "children": null, "isLeaf": true, "related": null, "parentMenuName": "测试上级菜单", "disabled": null }, { "menuId": 55, "menuName": "账号管理", "menuUrl": "/System/SysUserMg", "menuIcon": null, "orderId": 3, "parentMenuId": 52, "menuLevel": 2, "useState": 10301, "createUserId": 1, "createTime": 1532102964000, "children": null, "isLeaf": true, "related": null, "parentMenuName": "测试上级菜单", "disabled": null }, { "menuId": 56, "menuName": "角色管理", "menuUrl": "/System/RoleMg", "menuIcon": null, "orderId": 4, "parentMenuId": 52, "menuLevel": 2, "useState": 10301, "createUserId": 1, "createTime": 1532103021000, "children": null, "isLeaf": true, "related": null, "parentMenuName": "测试上级菜单", "disabled": null }], "isLeaf": false, "related": null, "parentMenuName": "测试上级菜单", "disabled": null }, { "menuId": 63, "menuName": "测试用的", "menuUrl": "/test", "menuIcon": null, "orderId": 8, "parentMenuId": -1, "menuLevel": 1, "useState": 10301, "createUserId": 600015, "createTime": 1532356193000, "children": [{ "menuId": 64, "menuName": "测试用的1", "menuUrl": "/test/test1", "menuIcon": null, "orderId": 1, "parentMenuId": 63, "menuLevel": 2, "useState": 10301, "createUserId": 600015, "createTime": 1532356273000, "children": null, "isLeaf": true, "related": null, "parentMenuName": "测试上级菜单", "disabled": null }, { "menuId": 65, "menuName": "测试用的2", "menuUrl": "/test/test2", "menuIcon": null, "orderId": 2, "parentMenuId": 63, "menuLevel": 2, "useState": 10301, "createUserId": 600015, "createTime": 1532356326000, "children": null, "isLeaf": true, "related": null, "parentMenuName": "测试上级菜单", "disabled": null }], "isLeaf": false, "related": null, "parentMenuName": "测试上级菜单", "disabled": null }, { "menuId": 67, "menuName": "hcx22", "menuUrl": "/", "menuIcon": null, "orderId": 10, "parentMenuId": -1, "menuLevel": 1, "useState": 10301, "createUserId": 600015, "createTime": 1532359007000, "children": [{ "menuId": 69, "menuName": "测试测试", "menuUrl": "/322", "menuIcon": null, "orderId": 3, "parentMenuId": 67, "menuLevel": 2, "useState": 10301, "createUserId": 600015, "createTime": 1532361924000, "children": null, "isLeaf": true, "related": null, "parentMenuName": "测试上级菜单", "disabled": null }], "isLeaf": false, "related": null, "parentMenuName": "测试上级菜单", "disabled": null }, { "menuId": 73, "menuName": "测试4-cham", "menuUrl": "/test-cham3", "menuIcon": null, "orderId": 10, "parentMenuId": -1, "menuLevel": 1, "useState": 10301, "createUserId": 600015, "createTime": 1532622321000, "children": null, "isLeaf": true, "related": null, "parentMenuName": "测试上级菜单", "disabled": null }],
      "errCode": '0',
      "errMsg": '成功',
      "totalCount": 10,
    });
  },

  'POST /apis/system/menuController/delMenu': (req, res) => {
    const data = {
      "errCode": '0',
      "errMsg": "删除成功",
    }
    res.status(200).json(data);
  },

  'POST /apis/system/menuController/editMenu': (req, res) => {
    const data = {
      "errCode": '0',
      "errMsg": "修改成功",
    }
    res.status(200).json(data);
  },

  'POST /apis/system/menuController/addMenu': (req, res) => {
    const data = {
      "errCode": '0',
      "errMsg": "新增成功",
    }
    res.status(200).json(data);
  },

  'POST /apis/system/menuController/qryMenuDetail': (req, res) => { // 菜单详情
    const data = {
      "data": {
        "menuId": 49,
        "menuName": "测试3-cham",
        "menuUrl": "/test-cham3",
        "menuIcon": null,
        "orderId": 10,
        "parentMenuId": 48,
        "menuLevel": 1,
        "useState": 10301,
        "createUserId": 600015,
        "createTime": 1532622321000,
        "children": null,
        "isLeaf": null,
        "related": null,
        "parentMenuName": "系统管理1",
        "disabled": null,
      },
      "errCode": '0',
      "errMsg": "新增成功",
    }
    res.status(200).json(data);
  },

  'POST /apis/system/menuController/qryParMenuInfo': (req, res) => { // 根据父级ID，查询子集菜单，异步树用到
    const data = {
      "data": [{
        "menuId": 622,
        "menuName": "test",
        "menuUrl": "/test",
        "menuIcon": "icon-home",
        "orderId": 1,
        "parentMenuId": -1,
        "menuLevel": 1,
        "useState": 10301,
        "createUserId": 1,
        "createTime": 1532133546000,
      },
      {
        "menuId": 623,
        "menuName": "test2",
        "menuUrl": "/test2",
        "menuIcon": "icon-home",
        "orderId": 2,
        "parentMenuId": -1,
        "menuLevel": 1,
        "useState": 10301,
        "createUserId": 1,
        "createTime": 1532133546000,
      }],
      "errCode": '0',
      "errMsg": "新增成功",
    }
    res.status(200).json(data);
  },

  'POST /apis/system/menuController/checkMenuName': (req, res) => {
    const data = {
      "data": {
        "code": 0, // 0: 不重复; 1: 重复
      },
      "errCode": '0',
      "errMsg": "success",
    }
    res.status(200).json(data);
  },

  'POST /apis/system/menuController/checkMenuUrl': (req, res) => {
    const data = {
      "data": {
        "code": 0, // 0: 不重复; 1: 重复
      },
      "errCode": '0',
      "errMsg": "success",
    }
    res.status(200).json(data);
  },

  // 菜单end

  // 权限

  'POST /apis/system/privilegesController/qryPrivilegesPage': (req, res) => {
    res.json({
      "data": [{ "privId": 1, "privName": "系统管理员", "parentPrivId": -1, "privLevel": 1, "useState": 10301, "createUserId": null, "createTime": 1532131513000, "isLeaf": null, "related": null, "parentPrivname": "根权限", "children": [{ "privId": 55, "privName": "特殊测试", "parentPrivId": 1, "privLevel": 2, "useState": 10301, "createUserId": 600015, "createTime": 1532356380000, "isLeaf": true, "related": null, "parentPrivname": "系统管理员", "children": null, "disabled": null, "leaf": true }], "disabled": null, "leaf": null }, { "privId": 54, "privName": "普通用户", "parentPrivId": -1, "privLevel": 1, "useState": 10301, "createUserId": 600015, "createTime": 1532135611000, "isLeaf": true, "related": null, "parentPrivname": "根权限", "children": null, "disabled": null, "leaf": true }, { "privId": 68, "privName": "测试1", "parentPrivId": -1, "privLevel": 1, "useState": 10301, "createUserId": 600015, "createTime": 1532551120000, "isLeaf": true, "related": null, "parentPrivname": "根权限", "children": null, "disabled": null, "leaf": true }, { "privId": 69, "privName": "测试2", "parentPrivId": -1, "privLevel": 1, "useState": 10301, "createUserId": 600015, "createTime": 1532551133000, "isLeaf": true, "related": null, "parentPrivname": "根权限", "children": null, "disabled": null, "leaf": true }, { "privId": 70, "privName": "测试3", "parentPrivId": -1, "privLevel": 1, "useState": 10301, "createUserId": 600015, "createTime": 1532551502000, "isLeaf": true, "related": null, "parentPrivname": "根权限", "children": null, "disabled": null, "leaf": true }, { "privId": 71, "privName": "测试4", "parentPrivId": -1, "privLevel": 1, "useState": 10301, "createUserId": 600015, "createTime": 1532551502000, "isLeaf": true, "related": null, "parentPrivname": "根权限", "children": null, "disabled": null, "leaf": true }],
      "errCode": '0',
      "errMsg": '成功',
      "totalCount": 6,
    });
  },

  'POST /apis/system/privilegesController/qryPrivilegesByParent': (req, res) => {
    res.json({
      "data": [{
        "privId": 72,
        "privName": "测试5",
        "parentPrivId": -1,
        "privLevel": 1,
        "useState": 10301,
        "createUserId": 600015,
        "createTime": 1532551548000,
      }],
      "errCode": '0',
      "errMsg": '成功',
      "totalCount": 6,
    });
  },

  'POST /apis/system/privilegesController/addPrivileges': (req, res) => {
    res.json({
      "data": {},
      "errCode": '0',
      "errMsg": '成功',
    });
  },

  'POST /apis/system/privilegesController/editPrivileges': (req, res) => {
    res.json({
      "data": {},
      "errCode": '0',
      "errMsg": '成功',
    });
  },

  'POST /apis/system/privilegesController/delPrivileges': (req, res) => {
    res.json({
      "data": {},
      "errCode": '0',
      "errMsg": '成功',
    });
  },

  // 查询权限关联菜单列表
  'POST /apis/system/privMenuController/qryPrivMenuPage': (req, res) => {
    res.json({
      "data": [{
        "menuId": 48,
        "menuName": "监控报警",
        "menuUrl": "/monitoring",
        "menuIcon": "icon-monitor",
        "orderId": 6,
        "parentMenuId": -1,
        "menuLevel": 1,
        "useState": 10301,
        "createUserId": 1,
        "createTime": 1532102570000,
      }],
      "errCode": '0',
      "errMsg": '成功',
      "totalCount": 1,
    });
  },

  'POST /apis/system/privMenuController/delPrivMenu': (req, res) => {
    res.json({
      "data": {},
      "errCode": '0',
      "errMsg": '成功',
    });
  },

  'POST /apis/system/privMenuController/qryPrivMenuPageCascade': (req, res) => {
    res.json({
      "data": [
        {
          "menuId": 62,
          "menuName": "首页",
          "menuUrl": "/",
          "menuIcon": "icon-home",
          "orderId": 1,
          "parentMenuId": -1,
          "menuLevel": 1,
          "useState": 10301,
          "createUserId": 1,
          "createTime": 1532133546000,
          "children": null,
          "isLeaf": true,
          "related": "1",
          "parentMenuName": null,
          "disabled": true,
        },
        {
          "menuId": 44,
          "menuName": "源端配置",
          "menuUrl": "/ziyuan",
          "menuIcon": "icon-home",
          "orderId": 1,
          "parentMenuId": -1,
          "menuLevel": 1,
          "useState": 10301,
          "createUserId": 1,
          "createTime": 1532133546000,
          "children": null,
          "isLeaf": true,
          "related": "2",
          "parentMenuName": null,
          "disabled": true,
        },
      ],
      "errCode": '0',
      "errMsg": '成功',
      "totalCount": 2,
    });
  },

  'POST /apis/system/privMenuController/addPrivMenu': (req, res) => {
    res.json({
      "data": {},
      "errCode": '0',
      "errMsg": '成功',
    });
  },







  'POST /apis/system/loginController/getLoginInfo': (req, res) => {
    res.json({
      "data": { "userInfo": { "userId": 600015, "userName": "admin管理员", "nickName": "admin", "idCard": "http://10.45.47.18:8080/group1/M00/01/17/Ci0vElqsyv6AJ-tdAAAachHYd0Q074.jpg", "userCode": "admin", "password": "f03f6ee8a23d04a183dc36b05d6a0ce3", "mobileNo": "13631377878", "email": "admin@163.com", "useState": 10301, "createUserId": 1, "createTime": 1530115731000, "comments": "管理员", "latestLoginTime": null }, "roleInfo": [{ "rolesId": 700001, "rolesName": "系统管理员", "useState": 10301, "createUserId": 600001, "createTime": 1528837002000, "comments": "系统管理者" }], "menuInfo": [{ "menuId": 62, "menuName": "首页", "menuUrl": "/", "menuIcon": "icon-home", "orderId": 1, "parentMenuId": -1, "menuLevel": 1, "useState": 10301, "createUserId": 1, "createTime": 1532133546000, "children": null, "isLeaf": null, "related": null, "parentMenuName": "测试上级菜单", "disabled": null }, { "menuId": 44, "menuName": "源端配置", "menuUrl": "/gatewayConfig", "menuIcon": "icon-gateway", "orderId": 2, "parentMenuId": -1, "menuLevel": 1, "useState": 10301, "createUserId": 1, "createTime": 1532102297000, "children": null, "isLeaf": null, "related": null, "parentMenuName": "测试上级菜单", "disabled": null }, { "menuId": 45, "menuName": "输出关联", "menuUrl": "/command", "menuIcon": "icon-instructions", "orderId": 3, "parentMenuId": -1, "menuLevel": 1, "useState": 10301, "createUserId": 1, "createTime": 1532102339000, "children": null, "isLeaf": null, "related": null, "parentMenuName": "测试上级菜单", "disabled": null }, { "menuId": 46, "menuName": "输出配置", "menuUrl": "/protocol", "menuIcon": "icon-agreement", "orderId": 4, "parentMenuId": -1, "menuLevel": 1, "useState": 10301, "createUserId": 1, "createTime": 1532102472000, "children": null, "isLeaf": null, "related": null, "parentMenuName": "测试上级菜单", "disabled": null }, { "menuId": 47, "menuName": "作业运维", "menuUrl": "/SubscibeConfig", "menuIcon": "icon-subscribe", "orderId": 5, "parentMenuId": -1, "menuLevel": 1, "useState": 10301, "createUserId": 1, "createTime": 1532102507000, "children": null, "isLeaf": null, "related": null, "parentMenuName": "测试上级菜单", "disabled": null }, { "menuId": 48, "menuName": "监控报警", "menuUrl": "/monitoring", "menuIcon": "icon-monitor", "orderId": 6, "parentMenuId": -1, "menuLevel": 1, "useState": 10301, "createUserId": 1, "createTime": 1532102570000, "children": [{ "menuId": 49, "menuName": "运维主页", "menuUrl": "/monitoring/homePage", "menuIcon": null, "orderId": 1, "parentMenuId": 48, "menuLevel": 2, "useState": 10301, "createUserId": 1, "createTime": 1532102648000, "children": null, "isLeaf": null, "related": null, "parentMenuName": "测试上级菜单", "disabled": null }, { "menuId": 50, "menuName": "运维实例", "menuUrl": "/monitoring/OperationExample", "menuIcon": null, "orderId": 2, "parentMenuId": 48, "menuLevel": 2, "useState": 10301, "createUserId": 1, "createTime": 1532102710000, "children": null, "isLeaf": null, "related": null, "parentMenuName": "测试上级菜单", "disabled": null }, { "menuId": 51, "menuName": "运维报表", "menuUrl": "/monitoring/OperationStatment", "menuIcon": null, "orderId": 3, "parentMenuId": 48, "menuLevel": 2, "useState": 10301, "createUserId": 1, "createTime": 1532102749000, "children": null, "isLeaf": null, "related": null, "parentMenuName": "测试上级菜单", "disabled": null }], "isLeaf": null, "related": null, "parentMenuName": "测试上级菜单", "disabled": null }, { "menuId": 52, "menuName": "系统管理", "menuUrl": "/System", "menuIcon": "icon-system", "orderId": 7, "parentMenuId": -1, "menuLevel": 1, "useState": 10301, "createUserId": 1, "createTime": 1532102820000, "children": [{ "menuId": 53, "menuName": "菜单管理", "menuUrl": "/System/Menu", "menuIcon": null, "orderId": 1, "parentMenuId": 52, "menuLevel": 2, "useState": 10301, "createUserId": 1, "createTime": 1532102876000, "children": null, "isLeaf": null, "related": null, "parentMenuName": "测试上级菜单", "disabled": null }, { "menuId": 54, "menuName": "权限管理", "menuUrl": "/System/Privilege", "menuIcon": null, "orderId": 2, "parentMenuId": 52, "menuLevel": 2, "useState": 10301, "createUserId": 1, "createTime": 1532102901000, "children": null, "isLeaf": null, "related": null, "parentMenuName": "测试上级菜单", "disabled": null }, { "menuId": 55, "menuName": "账号管理", "menuUrl": "/System/SysUserMg", "menuIcon": null, "orderId": 3, "parentMenuId": 52, "menuLevel": 2, "useState": 10301, "createUserId": 1, "createTime": 1532102964000, "children": null, "isLeaf": null, "related": null, "parentMenuName": "测试上级菜单", "disabled": null }, { "menuId": 56, "menuName": "角色管理", "menuUrl": "/System/RoleMg", "menuIcon": null, "orderId": 4, "parentMenuId": 52, "menuLevel": 2, "useState": 10301, "createUserId": 1, "createTime": 1532103021000, "children": null, "isLeaf": null, "related": null, "parentMenuName": "测试上级菜单", "disabled": null }], "isLeaf": null, "related": null, "parentMenuName": "测试上级菜单", "disabled": null }, { "menuId": 63, "menuName": "测试用的", "menuUrl": "/test", "menuIcon": null, "orderId": 8, "parentMenuId": -1, "menuLevel": 1, "useState": 10301, "createUserId": 600015, "createTime": 1532356193000, "children": [{ "menuId": 64, "menuName": "测试用的1", "menuUrl": "/test/test1", "menuIcon": null, "orderId": 1, "parentMenuId": 63, "menuLevel": 2, "useState": 10301, "createUserId": 600015, "createTime": 1532356273000, "children": null, "isLeaf": null, "related": null, "parentMenuName": "测试上级菜单", "disabled": null }, { "menuId": 65, "menuName": "测试用的2", "menuUrl": "/test/test2", "menuIcon": null, "orderId": 2, "parentMenuId": 63, "menuLevel": 2, "useState": 10301, "createUserId": 600015, "createTime": 1532356326000, "children": null, "isLeaf": null, "related": null, "parentMenuName": "测试上级菜单", "disabled": null }], "isLeaf": null, "related": null, "parentMenuName": "测试上级菜单", "disabled": null }] }, "code": "0", "message": "SUCCESS",
      errCode: '0',
      errMsg: '成功',
    });
  },

  'POST /apis/system/userController/qryUserPage': (req, res) => {
    res.json({
      "data": { "totalCount": 4, "pageInfo": { "currentPage": 1, "pageSize": 10, "totalRow": 4, "pageCount": 1 }, "page": 1, "list": [{ "userId": 1, "userName": "zte", "nickName": "zte修改", "idCard": "http://10.45.47.18:8080/group1/M00/01/17/Ci0vElqsyv6AJ-tdAAAachHYd0Q074.jpg", "userCode": "zte", "password": "c12e01f2a13ff5587e1e9e4aedb8242d", "mobileNo": "13777777777", "email": "", "useState": 10301, "createUserId": 600001, "createTime": 1528832386000, "comments": "系统访问者", "latestLoginTime": 1528832395000, "roles": [{ "rolesId": 700002, "rolesName": "普通用户", "useState": 10301, "createUserId": 600001, "createTime": 1528837007000, "comments": "系统访问者" }], "projectNames": [] }, { "userId": 600015, "userName": "admin管理员", "nickName": "admin", "idCard": "http://10.45.47.18:8080/group1/M00/01/17/Ci0vElqsyv6AJ-tdAAAachHYd0Q074.jpg", "userCode": "admin", "password": "f03f6ee8a23d04a183dc36b05d6a0ce3", "mobileNo": "13631377878", "email": "admin@163.com", "useState": 10301, "createUserId": 1, "createTime": 1530115731000, "comments": "管理员", "latestLoginTime": null, "roles": [{ "rolesId": 700001, "rolesName": "系统管理员", "useState": 10301, "createUserId": 600001, "createTime": 1528837002000, "comments": "系统管理者" }], "projectNames": [] }, { "userId": 600026, "userName": "测试1", "nickName": "测试仔", "idCard": "http://10.45.47.18:8080/group1/M00/01/17/Ci0vElqsyv6AJ-tdAAAachHYd0Q074.jpg", "userCode": "dw_ceshi1", "password": "78302615c8b79cac8df6d2607f8a83ee", "mobileNo": "18888888888", "email": "1@qq.com", "useState": 10301, "createUserId": 600015, "createTime": 1532359929000, "comments": "111", "latestLoginTime": null, "roles": [{ "rolesId": 700001, "rolesName": "系统管理员", "useState": 10301, "createUserId": 600001, "createTime": 1528837002000, "comments": "系统管理者" }, { "rolesId": 700002, "rolesName": "普通用户", "useState": 10301, "createUserId": 600001, "createTime": 1528837007000, "comments": "系统访问者" }, { "rolesId": 700013, "rolesName": "测试用角色1_1", "useState": 10301, "createUserId": 600015, "createTime": 1532314303000, "comments": "测试用角色1测试用角色1_1" }, { "rolesId": 700014, "rolesName": "测试用角色2", "useState": 10301, "createUserId": 600015, "createTime": 1532314323000, "comments": "测试用角色2" }, { "rolesId": 700015, "rolesName": "测试用角色3", "useState": 10301, "createUserId": 600015, "createTime": 1532314377000, "comments": "测试用角色3" }, { "rolesId": 700016, "rolesName": "测试用角色4", "useState": 10301, "createUserId": 600015, "createTime": 1532314387000, "comments": "测试用角色4" }, { "rolesId": 700017, "rolesName": "测试用角色5", "useState": 10301, "createUserId": 600015, "createTime": 1532314525000, "comments": "测试用角色5" }], "projectNames": [] }, { "userId": 600027, "userName": "cham", "nickName": "cham", "idCard": "http://10.45.47.18:8080/group1/M00/01/17/Ci0vElqsyv6AJ-tdAAAachHYd0Q074.jpg", "userCode": "cham", "password": "18e0e5f3389efa0b31738c2fd44630d8", "mobileNo": "15922222222", "email": "cham@c.com", "useState": 10301, "createUserId": 600015, "createTime": 1532632905000, "comments": "cham", "latestLoginTime": null, "roles": [{ "rolesId": 700001, "rolesName": "系统管理员", "useState": 10301, "createUserId": 600001, "createTime": 1528837002000, "comments": "系统管理者" }], "projectNames": [] }] }, "code": "0", "message": "SUCCESS",
      errCode: '0',
      errMsg: '成功',
    });
  },

  'POST /apis/system/rolesController/qryRolesPage': (req, res) => {
    res.json({
      "data": { "totalCount": 7, "pageInfo": { "currentPage": 1, "pageSize": 5, "totalRow": 7, "pageCount": 2 }, "page": 1, "list": [{ "rolesId": 700001, "rolesName": "系统管理员", "useState": 10301, "createUserId": 600001, "createTime": 1528837002000, "comments": "系统管理者" }, { "rolesId": 700002, "rolesName": "普通用户", "useState": 10301, "createUserId": 600001, "createTime": 1528837007000, "comments": "系统访问者" }, { "rolesId": 700013, "rolesName": "测试用角色1_1", "useState": 10301, "createUserId": 600015, "createTime": 1532314303000, "comments": "测试用角色1测试用角色1_1" }, { "rolesId": 700014, "rolesName": "测试用角色2", "useState": 10301, "createUserId": 600015, "createTime": 1532314323000, "comments": "测试用角色2" }, { "rolesId": 700015, "rolesName": "测试用角色3", "useState": 10301, "createUserId": 600015, "createTime": 1532314377000, "comments": "测试用角色3" }] }, "code": "0", "message": "SUCCESS",
      errCode: '0',
      errMsg: '成功',
    });
  },

  'POST /apis/system/apiController/qryApiPage': (req, res) => {
    res.json({
      errCode: '0',
      errMsg: '成功',
      totalCount: 1,
      data: [
        {
          "apiId": 1,
          "apiName": "sdsd",
          "apiUrl": "dsd/sdsd/ee",
          "desc": "2222",
          "status": 10301, // 100301-有效,10304-无效
          "gmtCreate": new Date(), // 创建时间
          "gmtModified": "", // 修改时间
        },
        {
          "apiId": 2,
          "apiName": "撒大声地",
          "apiUrl": "dsd/sdsd/ee122",
          "desc": "二位",
          "status": 10301, // 100301-有效,10304-无效
          "gmtCreate": new Date(), // 创建时间
          "gmtModified": "", // 修改时间
        },
        {
          "apiId": 3,
          "apiName": "一天一夜晕晕",
          "apiUrl": "dsd/sdsd/ee321",
          "desc": "但事实上所所",
          "status": 10304, // 100301-有效,10304-无效
          "gmtCreate": new Date(), // 创建时间
          "gmtModified": "", // 修改时间
        },
      ],
    });
  },

  'POST /apis/system/privApiController/qryPrivApiPage': (req, res) => {
    res.json({
      errCode: '0',
      errMsg: '成功',
      totalCount: 3,
      data: [
        {
          "apiId": 1,
          "apiName": "sdsd",
          "apiUrl": "dsd/sdsd/ee",
          "desc": "2222",
          "status": 10301, // 100301-有效,10304-无效
          "gmtCreate": new Date(), // 创建时间
          "gmtModified": "", // 修改时间
        },
        {
          "apiId": 2,
          "apiName": "撒大声地",
          "apiUrl": "dsd/sdsd/ee122",
          "desc": "二位",
          "status": 10301, // 100301-有效,10304-无效
          "gmtCreate": new Date(), // 创建时间
          "gmtModified": "", // 修改时间
        },
        {
          "apiId": 3,
          "apiName": "一天一夜晕晕",
          "apiUrl": "dsd/sdsd/ee321",
          "desc": "但事实上所所",
          "status": 10304, // 100301-有效,10304-无效
          "gmtCreate": new Date(), // 创建时间
          "gmtModified": "", // 修改时间
        },
      ],
    });
  },

  'POST /apis/system/privApiController/qryPrivApiPageCascade': (req, res) => {
    res.json({
      errCode: '0',
      errMsg: '成功',
      totalCount: 3,
      data: [
        {
          "apiId": 1,
          "apiName": "sdsd",
          "apiUrl": "dsd/sdsd/ee",
          "desc": "2222",
          "status": 10301, // 100301-有效,10304-无效
          "gmtCreate": new Date(), // 创建时间
          "gmtModified": "", // 修改时间
          "disabled": true,
        },
        {
          "apiId": 2,
          "apiName": "撒大声地",
          "apiUrl": "dsd/sdsd/ee122",
          "desc": "二位",
          "status": 10301, // 100301-有效,10304-无效
          "gmtCreate": new Date(), // 创建时间
          "gmtModified": "", // 修改时间
          "disabled": true,
        },
        {
          "apiId": 3,
          "apiName": "一天一夜晕晕",
          "apiUrl": "dsd/sdsd/ee321",
          "desc": "但事实上所所",
          "status": 10304, // 100301-有效,10304-无效
          "gmtCreate": new Date(), // 创建时间
          "gmtModified": "", // 修改时间
          "disabled": true,
        },
      ],
    });
  },

  'POST /apis/system/privApiController/addPrivApi': (req, res) => {
    res.json({
      errCode: '0',
      errMsg: '成功',
    });
  },

  'POST /apis/system/loginController/getLoginSession': (req, res) => {
    res.json(
      { "errCode": "0", "errMsg": null, "totalCount": null, "data": { "token": "VCS_MA_LOGIN", "userInfo": { "userCode": "admin", "userName": "admin" }, "roleList": [{ "roleId": 700028, "roleCode": null, "roleName": "管理员", "menuList": [{ "menuId": 111, "menuName": "首页", "menuIcon": "home", "menuUrl": "admhome", "menuLevel": 1, "orderId": 1, "children": null }, { "menuId": 112, "menuName": "接口标准", "menuIcon": "inter", "menuUrl": "intfStandard", "menuLevel": 1, "orderId": 2, "children": null }, { "menuId": 113, "menuName": "运维监控", "menuIcon": "oper", "menuUrl": "admmonitor", "menuLevel": 1, "orderId": 3, "children": null }, { "menuId": 114, "menuName": "日志审计", "menuIcon": "log", "menuUrl": "admlogperation", "menuLevel": 1, "orderId": 4, "children": null }, { "menuId": 115, "menuName": "效果验证", "menuIcon": "sys", "menuUrl": "admverificat", "menuLevel": 1, "orderId": 5, "children": null }, { "menuId": 128, "menuName": "算法评测数据", "menuIcon": "oper", "menuUrl": "date-visual", "menuLevel": 1, "orderId": 6, "children": null }, { "menuId": 116, "menuName": "资源配置", "menuIcon": "sys", "menuUrl": "resConfig", "menuLevel": 1, "orderId": 6, "children": null }, { "menuId": 138, "menuName": "图搜白名单", "menuIcon": "log", "menuUrl": "whiteList", "menuLevel": 1, "orderId": 6, "children": null }, { "menuId": 117, "menuName": "系统管理", "menuIcon": "sys", "menuUrl": "sysMng", "menuLevel": 1, "orderId": 7, "children": [{ "menuId": 118, "menuName": "菜单管理", "menuIcon": null, "menuUrl": "sysMng/menuMng", "menuLevel": 2, "orderId": 1, "children": null }, { "menuId": 119, "menuName": "权限管理", "menuIcon": null, "menuUrl": "sysMng/privMng", "menuLevel": 2, "orderId": 2, "children": null }, { "menuId": 120, "menuName": "账号管理", "menuIcon": null, "menuUrl": "sysMng/userMng", "menuLevel": 2, "orderId": 3, "children": null }, { "menuId": 121, "menuName": "角色管理", "menuIcon": null, "menuUrl": "sysMng/roleMng", "menuLevel": 2, "orderId": 4, "children": null }, { "menuId": 142, "menuName": "API管理", "menuIcon": "", "menuUrl": "sysMng/apiMng", "menuLevel": 2, "orderId": 5, "children": null }] }, { "menuId": 139, "menuName": "设备档案", "menuIcon": "oper", "menuUrl": "deviceProfile", "menuLevel": 1, "orderId": 8, "children": null }, { "menuId": 143, "menuName": "集群管理", "menuIcon": "sys", "menuUrl": "clusterMg", "menuLevel": 1, "orderId": 20, "children": null }], "apiList": null }] } }
    );
  },

};
