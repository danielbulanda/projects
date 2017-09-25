import {
  SECTION_CHANGED,
  DAY_CHANGED,
  CHANGE_CHANGED
} from '../actions/types';

const getCurrentDay = () => {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const now = new Date();
  return days[now.getDay()];
};

const INITIAL_STATE = {
  section: 'diet',
  day: getCurrentDay(),
  change: 'weight'
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SECTION_CHANGED:
      return { ...state, section: action.payload };
    case DAY_CHANGED:
      return { ...state, day: action.payload };
    case CHANGE_CHANGED:
      return { ...state, change: action.payload };
    default:
      return state;
  }
};
