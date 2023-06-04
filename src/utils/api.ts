import axios, { AxiosError, Method } from 'axios'

class Client {
  constructor(protected baseUrl: string) {}

  public async get<T = any>(url: string, params?: Record<string, string>) {
    const urlParams = new URLSearchParams(params)

    return await this.request('GET', url, {
      params: urlParams
    })
  }

  public async post<T = any>(url: string, data: Record<string, unknown> | Record<string, unknown>[]) {
    return await this.request('POST', url, { data })
  }

  public async put<T = any>(url: string, data: Record<string, unknown>) {
    return await this.request('PUT', url, { data })
  }

  public async delete<T = any>(url: string) {
    return await this.request('DELETE', url)
  }

  protected async request<T = any>(
    method: Method,
    url: string,
    info?: {
      data?: Record<string, unknown> | Record<string, unknown>[]
      params?: URLSearchParams
    }
  ) {
    const username = process.env.REACT_APP_COLLECT_BASIC_AUTH_USERNAME
    const password = process.env.REACT_APP_COLLECT_BASIC_AUTH_PASSWORD

    try {
      const response = await axios.request<T & { message?: string }>({
        baseURL: this.baseUrl,
        method,
        url,
        data: info?.data,
        params: info?.params,
        auth: {
          username: username || '',
          password: password || ''
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })

      await new Promise(resolve => setTimeout(resolve, 2000))

      if (response.data.message) {
        throw new AxiosError(response.data.message)
      }

      if (!response.data) {
        throw new Error('No data returned')
      }

      return response.data
    } catch (e) {
      throw e
    }
  }
}

export default new Client(process.env.NEXTAUTH_URL || '')
