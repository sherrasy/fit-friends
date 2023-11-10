export type AxiosErrorResponse = {
  details: ErrorDetails[];
  errorType: string;
  message:string;
  }

export type ErrorDetails = {
    messages:string[];
    property:string;
    value:string;
  }
