import _get from 'lodash.get';

export default function placeOrderModifier(result) {
    return _get(result, 'data.mollieRestoreCart.cart', {});
}
