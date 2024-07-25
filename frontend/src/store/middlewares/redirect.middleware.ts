import { PayloadAction } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
import browserHistory from '../../../../frontend/src/browser-history';
import { ActionName } from '../../utils/constant';
import { rootReducer } from '../root-reducer';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === ActionName.Redirect) {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
