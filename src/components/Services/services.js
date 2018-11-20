// @flow
/* eslint max-lines-per-function: 0 */
import * as React from 'react';
import {
  Media,
  Glyphicon,
  Button,
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import style from './services.scss';

type ServiceProps = {
  glyph: string,
  heading: string,
  body: string
};

const Service = ({ glyph, heading, body }: ServiceProps) => {
  return (
    <Col md={4} sm={6} xs={12}>
      <Media className={style.onethird}>
        <Media.Left>
          <Glyphicon glyph={glyph} className={style.glyphicon} />
        </Media.Left>
        <Media.Body className={style.body}>
          <Media.Heading>{heading}</Media.Heading>
          <p>{body}</p>
        </Media.Body>
      </Media>
    </Col>
  );
}

const Services = () => {
  return (
    <div className={style.container}>
      <h3 className={style.question}>WHAT CAN WE DO FOR YOU?</h3>
      <h2 className={style.answer}>We Service All Makes And Models</h2>
      <Grid className={style.services}>
        <Row>
          <Service
            glyph="tint"
            heading="General"
            body="Coolant, oil, general fluid exchanges, tune-ups, front ends, rear ends."
          />
          <Service
            glyph="fire"
            heading="Heating Systems"
            body="Air conditioning, cooling systems, exhaust systems, heating."
          />
          <Service
            glyph="star"
            heading="Tire Services"
            body="Alignments, brakes."
          />
          <Service
            glyph="dashboard"
            heading="Engine"
            body="Diagnoses for no start/hard start/no power, engine services, transmission."
          />
          <Service
            glyph="eye-open"
            heading="Inspections"
            body="Mechanical, taxi, amvic, out-of-province, pre-purchase, troubleshooting, driveability."
          />
          <Service
            glyph="wrench"
            heading="Trailers"
            body="Hitch installations, wiring and repair, repacking of bearings."
          />
        </Row>
      </Grid>
      <Grid>
        <Row>
          <Col md={4} sm={2} xsHidden />
          <Col md={4} sm={8} xs={12}>
            <LinkContainer to="/book">
              <Button
                bsStyle="primary"
                bsSize="large"
                className={style.make_appointment}
              >
                Make an Appointment Now!
              </Button>
            </LinkContainer>
          </Col>
          <Col md={4} sm={2} xsHidden />
        </Row>
      </Grid>
    </div>
  );
};

export default Services;