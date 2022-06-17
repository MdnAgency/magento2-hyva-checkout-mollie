import CreditCard from "./src/components/creditCard";
import RemoteForm from "./src/components/remoteForm";

const molliePaymentRenderers = {
    "mollie_methods_creditcard": CreditCard,
    "mollie_methods_ideal": RemoteForm,
    "mollie_methods_klarnapaylater": RemoteForm,
    "mollie_methods_banktransfer": RemoteForm,
    "mollie_methods_bancontact": RemoteForm,
    "mollie_methods_voucher": RemoteForm,
};

export default molliePaymentRenderers;
