import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { mainActions } from '../actions';
import { MainModel } from '../models/MainModel';

const initialState: RootState.mainState = 
  {
    responseDisplay: 'eggplant 🍆',
    responseMetrics: 'string',
    targetIP: '',
    filePath: '',
    trail: 'eggplant',
    connectType: 'lol'
  }
;

export const mainReducer = handleActions<RootState.mainState, MainModel>(
  {
    [mainActions.Type.HANDLE_IP_INPUT]: (state, action) => (
      {
        ...state,
        targetIP: action.payload
      }
    ),
    [mainActions.Type.HANDLE_PROTO_UPLOAD]: (state, action) => (
      {
        ...state,
        filePath: action.payload[0].path
      }
    ),
  },
  initialState
);