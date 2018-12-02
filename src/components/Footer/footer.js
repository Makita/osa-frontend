// @flow
import * as React from 'react';

import style from './footer.scss';

const Footer = () => {
  return (
    <footer className={style.container}>
      9508 62 Ave NW, TEL: (780) 988-0888
      <div className={style.right}>
        &copy; 2018 One Stop Auto and Hitch Inc.
      </div>
    </footer>
  );
};

export default Footer;