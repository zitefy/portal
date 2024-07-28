import { Template } from '~/types'
import { makeRequest } from '.'
import { BASE_URL } from './config'

export const getAllTemplates = async() => {
  const request = {
    url: '/template/all',
    method: 'GET',
  }

  return await makeRequest<Template[]>(request)
}

export const getLatestTemplates = async() => {
  const request = {
    url: '/template/latest',
    method: 'GET',
  }
  return await makeRequest<Template[]>(request)
}

export const getTemplatePreview = (id: string, isWide: boolean) => {
  return `${BASE_URL}/template/preview?id=${id}&wide=${isWide}`
}
