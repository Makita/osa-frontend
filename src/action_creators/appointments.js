// @flow
/* eslint import/prefer-default-export: 0 */
/**
 * Action creator for the 'ADD_APPOINTMENT' action.
 * @param {Object} appointment An object representing the appointment being added.
 * @returns {Object} The action object to be dispatched to the Redux store.
 */
export function addAppointment(appointment: Object): Object {
  return {
    data: appointment,
    type: 'ADD_APPOINTMENT'
  };
}

/**
 * Action creator for the 'FETCH_APPOINTMENTS' action.
 * @param {Array<Object>} appointments The appointments that were queried for.
 * @return {Object} The action object to be dispatched to the Redux store.
 */
export function fetchAppointments(appointments: Array<Object>): Object {
  return {
    data: appointments,
    type: 'FETCH_APPOINTMENTS'
  };
}