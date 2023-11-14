import {createAction} from '@reduxjs/toolkit';
import { ActionName } from '../utils/constant';

export const redirectToRoute = createAction<string>(ActionName.Redirect);
