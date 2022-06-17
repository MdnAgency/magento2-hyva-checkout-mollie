import {useCallback, useState} from 'react';
import { __ } from '@hyva/react-checkout/i18n';

/* eslint-disable */
import setPaymentMethodRequest from "../api/setPaymentMethod";
import placeOrderRequest from "../api/placeOrder";
import restoreCartRequest from "../api/restoreCart";
import useMollieCartContext from "./useMollieCartContext";
import useMollieAppContext from "./useMollieAppContext";
import useMollie from "./useMollie";


// useMollieCardPayment

export default function useMolliePayment({ methodCode }) {
    const {
        cartId,
        setCartInfo
    } = useMollieCartContext();

    const { appDispatch ,setPageLoader, setErrorMessage} =
        useMollieAppContext();

    const [mollie, setMollie] = useState();

    useMollie(setMollie, []);

    /**
     * Create an order from the current cart and redirect the user to mollie
     * @returns {Promise<void>}
     */
    const placerOrderCallback = async (cardToken) => {
        try{
            setPageLoader(true);
            await setPaymentMethodRequest(appDispatch,{
                cartId,
                paymentCode:methodCode,
                cardToken
            })
        } catch (error) {
            setPageLoader(false);
            setErrorMessage(
                __('Something went wrong while adding the payment method to the quote.')
            );
        }
        try {
            const { mollie_redirect_url: mollieRedirectUrl } = await placeOrderRequest();
            if (!mollieRedirectUrl) {
                const cart = await restoreCartRequest(cartId)
                setCartInfo(cart);
            } else {
                setPageLoader(false);
                window.location.assign(mollieRedirectUrl);
            }
        } catch (error) {
            setPageLoader(false);
            setErrorMessage(
                __('Something went wrong while adding the payment method to the quote.')
            );
        }

    };

    /**
     * Redirect the user to mollie, user as already typed it card details in MollieComponent
     * @type {(function(): Promise<*>)|*}
     */
    const placeCardOrder = useCallback(async () => {
        try {
            if (mollie) {
                console.log("Mollie is defined");
                setPageLoader(true);
                const {token, error} = await mollie.createToken();

                if (!error) {
                    return placerOrderCallback(token);
                }

                setPageLoader(false);
                setErrorMessage(
                    __('Something went wrong while adding the payment method to the quote.')
                );
            } else {
                console.log("Mollie is missing");
            }
        } catch (error) {
            setPageLoader(false);
            setErrorMessage(
                __('Something went wrong while adding the payment method to the quote.')
            );
        }
        return false;
    },[mollie])

    /**
     * Redirect the user to mollie checkout (User type payment information on mollie checkout)
     * @returns {Promise<void>}
     */
    const placeOrder = useCallback(() => placerOrderCallback(null),[mollie])

    return {
        placeCardOrder,
        placeOrder
    }
};
