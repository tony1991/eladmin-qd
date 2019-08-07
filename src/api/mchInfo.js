import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/mchInfo',
    method: 'post',
    data
  })
}

export function del(mchId) {
  return request({
    url: 'api/mchInfo/' + mchId,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/mchInfo',
    method: 'put',
    data
  })
}
