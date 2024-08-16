import dayjs from 'dayjs'

const dateUtil = {

  format(date: string | Date, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return dayjs(date).format(pattern)
  },

  formatCnYMD(date: string | Date) {
    return this.format(date, 'YYYY年M月D日')
  },
}

export default dateUtil
