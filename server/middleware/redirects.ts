import { parseURL } from 'ufo'

export default eventHandler(async (event) => {
  // Skip during prerendering
  if (import.meta.prerender) return

  // const { pathname } = parseURL(event.path)
  // const redirects = await hubKV().get<{ [key: string]: string }>('redirects').catch(err=>{
  //   console.log('err ', err);
    
  // })

  // return sendRedirect(event, 'hanami22333')
  // if (redirects?.[pathname]) {
  //   return sendRedirect(event, redirects[pathname])
  // }
})
