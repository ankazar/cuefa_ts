import Axios, { CreateAxiosDefaults } from 'axios'
import axiosRetry, { IAxiosRetryConfig } from 'axios-retry'
import { TypeUtils } from 'src/util/common/TypeUtils.ts'
import Callback1 = TypeUtils.Callback1




export namespace FileUtils {
  
  
  const commonAxiosRetryConfig: IAxiosRetryConfig = {
    retries: 2,
    retryDelay: (retryCount, error)=>500,
    // A callback to further control if a request should be retried.
    // By default, it retries if it is a network error
    // or a 5xx error on an idempotent request (GET, HEAD, OPTIONS, PUT or DELETE).
    /* retryCondition: error => {
     return error.response.status === 503;
     }, */
  }
  
  export const blobToDataUrl =
  async (
    file: Blob,
    options?: {
      onProgress?: Callback1<number|null>
      abortCtrl?: AbortController
    }
  ): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onprogress = ev=>{
      options?.onProgress?.(ev.lengthComputable ? ev.loaded / ev.total : null)
    }
    reader.onload = ev=>resolve(ev.target?.result as string)
    reader.onerror = ev=>reject(ev)
    reader.onabort = ev=>reject(ev)
    
    const ctrl = options?.abortCtrl
    if (ctrl) {
      if (ctrl.signal.aborted){
        reject(ctrl.signal.reason)
        return
      }
      ctrl.signal.onabort = reader.abort
    }
    
    //reader.readAsArrayBuffer(file)
    reader.readAsDataURL(file)
  })
  
  
  /*
  export const dataUrlToBlob = async (dataUrl: string): Promise<Blob> => {
    const response = await fetch(dataUrl)
    const blob = await response.blob()
    return blob
  }
   */
  
  
  export const fetchToBlob =
  async (url: string): Promise<Blob> => {
    const config: CreateAxiosDefaults = {
      responseType: 'blob'
    }
    
    const ax = Axios.create(config)
    axiosRetry(ax, commonAxiosRetryConfig)
    
    const response = await ax.get<Blob>(url)
    return response.data
  }
  
  
  
  export const trimExtension = (fileName: string) =>
    fileName.replace(/\.[^.]*$/,'')
  
  
  
  export const extensionFromMimeType = (mimeType: string) =>
    mimeType.match(/^[^/]+\/(?<ext>[^/]+)$/)?.groups?.['ext'] ?? ''
  
  
  
  
}