import { Action } from '@ngrx/store';

export const AUTHENTICATED = '[Auth] Authenticated';
export const NOT_AUTHENTICATED = '[Auth] Not_Authenticated';

export class Authenticated implements Action {
  readonly type = AUTHENTICATED;
}

export class NotAuthenticated implements Action {
  readonly type = NOT_AUTHENTICATED;
}

export type AuthActions = Authenticated | NotAuthenticated;
