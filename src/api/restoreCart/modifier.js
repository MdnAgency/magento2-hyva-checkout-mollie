import { get as _get } from 'lodash-es';

export default function placeOrderModifier(result) {
  return _get(result, 'data.mollieRestoreCart.cart', {});
}
