// @flow
/* eslint-disable no-console */
import format from 'date-fns/format';

import Socket from "Services/socket";

export default class AppointmentsSocket {
  constructor() {
    this.socket = new Socket("/appointment");
  }

  makeAppointment(urlEncode: string, callback: (appointment: Object) => void) {
    this.socket.post(urlEncode)
      .then(callback)
      .catch(console.log);
  }

  getAppointmentsOnDate(date: string | Date, callback: (appointments: Array<Object>) => void) {
    // eslint-disable-next-line no-param-reassign
    if (date instanceof Date) date = format(date);

    this.socket.get(`date=${date}`)
      .then(callback)
      .catch(console.log);
  }
}