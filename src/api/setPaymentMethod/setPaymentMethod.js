import sendRequest from '@hyva/react-checkout/api/sendRequest';
import LocalStorage from '@hyva/react-checkout/utils/localStorage';

import { SET_PAYMENT_METHOD_ON_CART_MOLLIE_CREDIT_CARD } from './mutation';
import modifier from './modifier';

export default async function setPaymentMethodMollie(
  appDispatch,
  setPaymentInput
) {
  const variables = {
    ...setPaymentInput,
    cartId: LocalStorage.getCartId(),
  };

  return modifier(
    await sendRequest(appDispatch, {
      query: SET_PAYMENT_METHOD_ON_CART_MOLLIE_CREDIT_CARD,
      variables,
    })
  );
}
