export const PLACE_MOLLIE_ORDER = `
    mutation placeOrder(
        $cartId: String!
    ) {
        placeOrder(
          input: {
            cart_id: $cartId,
          }
        ) {
          order {
            mollie_redirect_url
            mollie_payment_token
          }
        }
    }
`;
