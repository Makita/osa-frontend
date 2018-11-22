// @flow
/* eslint-disable key-spacing, no-magic-numbers */
import format from 'date-fns/format';

class FormReader {
  constructor() {
    const services: Array<string> = Array.from(document.querySelectorAll("input[type=checkbox]"))
      .filter(option => option.checked)
      .map(option => option.value);

    const startDate: Array<string> = document.getElementById("formControlsDate").value.split("/");
    const startTime: Array<string> = document.getElementById("formControlsTime").value.split(":");
    // eslint-disable-next-line max-len
    const startObject: Date = new Date(startDate[2], Number(startDate[0]) - 1, startDate[1], startTime[0], startTime[1], 0, 0);

    // TODO: Calculate end times
    const endObject: Date = startObject;

    this.data = {
      end_time:     format(endObject),
      first_name:   document.getElementById("formControlsFirstName").value,
      last_name:    document.getElementById("formControlsLastName").value,
      phone_number: document.getElementById("formControlsPhoneNumber").value,
      services,
      start_time:   format(startObject)
    };
  }

  getData() {
    return this.data;
  }
}

export default FormReader;