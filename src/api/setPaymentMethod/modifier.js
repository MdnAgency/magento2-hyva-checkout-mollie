import _get from 'lodash.get';

export default function setPaymentMethodModifier(result) {
    return _get(result, 'data.setPaymentMethodOnCart.cart', {});
}
