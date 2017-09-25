import {
  SECTION_CHANGED,
  DAY_CHANGED,
  CHANGE_CHANGED
} from '../actions/types';

export const sectionChanged = section => {
  return {
    type: SECTION_CHANGED,
    payload: section
  };
};

export const dayChanged = day => {
  return {
    type: DAY_CHANGED,
    payload: day
  };
};

export const changeChanged = change => {
  return {
    type: CHANGE_CHANGED,
    payload: change
  };
};
