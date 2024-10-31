import { defineNavbarConfig } from 'vuepress-theme-plume'

export const navbar = defineNavbarConfig([
  { text: '首页', link: '/' },
  { text: '博客', link: '/blog/' },
  // { text: '标签', link: '/blog/tags/' },
  { text: '归档', link: '/blog/archives/' },
  { text: '分类', link: '/blog/categories/' },
  {text:'作者常用',link: '/notes/常用/README.md'},
  // {
  //   text: '笔记',
  //   items: [
  //       { text: '示例', link: '/notes/demo/README.md' }
  //
  //   ]
  // },

])
