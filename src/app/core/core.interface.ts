export interface BaseResponse<T> {
  operationState: Operation;
  message: string;
  result: T;
}

export enum Operation {
  Success,
  Failure,
  Ex
}


export interface LoginResult {
  token: string;
}
