export default cachedEventHandler(async () => {
  const res = await import('../../../app_config.json')

  return res.default
}, {
  maxAge: 60 * 60,
  name: 'app-config',
  getKey: () => 'default',
})
