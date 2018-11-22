/* eslint-disable no-invalid-this, react/no-danger */
// @flow
/* eslint no-magic-numbers: 0 */
import * as React from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Checkbox,
  HelpBlock,
  Button,
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import startOfTomorrow from 'date-fns/start_of_tomorrow';
import DatePicker from 'react-datepicker';

import NavbarSpacer from 'Components/NavbarSpacer/navbar-spacer';
import FormReader from 'Services/form-reader';
import AppointmentsSocket from 'Services/sockets/appointments-socket';
// eslint-disable-next-line import/no-unresolved
import addAppointment from 'Actions/appointments';

import style from './appointment-form.scss';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import { ReduxContext } from '../../index';
import { fetchAppointments } from '../../action_creators/appointments';

const TextField = ({
  label,
  help = null,
  validationState = null,
  ...props
}: {
  label: string,
  help?: string,
  validationState?: string
}) => {
  const id = `formControls${label.replace(' ', '')}`;

  return (
    <Grid>
      <Row>
        <FormGroup controlId={id} validationState={validationState}>
          <Col md={2}>
            <ControlLabel>{label}</ControlLabel>
          </Col>
          <Col md={10}>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
          </Col>
        </FormGroup>
      </Row>
    </Grid>
  );
};

const ServiceCheckbox = ({
  text,
  time
}: {
  text: string,
  time: string
}) => {
  const value = text.toLowerCase().replace(' ', '_');

  return (
    <Checkbox value={value}>{text} ({time})</Checkbox>
  );
};

interface AppointmentFormState {
  phoneNumber: string,
  date: Date,
  time: Date
}

// eslint-disable-next-line max-len
export default class AppointmentForm extends React.Component<{}, AppointmentFormState> {
  static contextType = ReduxContext;

  state = {
    date: startOfTomorrow(),
    phoneNumber: '',
    time: new Date(2018, 11, 21, 9, 0, 0, 0)
  }

  constructor() {
    super();

    const appointmentsSocket = new AppointmentsSocket();
    const { date }: { date: string } = this.state;
    const dateParts = date.split("/");

    // eslint-disable-next-line max-len
    const appointments: Array<Object> = appointmentsSocket.getAppointmentsOnDate(new Date(dateParts[2], dateParts[0], dateParts[1], 8, 0, 0, 0));
    const store = this.context;

    store.dispatch(fetchAppointments(appointments));
  }

  validatePhoneNumber = () => {
    const { phoneNumber }: { phoneNumber: string } = this.state;
    const length: number = phoneNumber.length; // eslint-disable-line prefer-destructuring

    if (length === 0) return null;
    if (length === 12) return 'success';

    return 'error';
  }

  formatPhoneNumber = (event: Event) => {
    const src = event.target || event.srcElement;

    if (!(src instanceof window.HTMLInputElement)) {
      return;
    }

    let cleanText: string = src.value.replace(/\D/gmu, '');

    cleanText = `${cleanText.slice(0, 3)}-${cleanText.slice(3, 6)}-${cleanText.slice(6, 10)}`;
    cleanText = cleanText.replace(/-*$/gmu, '');
    if (cleanText === "-") cleanText = "";
    src.value = cleanText;

    this.setState({ phoneNumber: cleanText });
  }

  handleSubmit = (event: Event) => {
    event.preventDefault();

    const formReader = new FormReader();
    const data = formReader.getData();
    const urlEncode = Object.keys(data).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`).join('&');

    const appointmentsSocket = new AppointmentsSocket();

    appointmentsSocket.makeAppointment(urlEncode, (appointment: Object) => {
      const store = this.context;

      store.dispatch(addAppointment(appointment));
    });
  }

  // eslint-disable-next-line max-lines-per-function
  render() {
    const { date, time } = this.state;

    return (
      <React.Fragment>
        <style dangerouslySetInnerHTML={{
          __html: `
            .react-datepicker-wrapper, .react-datepicker__input-container { width: 100% !important; }
          `
        }} />
        <NavbarSpacer />
        <div className={style.container}>
          <Grid>
            <Row>
              <h2 className={style.header}>APPOINTMENT FORM</h2>
            </Row>
          </Grid>
          <Form horizontal onSubmit={this.handleSubmit}>
            <TextField type="text" label="First Name" placeholder="Jason" />
            <TextField type="text" label="Last Name" placeholder="Choi" />
            <TextField
              type="tel"
              label="Phone Number"
              placeholder="123-456-7890"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              validationState={this.validatePhoneNumber()}
              onChange={this.formatPhoneNumber}
            />
            <Grid>
              <Row>
                <FormGroup controlId="formControlsServices">
                  <Col md={2}>
                    <ControlLabel>Services Requested</ControlLabel>
                  </Col>
                  <Col md={10}>
                    <ServiceCheckbox text="Braking fluid flush" time="~30 min" />
                    <ServiceCheckbox text="Oil change" time="~30 min" />
                    <ServiceCheckbox text="Cooling system flush" time="~60 min" />
                    <ServiceCheckbox text="Tire swap" time="~60 min" />
                    <ServiceCheckbox text="Transmission service" time="~60 min" />
                    <ServiceCheckbox text="Wheel alignment" time="~60 min" />
                  </Col>
                </FormGroup>
              </Row>
              <Row>
                <FormGroup controlId="formControlsDate">
                  <Col md={2}>
                    <ControlLabel>Date</ControlLabel>
                  </Col>
                  <Col md={10}>
                    <DatePicker
                      selected={date}
                      onChange={this.handleDateChange}
                      minDate={startOfTomorrow()}
                      filterDate={this.isSunday}
                      className="form-control"
                      id="formControlsDate"
                    />
                </Col>
                </FormGroup>
              </Row>
              <Row>
                <FormGroup controlId="formControlsTime">
                  <Col md={2}>
                    <ControlLabel>Time</ControlLabel>
                  </Col>
                  <Col md={10}>
                  <DatePicker
                    selected={time}
                    onChange={this.handleTimeChange}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    dateFormat="HH:mm"
                    minTime={new Date(2018, 11, 21, 9, 0, 0, 0)}
                    maxTime={new Date(2018, 11, 21, 18, 0, 0, 0)}
                    className="form-control"
                    id="formControlsTime"
                  />
                </Col>
                </FormGroup>
              </Row>
              <Row>
                <FormGroup>
                  <Col mdOffset={2} md={8}>
                    <Button type="submit" bsStyle="primary">Book Appointment</Button>
                  </Col>
                </FormGroup>
              </Row>
            </Grid>
          </Form>
        </div>
      </React.Fragment>
    );
  }
}