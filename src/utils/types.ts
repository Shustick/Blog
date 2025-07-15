export interface ErrorWithMessage {
  message: string;
}

export function isErrorWithMessage(err: unknown): err is { message: string } {
  return (
    typeof err === 'object' && err !== null && 'message' in err && typeof (err as ErrorWithMessage).message === 'string'
  );
}
