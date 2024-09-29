type DataErrorType = string | string[];

type ObjectDataErrorType = { [key: string]: DataErrorType };

type ArrayObjectDataErrorType = ObjectDataErrorType[];

export type ExtraDataErrorType =
  | DataErrorType
  | ObjectDataErrorType
  | ArrayObjectDataErrorType;

export class BaseError {
  message: string;
  status: number;
  extraData?: ExtraDataErrorType;

  constructor(message: string, status: number, extraData?: ExtraDataErrorType) {
    this.message = message;
    this.status = status;
    this.extraData = extraData;
  }
}
