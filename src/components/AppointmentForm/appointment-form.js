/* eslint-disable no-invalid-this, react/no-danger, max-lines */
// @flow
/* eslint no-magic-numbers: 0 */
import * as React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Alert,
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
import isSunday from 'date-fns/is_sunday';
import getMinutes from 'date-fns/get_minutes';
import addMinutes from 'date-fns/add_minutes';
import isWithinRange from 'date-fns/is_within_range';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';

import NavbarSpacer from 'Components/NavbarSpacer/navbar-spacer';
import FormReader from 'Services/form-reader';
import AppointmentsSocket from 'Services/sockets/appointments-socket';

// eslint-disable-next-line import/no-unresolved
import {
  addAppointment as addApp,
  fetchAppointments as fetchApps
} from 'Actions/appointments';

// eslint-disable-next-line import/no-unresolved
import SERVICES from 'Resources/services';

import style from './appointment-form.scss';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const FormErrors = ({
  errors
}: {
  errors: Array<string>
}) => {
  if (!errors.length) return "";

  const errorMessages = errors.map(error => <li>{error}</li>)

  return (
    <Alert bsStyle="danger">
      <h4>Errors were detected.</h4>
      <ul>
        {errorMessages}
      </ul>
    </Alert>
  );
};
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
  slug,
  text,
  time
}: {
  slug: string,
  text: string,
  time: string
}) => {
  return (
    <Checkbox value={slug}>{text} ({time})</Checkbox>
  );
};

const ServiceCheckboxes = () => {
  return SERVICES.map((service) => {
    return <ServiceCheckbox
      key={service.slug}
      slug={service.slug}
      text={service.name}
      time={`~${service.time} min`}
    />
  });
}

interface AppointmentFormProps {
  addAppointment: (Object) => Object,
  fetchAppointments: (string, Object) => Object,
  appointments: Object
}

interface AppointmentFormState {
  phoneNumber: string,
  date: Date,
  time: Date
}

// eslint-disable-next-line max-len
class AppointmentForm extends React.Component<AppointmentFormProps, AppointmentFormState> {
  state = {
    date: startOfTomorrow(),
    errors: [],
    phoneNumber: '',
    time: new Date(2018, 11, 21, 9, 0, 0, 0)
  }

  componentDidMount() {
    const { date } = this.state;
    const { fetchAppointments } = this.props;

    fetch(`/appointment/${date.toISOString()}`)
      .then(res => res.json())
      .then(data => fetchAppointments(date, data));
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

  // eslint-disable-next-line max-statements
  excludeTimes = () => {
    const { appointments } = this.props;
    const { date } = this.state;
    const today = appointments[date] || [];

    let times: Array<Date> = [];

    for (let i = 0; i < today.length; i++) {
      const startTime = new Date(today[i].start_time);
      const endTime = new Date(today[i].end_time);

      if (getMinutes(startTime) % 30 === 0) {
        let currentTime = startTime;

        do {
          times = [...times, currentTime];
          currentTime = addMinutes(currentTime, 30);
        } while (currentTime < endTime);
      }
    }

    return times;
  }

  // eslint-disable-next-line max-statements
  handleSubmit = (event: Event) => {
    event.preventDefault();

    const formReader = new FormReader();
    const data: {
      first_name: string,
      last_name: string,
      phone_number: string,
      services: string,
      start_time: string,
      end_time: string
    } = formReader.getData();

    // Validate the data here; it will be validated in the back-end as well
    const errors = [];
    const invalidTimes = this.excludeTimes();

    if (data.services.length === 0) errors.push("You must select services that you need performed.");
    for (let i = 0; i < invalidTimes.length; i++) {
      if (isWithinRange(invalidTimes[i], new Date(data.start_time), new Date(data.end_time))) {
        errors.push("The time you have attempted to book is not available.")
        break;
      }
    }
    if (errors.length) {
      this.setState({ errors });

      return;
    }

    const urlEncode = Object.keys(data).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`).join('&');
    const appointmentsSocket = new AppointmentsSocket();

    appointmentsSocket.makeAppointment(urlEncode, (appointment: Object) => {
      const { addAppointment, history, setCreatedAppointment } = this.props;

      addAppointment(appointment);
      setCreatedAppointment(appointment);

      history.push('/details');
    });
  }

  handleDateChange = (date) => { this.setState({ date }) }

  handleTimeChange = (time) => { this.setState({ time }) }

  allowedDate(date) { return !isSunday(date); }

  // eslint-disable-next-line max-lines-per-function
  render() {
    const { date, time, errors } = this.state;

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
              <FormErrors errors={errors} />
            </Row>
            <Row>
              <h2 className={style.header}>APPOINTMENT FORM</h2>
            </Row>
          </Grid>
          <Form horizontal onSubmit={this.handleSubmit}>
            <TextField type="text" label="First Name" placeholder="Jason" required />
            <TextField type="text" label="Last Name" placeholder="Choi" required />
            <TextField
              type="tel"
              label="Phone Number"
              placeholder="123-456-7890"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              validationState={this.validatePhoneNumber()}
              onChange={this.formatPhoneNumber}
              required
            />
            <Grid>
              <Row>
                <FormGroup controlId="formControlsServices">
                  <Col md={2}>
                    <ControlLabel>Services Requested</ControlLabel>
                  </Col>
                  <Col md={10}>
                    <ServiceCheckboxes />
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
                      filterDate={this.allowedDate}
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
                    maxTime={new Date(2018, 11, 21, 17, 30, 0, 0)}
                    excludeTimes={this.excludeTimes()}
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

const mapStateToProps = (state) => {
  return {
    ...state
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addAppointment: appointment => dispatch(addApp(appointment)),
    fetchAppointments: (date, appointments) => dispatch(fetchApps(date, appointments))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AppointmentForm));