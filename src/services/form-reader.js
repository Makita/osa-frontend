// @flow
/* eslint-disable key-spacing, no-magic-numbers */
import format from 'date-fns/format';
import addMinutes from 'date-fns/add_minutes';

// eslint-disable-next-line import/no-unresolved
import SERVICES from 'Resources/services';

class FormReader {
  // eslint-disable-next-line max-statements
  constructor() {
    const services: Array<string> = Array.from(document.querySelectorAll("input[type=checkbox]"))
      .filter(option => option.checked)
      .map(option => option.value);

    const startDate: Array<string> = document.getElementById("formControlsDate").value.split("/");
    const startTime: Array<string> = document.getElementById("formControlsTime").value.split(":");
    // eslint-disable-next-line max-len
    const startObject: Date = new Date(startDate[2], Number(startDate[0]) - 1, startDate[1], startTime[0], startTime[1]);

    let endObject: Date = startObject;

    for (let i = 0; i < SERVICES.length; i++) {
      // eslint-disable-next-line id-length
      for (let a = 0; a < services.length; a++) {
        if (services[a] === SERVICES[i].slug) {
          endObject = addMinutes(endObject, SERVICES[i].time);
        }
      }
    }

    this.data = {
      first_name:   document.getElementById("formControlsFirstName").value,
      last_name:    document.getElementById("formControlsLastName").value,
      phone_number: document.getElementById("formControlsPhoneNumber").value,
      services,
      start_time:   format(startObject),
      end_time:     format(endObject)
    };
  }

  getData() {
    return this.data;
  }
}

export default FormReader;