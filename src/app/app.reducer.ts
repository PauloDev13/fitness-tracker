import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import { AuthActions } from './auth/actions/auth.action';
import * as fromAuth from './auth/reducers/auth.reducer';
import { UIActions } from './shared/actions/ui.action';
import * as fromUI from './shared/reducers/ui.reducer';

export interface IState {
  ui: fromUI.InterState;
  auth: fromAuth.IState;
}

export const reducers: ActionReducerMap<IState, UIActions & AuthActions> = {
  ui: fromUI.uiReducer,
  auth: fromAuth.authReducer,
};

export const getUiState = createFeatureSelector<fromUI.InterState>('ui');
export const getIsLoading = createSelector(getUiState, fromUI.getIsLoading);

export const getAuthState = createFeatureSelector<fromAuth.IState>('auth');
export const getIsAuth = createSelector(
  getAuthState,
  fromAuth.getAuthenticated,
);
