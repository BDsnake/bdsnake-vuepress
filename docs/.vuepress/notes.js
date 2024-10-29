import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

const demoNote = defineNoteConfig({
  dir: 'demo',
  link: '/demo',
  sidebar: ['', 'foo', 'bar'],
})
const customNote = defineNoteConfig({
  dir: '常用',
  link: '/常用',
  sidebar: 'auto',
})
export const notes = defineNotesConfig({
  dir: 'notes',
  link: '/',
  notes: [demoNote,customNote],
})
