/* eslint-disable camelcase */
// @flow
import * as React from 'react';
import { Table } from 'react-bootstrap';
import format from 'date-fns/format';

import NavbarSpacer from 'Components/NavbarSpacer/navbar-spacer';

import style from './appointment-details.scss';

const AppointmentDetails = ({ appointment }: { appointment: Object }) => {
  const {
    first_name,
    last_name,
    phone_number,
    services,
    start_time,
    end_time
  } = appointment;

  return (
    <React.Fragment>
      <NavbarSpacer />
      <div id={style.container}>
        <h2>Y<span>OUR APPOINTMENT WAS SUCCESSFULLY BOOKED!</span></h2>
        <Table striped hover>
          <tbody>
            <tr>
              <td>NAME</td>
              <td>{first_name} {last_name}</td>
            </tr>
            <tr>
              <td>PHONE NUMBER</td>
              <td>{phone_number}</td>
            </tr>
            <tr>
              <td>SERVICES</td>
              <td>{(services || '').replace(/_/gu, ' ').replace(/,/gu, ', ')}</td>
            </tr>
            <tr>
              <td>START TIME</td>
              <td>{format(new Date(start_time), 'HH:mm')}</td>
            </tr>
            <tr>
              <td>END TIME</td>
              <td>{format(new Date(end_time), 'HH:mm')}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </React.Fragment>
  );
}

export default AppointmentDetails;