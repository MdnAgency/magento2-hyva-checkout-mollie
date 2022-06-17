import sendRequest from '@hyva/react-checkout/api/sendRequest';
import LocalStorage from '@hyva/react-checkout/utils/localStorage';

import { PLACE_MOLLIE_ORDER } from './mutation';
import modifier from './modifier';

export default async function placeOrder(
  appDispatch
) {
  const variables = {
    cartId: LocalStorage.getCartId(),
  };

  return modifier(
    await sendRequest(appDispatch, {
      query: PLACE_MOLLIE_ORDER,
      variables,
    })
  );
}
