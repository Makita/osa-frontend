// @flow
import * as React from 'react';
import { Image } from 'react-bootstrap';

import snapOnLogo from 'Assets/images/snap-on.png';
import macToolsLogo from 'Assets/images/mac-tools.png';

import style from './splash.scss';

const Splash = () => {
  return (
    <section id={style.splash}>
      <div className={style.mask}>
        <div className={style.content}>
          <p>Professional service, top quality</p>
          <p>Get the job done right by the right people</p>
          <div className={style.logos}>
            <Image src={snapOnLogo} alt="snapon" />
            <Image src={macToolsLogo} alt="mactools" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Splash;