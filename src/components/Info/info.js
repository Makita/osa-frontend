// @flow
/* eslint max-lines-per-function: 0, max-len: 0 */
import * as React from 'react';
import {
  Grid,
  Row,
  Col,
  Image
} from 'react-bootstrap';

import style from './info.scss';

const Info = () => {
  return (
    <div className={style.container}>
      <Grid>
        <Row>
          <Col md={5}>
            <h1 className={style.header}>ONE STOP AUTO AND HITCH INC.</h1>
            <p className={style.text}>With a commitment to amazing service, we ensure top quality, friendly service, and a guarantee that your vehicle is in good hands. From standard oil changes to brake replacement and inspections to hitch installations, we have the skills needed to get the job done right and quick, every time.</p>
          </Col>
          <Col md={1} />
          <Col md={5}>
            <Image src="https://via.placeholder.com/1100x700" alt="1100x700" responsive thumbnail />
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

export default Info;