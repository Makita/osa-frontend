// @flow
interface AppointmentAction {
  data: Object | Array<Object>,
  date: string,
  type: string
}

const AppointmentsReducer = (state: Object = {}, action: AppointmentAction) => {
  switch (action.type) {
    case 'ADD_APPOINTMENT':
      return {
        ...state,
        [action.date]: [...state[action.date], action.data]
      };
    case 'FETCH_APPOINTMENTS':
      return {
        ...state,
        [action.date]: [action.data]
      };
    default:
      return state;
  }
};

export default AppointmentsReducer;