export interface File {
  id?: string;
  originalName: string;
  size: number;
  mimetype: string;
  hashName: string;
  path: string;
}

export interface Certificate{
  id: string;
  path: string;
}
