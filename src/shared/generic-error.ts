export const isGenericError = (e: Error) : e is GenericError => {
  return (e as GenericError).code != undefined;
}

export class GenericError extends Error {
  public code: string;

  constructor(code: string, message?: string) {
    super(message);
    this.code = code;
  }
}
