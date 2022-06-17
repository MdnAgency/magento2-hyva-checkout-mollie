# Mollie Payment method for Hyvä Checkout

## Prerequisites

1. A working Magento site with [Mollie](https://github.com/mollie/magento2) module installed and configured.
2. [Hyvä React Checkout](https://github.com/hyva-themes/magento2-react-checkout) is installed and configured.

## How to use it with Hyvä React Checkout?

Add below code in your `package.json`.

File: `src/reactapp/package.json`

```
"config": {
    "paymentMethodsRepo": {
      "mollie": "git@github.com:MdnAgency/magento2-hyva-checkout-mollie.git"
    }
},
```

3. Run `npm install` inside react application.
4. Run `NODE_ENV=production npm run build` inside react application.

## More Info
1. https://hyva-themes.github.io/magento2-react-checkout/customize/
2. https://hyva-themes.github.io/magento2-react-checkout/payment-integration/
