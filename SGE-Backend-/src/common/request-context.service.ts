import { AsyncLocalStorage } from 'async_hooks';

interface ContextData {
  usuarioId?: number;
}

export const requestContext = new AsyncLocalStorage<ContextData>();

export class RequestContext {
  static get usuarioId(): number | undefined {
   
    return requestContext.getStore()?.usuarioId;
  }

  static run(data: ContextData, callback: () => void) {
   
    requestContext.run(data, callback);
  }
}
