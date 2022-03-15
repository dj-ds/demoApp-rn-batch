import * as types from './types';

export const login = payload => ({type: types.LOGIN, payload});

export const error = payload => ({type: types.ERROR, payload});
