import { Site, Link, Source, SitePreview } from '~/types'
import { makeAuthRequest, makeRequest, Request } from '.'
import { BASE_URL } from './config'

export const newSite = async(template_id: string): Promise<string> => {
  const request: Request = {
    url: '/site/new',
    method: 'POST',
    data: { template_id },
  }

  type Response = {
    site_id: string
  }

  return (await makeAuthRequest<Response>(request)).site_id
}

export const activateSite = async(id: string) => {
  const request: Request = {
    url: '/user/activate',
    method: 'POST',
    data: { id },
  }

  return await makeAuthRequest<string>(request, true)
}

export const renameSite = async(site_id: string, new_name: string) => {
  const request: Request = {
    url: '/site/rename',
    method: 'PUT',
    data: { site_id, new_name },
  }

  return await makeAuthRequest<string>(request, true)
}

export const getSites = async() => {
  const request: Request = {
    url: '/user/sites',
    method: 'GET',
  }

  return await makeAuthRequest<Site[]>(request)
}

export const getSiteData = async(site_id?: string) => {
  if(!site_id) return[]
  const request: Request = {
    url: '/site/data',
    method: 'POST',
    data: { site_id },
  }

  return await makeAuthRequest<Link[]>(request)
}

export const setSiteData = async(site_id: string, data: Link[]) => {
  const request: Request = {
    url: '/site/save',
    method: 'PUT',
    data: { site_id, data },
  }

  return await makeAuthRequest<string>(request, true)
}

export const getSitePreview = (id: string, isWide: boolean) => {
  return `${BASE_URL}/site/preview?id=${id}&wide=${isWide}&t=${(new Date()).getTime()}`
}

export const getSource = async(site_id: string) => {
  const request: Request = {
    url: '/site/source',
    method: 'POST',
    data: { site_id },
  }

  return await makeAuthRequest<Source>(request)
}

export const uploadAsset = async(file: File, site: string) => {
  const formData = new FormData()
  formData.append('file_name', file.name)
  formData.append('file', file)
  formData.append('site_id', site)

  const request: Request = {
    url: '/site/asset',
    method: 'PUT',
    multipart: formData,
  }
  type Response = {
    assets: string[]
  }
  return await makeAuthRequest<Response>(request)
}

export const getAssetURL = (site_id: string, asset: string):string => {
  return `${BASE_URL}/site/asset?site=${site_id}&resource=${asset}`
}

export const getCodePreview = async(html: string, css: string, js: string, data: Link[]) => {
  const request: Request = {
    url: '/site/preview_code',
    method: 'POST',
    data: {html, css, js, data},
  }

  return await makeRequest<SitePreview>(request)
}

export const getCodePreviewURL = (uid: string) => {
  return `${BASE_URL}/preview/${uid}`
}

export const saveCode = async(html: File, css: File, js: File, site_id: string) => {
  const formData = new FormData()
  formData.append('html', html)
  formData.append('css', css)
  formData.append('js', js)
  formData.append('site_id', site_id)

  const request: Request = {
    url: '/site/source',
    method: 'PUT',
    multipart: formData,
  }

  return await makeAuthRequest<string>(request, true)
}
