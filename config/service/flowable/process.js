
import request from "../../request.js";
import baseURL from '../../index.js';

// 我的发起的流程
export function myProcessList(query) {
  return request({
  	url: baseURL + '/flowable/task/myProcess',
  	method: 'get',
  	params: query
  });
}

// 读取image文件
export function getFlowViewer(procInsId) {
  return request({
    url: baseURL + '/flowable/task/flowViewer/' + procInsId,
    method: 'get'
  });
}

// 任务流转记录
export function flowRecord(query) {
  return request({
    url: baseURL + '/flowable/task/flowRecord',
    method: 'get',
    params: query
  });
}

// 获取流程变量
export function getProcessVariables(taskId, deployId) {
  return request({
    url: baseURL + '/flowable/task/processVariables/' + taskId + '/' + deployId,
    method: 'get'
  });
}

// 查询待办任务列表
export function todoList(query) {
  return request({
    url: baseURL + '/flowable/task/todoList',
    method: 'get',
    params: query
  });
}

// 完成任务
export function complete(data) {
  return request({
    url: baseURL + '/flowable/task/complete',
    method: 'post',
    data: data
  });
}

// 拒绝通过
export function refuseProcess(data) {
  return request({
    url: baseURL + '/flowable/task/refuseProcess',
    method: 'post',
    data: data
  });
}

// 查询已办任务列表
export function finishedList(query) {
  return request({
    url: baseURL + '/flowable/task/finishedList',
    method: 'get',
    params: query
  });
}

// 取消申请
export function stopProcess(data) {
  return request({
    url: baseURL + '/flowable/task/stopProcess',
    method: 'post',
    data: data
  })
}

// 删除流程定义
export function delDeployment(data) {
  return request({
    url: baseURL + '/flowable/instance/delete',
    method: 'delete',
    params: data
  });
}

// 查询流程定义列表
export function selectMyList(query) {
  return request({
    url: baseURL + '/flowable/definition/selectMyList',
    method: 'get',
    params: query
  });
}

// 部署流程实例
export function definitionStart(procDefId, data) {
  return request({
    url: baseURL + '/flowable/definition/start/' + procDefId,
    method: 'post',
    data: data
  });
}


// // 驳回任务
// export function rejectTask(data) {
//   return request({
//     url: '/flowable/task/reject',
//     method: 'post',
//     data: data
//   })
// }

// // 可退回任务列表
// export function returnList(data) {
//   return request({
//     url: '/flowable/task/returnList',
//     method: 'post',
//     data: data
//   })
// }

// // 部署流程实例
// export function deployStart(deployId) {
//   return request({
//     url: '/flowable/process/startFlow/' + deployId,
//     method: 'get',
//   })
// }

// // 查询流程定义详细
// export function getDeployment(id) {
//   return request({
//     url: '/system/deployment/' + id,
//     method: 'get'
//   })
// }

// // 新增流程定义
// export function addDeployment(data) {
//   return request({
//     url: '/system/deployment',
//     method: 'post',
//     data: data
//   })
// }

// // 修改流程定义
// export function updateDeployment(data) {
//   return request({
//     url: '/system/deployment',
//     method: 'put',
//     data: data
//   })
// }



// // 导出流程定义
// export function exportDeployment(query) {
//   return request({
//     url: '/system/deployment/export',
//     method: 'get',
//     params: query
//   })
// }
