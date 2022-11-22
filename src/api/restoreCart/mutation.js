import cartItemsInfo from '@hyva/react-checkout/api/cart/utility/query/cartItemsInfo';
import cartPriceInfo from '@hyva/react-checkout/api/cart/utility/query/cartPriceInfo';
import cartBillingAddrInfo from '@hyva/react-checkout/api/cart/utility/query/cartBillingAddrInfo';
import cartShippingAddrInfo from '@hyva/react-checkout/api/cart/utility/query/cartShippingAddrInfo';
import cartPaymentMethodsInfo from '@hyva/react-checkout/api/cart/utility/query/cartPaymentMethodsInfo';

export const PLACE_MOLLIE_ORDER = `
    mutation mollieRestoreCart(
        $cartId: String!
    ) {
        mollieRestoreCart(input: { cart_id: $cartId }) {
          cart {
            id
            email
            is_virtual
            applied_coupons {
              code
            }
            ${cartItemsInfo}
            ${cartPriceInfo}
            ${cartBillingAddrInfo}
            ${cartShippingAddrInfo}
            ${cartPaymentMethodsInfo}
          }
        }
    }
`;
