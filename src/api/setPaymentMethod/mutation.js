export const SET_PAYMENT_METHOD_ON_CART_MOLLIE_CREDIT_CARD = `
    mutation setPaymentMethodOnCart(
        $cartId: String!
        $paymentCode: String!
        $issuer: String,
        $cardToken: String
    ) {
        setPaymentMethodOnCart(
          input: {
            cart_id: $cartId,
            payment_method: {
              code: $paymentCode
              mollie_selected_issuer: $issuer,
              mollie_card_token: $cardToken
            }
          }
        ) {
          cart {
            selected_payment_method {
              code
            }
            mollie_available_issuers {
              name
              code
              image
              svg
            }
          }
        }
    }
`;
