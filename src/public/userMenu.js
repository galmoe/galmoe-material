export default [
  { heading: 'some heading' },
  { icon: 'home', text: '首页', href: '/' },
  { icon: 'person', text: '个人', href: '/u/1/home' },
  { icon: 'favorite', text: '收藏', href: '/u/1/fav' },
  { icon: 'notifications', text: '消息', href: '/notification' },
  {
    appendIcon: 'home',
    icon: 'keyboard_arrow_up',
    'icon-alt': 'keyboard_arrow_up',
    text: '发布',
    model: true,
    children: [
      { icon: 'send', text: '发布', href: '/publish/publish' },
      { icon: 'edit', text: '管理', href: '/publish/manager' }
    ]
  },
  {
    icon: 'keyboard_arrow_up',
    'icon-alt': 'keyboard_arrow_up',
    text: 'Admin',
    model: false,
    children: [
      { text: '发布', href: '/admin/post' },
      { text: '用户', href: '/admin/user' },
      { text: '评论', href: '/admin/comment' },
      { text: '新闻', href: '/admin/news' }
    ]
  },
  { icon: 'info', text: '关于', href: '/about' },
  { icon: 'settings', text: '设置与隐私', href: '/setting' }
]
