import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.css';

const WxOpenLaunchWeappWrap = ({
  children, username, path, launchCallback,
}) => {
  const weappRef = useRef(null);
  const [clientWidth, setClientWidth] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);

  useEffect(() => {
    if (wx.ready && weappRef.current) {
      const launchHandler = () => {
        typeof launchCallback === 'function' && launchCallback();
      };
      const currentRef = weappRef.current;

      currentRef.addEventListener('launch', launchHandler);
      setClientWidth(currentRef.clientWidth);
      setClientHeight(currentRef.clientHeight);

      return () => {
        currentRef.removeEventListener('launch', launchHandler);
      };
    }

    return () => {};
  }, []);

  return (
    <div className={ styles.openTagWrap }>
      {children}
      <wx-open-launch-weapp
          ref={ weappRef }
          class={ styles.launchBtn }
          username={ username }
          path={ path }>
        <script type="text/wxtag-template">
          <div style={ { width: `${clientWidth}px`, height: `${clientHeight}px` } } />
        </script>
      </wx-open-launch-weapp>
    </div>
  );
};

export default WxOpenLaunchWeappWrap;
