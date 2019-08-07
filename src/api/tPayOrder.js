import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/tPayOrder',
    method: 'post',
    data
  })
}

export function del(payOrderId) {
  return request({
    url: 'api/tPayOrder/' + payOrderId,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/tPayOrder',
    method: 'put',
    data
  })
}
