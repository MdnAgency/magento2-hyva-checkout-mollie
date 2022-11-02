import CreditCard from './src/components/creditCard';
import RemoteForm from './src/components/remoteForm';

const molliePaymentRenderers = {
  mollie_methods_applepay: RemoteForm,
  mollie_methods_bancontact: RemoteForm,
  mollie_methods_banktransfer: RemoteForm,
  mollie_methods_belfius: RemoteForm,
  mollie_methods_creditcard: CreditCard,
  mollie_methods_directdebit: RemoteForm,
  mollie_methods_eps: RemoteForm,
  mollie_methods_giftcard: RemoteForm,
  mollie_methods_giropay: RemoteForm,
  mollie_methods_ideal: RemoteForm,
  mollie_methods_in3: RemoteForm,
  mollie_methods_kbc: RemoteForm,
  mollie_methods_klarnapaylater: RemoteForm,
  mollie_methods_klarnapaynow: RemoteForm,
  mollie_methods_klarnasliceit: RemoteForm,
  mollie_methods_mybank: RemoteForm,
  mollie_methods_paypal: RemoteForm,
  mollie_methods_paysafecard: RemoteForm,
  mollie_methods_przelewy24: RemoteForm,
  mollie_methods_sofort: RemoteForm,
  mollie_methods_voucher: RemoteForm,
};

export default molliePaymentRenderers;
