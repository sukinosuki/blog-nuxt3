export default cachedEventHandler(async () => {
  const res = await import('../../../app_config.json')

  return res.default
})
