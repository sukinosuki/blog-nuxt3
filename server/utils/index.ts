export const sleep = (duration = 300) => new Promise((resolve) => {
  setTimeout(() => {
    resolve(true)
  }, duration)
})
