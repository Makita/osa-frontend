// @flow
/* eslint-disable no-magic-numbers */
import React, { Component } from 'react';
import {
  Modal,
  Button,
  Panel,
  Col,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  format,
  isSameDay,
  startOfToday
} from 'date-fns';

import { fetchAppointments as fetchApps } from 'Actions/appointments';

const InfoRow = ({
  name,
  value
}: {
  name: string,
  value: string
}) => {
  return (
    <ListGroupItem className="container-fluid">
      <Col xs={6} md={4}><b>{name}</b></Col>
      <Col xs={6} md={8}>{value}</Col>
    </ListGroupItem>
  );
};

const Appointments = ({
  appointments
}: {
  appointments: Array<Date>
}) => {
  if (appointments.length === 0) {
    return "No appointments have been made for this date.";
  }

  const timeFormat = 'hh:mm A';

  return appointments.map((appointment) => {
    return (
      <Panel bsStyle="info" key={appointment.id}>
        <Panel.Heading>
          <Panel.Title>{appointment.last_name}, {appointment.first_name}</Panel.Title>
        </Panel.Heading>
        <ListGroup>
          <InfoRow name="Start Time" value={format(appointment.start_time, timeFormat)} />
          <InfoRow name="End Time" value={format(appointment.end_time, timeFormat)} />
        </ListGroup>
      </Panel>
    );
  });
};

interface CalendarModalProps {
  selectedDate: Date,
  handleClose: Function,
  fetchAppointments: Function
}

class CalendarModal extends Component<CalendarModalProps, {}> {
  state = {
    loading: true
  }

  componentDidMount() {
    const { fetchAppointments } = this.props;
    const that = this;
    const selectedDate = startOfToday();

    this.setState({ loading: true });
    fetch(`/appointment/${selectedDate.toISOString()}`)
      .then(res => res.json())
      .then((data) => {
        that.setState({ loading: false });

        return fetchAppointments(selectedDate, data);
      });
  }

  componentDidUpdate(prevProps) {
    const { fetchAppointments, selectedDate } = this.props;

    if (!isSameDay(prevProps.selectedDate, selectedDate)) {
      const that = this;

      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ loading: true });
      fetch(`/appointment/${selectedDate.toISOString()}`)
        .then(res => res.json())
        .then((data) => {
          that.setState({ loading: false });

          return fetchAppointments(selectedDate, data);
        });
    }
  }

  render() {
    const {
      selectedDate,
      handleClose,
      appointments,
      showModal
    } = this.props;
    const { loading } = this.state;
    let body = <Appointments appointments={appointments[selectedDate] || []} />

    if (loading) body = "Loading data...";

    return (
      <div className="static-modal">
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>Current Appointments for {format(selectedDate, 'MMMM DD, YYYY')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {body}
            </Modal.Body>
            <Modal.Footer>
              <Button bsStyle="primary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    ...state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAppointments: (date, appointments) => dispatch(fetchApps(date, appointments))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarModal);