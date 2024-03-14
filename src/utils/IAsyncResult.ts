interface IAsyncResultBase {
    isLoading?: boolean;
    loadingPrompt?: string;
    error?: Error;
  }
  
  export interface IAsyncResult<T> extends IAsyncResultBase {
    result?: T;
  }
  
  export function ErrorString(error: Error | undefined) {
    if (error === null || error === undefined) return "Unknown error";
  
    //console.log('errorIs', JSON.stringify(error));
    
  
    let ctxMessage:string|undefined = undefined;
    if(error.name === 'AxiosError'){
      const {errorId,message, errors} = (error as any).response?.data||{};
      if(errorId){
        ctxMessage = (message || 'failed') + ` (error: ${errorId}) `;
      }else if(errors){
        const errorMessages = errors as Record<string,string>;
        if(errorMessages){
          const messages = Object.keys(errorMessages).map(k=>errorMessages[k]) ;
          ctxMessage = messages.join(", ");
        }
      }
    }
  
    return ctxMessage ?? error.message ?? `failed :${error.toString()}`;
  }
  
  export const ServerURI = {
    serverSide: process.env.NEXT_PUBLIC_SSR_API_URL ?? "http://localhost:5123",
  };
  