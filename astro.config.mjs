import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import mdx from '@astrojs/mdx'

export default defineConfig({
  site: 'https://daring-wx.github.io',
  base: '/datang-shuyuan',
  trailingSlash: true,
  integrations: [vue(), mdx()],
  devToolbar: {
    enabled: false
  }
})
