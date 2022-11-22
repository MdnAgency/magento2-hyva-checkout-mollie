import React, { useState, useLayoutEffect, useRef } from 'react';
import { __ } from '@hyva/react-checkout/i18n';
import PropTypes from 'prop-types';
import useMollieComponent from '../hook/useMollieComponent';

function MollieComponentNew(props) {
  const { type, name } = props;
  const componentRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState();
  const [component, setComponent] = useState();

  useMollieComponent(setComponent, [], type);

  useLayoutEffect(() => {
    if (component) {
      component.mount(componentRef.current);
      component.addEventListener('change', (event) => {
        if (event.error && event.touched) {
          setErrorMessage(event.error);
        } else {
          setErrorMessage(false);
        }
      });
    }
    // Specifies how to clean up the effect:
    return function cleanup() {
      if (component) {
        component.unmount();
      }
    };
  }, [component]);

  return (
    <div className="mt-4">
      <div className="font-semibold text-primary mb-1">{__(name)}</div>
      <div className="bg-white p-4 py-3 rounded-lg" ref={componentRef} />
      {errorMessage && (
        <div className="component-error text-secondary text-sm rounded-lg mt-1">
          {errorMessage}
        </div>
      )}
    </div>
  );
}

MollieComponentNew.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default MollieComponentNew;
