import hyRequest from '@/service'

export function getStorysDate() {
  return hyRequest.post({
    url: '/story/list'
  })
}

export function postStorysDate(data: any) {
  return hyRequest.post({
    url: '/story',
    data: data
  })
}
