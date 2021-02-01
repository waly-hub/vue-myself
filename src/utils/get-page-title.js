import defaultSetting from '@/setting.js'
const title = defaultSetting.title || 'Vue Myself'

export default function getPageTitle (pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}