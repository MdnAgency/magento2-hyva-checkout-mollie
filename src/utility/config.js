import RootElement from '@hyva/react-checkout/utils/rootElement';

const paymentConfig = RootElement.getPaymentConfig();

export const mollieConfig = paymentConfig.mollie || {};

export const profileId = mollieConfig.profile_id;

export const clientConfig = {
  locale: mollieConfig.locale,
  testmode: mollieConfig.testmode,
};
