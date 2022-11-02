import { get as _get } from 'lodash-es';

export default function setPaymentMethodModifier(result) {
  return _get(result, 'data.setPaymentMethodOnCart.cart', {});
}
