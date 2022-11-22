import { useCallback, useEffect, useState } from 'react';
import { profileId, clientConfig } from '../utility/config';

let molliePromise;
/**
 * Load remote Mollie component script
 * @param effect
 * @param deps
 */
const useMollie = (effect, deps) => {
  const [mollie, setMollie] = useState();
  const mollieCb = useCallback(effect, [effect, ...deps]);

  useEffect(() => {
    if (!molliePromise) {
      molliePromise = new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://js.mollie.com/v1/mollie.js';
        script.addEventListener('load', () => {
          resolve(window.Mollie(profileId, clientConfig));
        });
        document.body.appendChild(script);
      });
    }

    molliePromise.then(setMollie);
  }, []);

  useEffect(() => {
    if (mollie) {
      mollieCb(mollie);
    }
  }, [mollie, mollieCb]);
};

export default useMollie;
