import React from 'react';
import styles from './SidebarTop.css';
import { NEXT_ICON, PREV_ICON } from '../../assets';
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
      <div className={styles.logo}>Logo</div>
      <div className={styles.navigate}>
        <PREV_ICON
          onClick={() => navigateOnClick('prev')}
          className={canGo('prev') ? styles.activeIcon : styles.icon}
        ></PREV_ICON>
        <NEXT_ICON
          onClick={() => navigateOnClick('next')}
          className={canGo('next') ? styles.activeIcon : styles.icon}
        ></NEXT_ICON>
      </div>
    </div>
  );
};
