type Nav = {
  name: string
  path: string
  children?: Nav[]
}
type Social = {
  name: string
  link: string
  icon: string
  color: string
}

export type AppConfig = {
  navs: Nav[]
  icp?: {
    link: string
    text: string
  }
  site?: {
    name: string
    link: string
  }
  social: Social[]
  me: {
    name: string
    introduction: string
  }
}

export default defineAppConfig<AppConfig>({
  navs: [
    {
      name: 'Home',
      path: '/',
      children: [
        {
          name: '关于本站11',
          path: '/post/about-site',
        },
        {
          name: '关于我',
          path: '/post/about-me',
        },
      ],
    },
    {
      name: 'Post',
      path: '/post',
      children: [
        {
          name: '编程',
          path: '/category/programming',
        },
        {
          name: '生活',
          path: '/category/life',
        },
      ],
    },
    {
      name: 'Friends',
      path: '/friend',
      children: [],
    },
    {
      name: 'Other',
      path: '/',
      children: [
        {
          name: '思考',
          path: '/thinking',
        },
        {
          name: '语录',
          path: '/says',
        },
        {
          name: '项目',
          path: '/project',
        },
      ],
    },
  ],
  icp: {
    link: 'https://www.bilibili.com',
    text: 'ICP备20240806111号',
  },
  site: {
    name: 'Miiro Works',
    link: '',
  },
  social: [
    {
      name: 'Bilibili',
      link: 'https://space.bilibili.com/672111',
      icon: 'i-ri:bilibili-line',
      color: 'bg-sky',
    },
    {
      name: '小红书',
      link: 'https://www.xiaohongshu.com/user/profile/6502ac75000000001603b403',
      icon: 'i-simple-icons:xiaohongshu',
      color: 'bg-red',
    },
    {
      name: 'Github',
      link: 'https://github.com/sukinosuki',
      icon: 'i-ri:github-line',
      color: 'bg-black',
    },
    {
      name: 'Email',
      link: 'mailto:miiro444@outlook.com',
      icon: 'i-ri:mail-line',
      color: 'bg-gray',
    },
  ],
  me: {
    name: '桜花秋水',
    introduction: '',
  },
})
