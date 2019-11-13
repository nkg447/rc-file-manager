import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft
} from '@fortawesome/free-solid-svg-icons';
import styles from './SidebarTop.css';
import Colors from '../../theme/Color';

export default props => {
  const { navigateAddress, currentStackIndex, navigationStack } = props;
  const canGo = to => {
    return to === 'prev'
      ? currentStackIndex > 0
      : navigationStack.length > currentStackIndex + 1;
  };
  const navigateOnClick = to => {
    if (canGo(to)) navigateAddress(to);
  };
  return (
    <div className={styles.container}>
      <div className={styles.logo}>R C</div>
      <div className={styles.navigate}>
        <FontAwesomeIcon
          onClick={() => navigateOnClick('prev')}
          className={canGo('prev') ? styles.activeIcon : styles.icon}
          icon={faChevronLeft}
        />
        <FontAwesomeIcon
          onClick={() => navigateOnClick('next')}
          className={canGo('next') ? styles.activeIcon : styles.icon}
          icon={faChevronRight}
        />
      </div>
    </div>
  );
};
