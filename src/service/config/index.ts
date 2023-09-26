let BASE_URL = ''
if (import.meta.env.PROD) {
  // 生产环境
  BASE_URL = 'http://codercba.com:5000'
  // console.log(import.meta.env.PROD)
} else {
  // 开发环境
  BASE_URL = 'http://codercba.com:5000'
  // console.log(import.meta.env.PROD)
}

export { BASE_URL }
export const TIME_OUT = 10000

// console.log(import.meta.env.BASE_URL)
