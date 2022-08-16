import React, {useEffect} from 'react';
import {shape, func} from 'prop-types';
import _get from "lodash.get";
import { __ } from '@hyva/react-checkout/i18n';

import Card from '@hyva/react-checkout/components/common/Card/Card';
import RadioInput from '@hyva/react-checkout/components/common/Form/RadioInput';

import {paymentMethodShape} from '@hyva/react-checkout/utils/payment';
import useCheckoutFormContext from '@hyva/react-checkout/hook/useCheckoutFormContext';

import usePaymentMethodFormContext from '@hyva/react-checkout/components/paymentMethod/hooks/usePaymentMethodFormContext';
import usePaymentMethodCartContext from '@hyva/react-checkout/components/paymentMethod/hooks/usePaymentMethodCartContext';
import MollieComponent from "../mollieComponent";
import useMolliePayment from "../../hook/useMolliePayment";

function CreditCard({method, selected, actions}) {
    const { submitHandler} = usePaymentMethodFormContext();
    const methodCode = method.code;
    const isSelected = methodCode === selected.code;

    const { registerPaymentAction } = useCheckoutFormContext();
    const { placeCardOrder } = useMolliePayment({methodCode});

    const { methodList } =
        usePaymentMethodCartContext();
    useEffect(() => {
        registerPaymentAction(methodCode, placeCardOrder);
    }, [registerPaymentAction, methodCode, placeCardOrder]);

    const handlePaymentMethodSelection = async (event) => {
        const methodSelected = _get(methodList, `${event.target.value}.code`);
        await actions.change(event);

        await submitHandler(methodSelected);
    }
    if (!isSelected) {
        return (
            <RadioInput
                value={method.code}
                label={method.title}
                name="paymentMethod"
                checked={isSelected}
                onChange={handlePaymentMethodSelection}
            />
        );
    }

    return (
        <div>
            <div>
                <RadioInput
                    value={method.code}
                    label={method.title}
                    name="paymentMethod"
                    checked={isSelected}
                    onChange={handlePaymentMethodSelection}
                />
                {isSelected && (
                    <div className="mx-4 mb-8 mt-2">
                        <Card bg="darker">
                            <div className="-mt-4">
                                <MollieComponent type="cardNumber" name={__("Card number")} />
                                <MollieComponent type="cardHolder" name={__("Card holder")} />
                                <div className="flex gap-4">
                                    <MollieComponent type="expiryDate" name={__("Expiry Date")} />
                                    <MollieComponent type="verificationCode" name={__("Verification Code")} />
                                </div>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}

CreditCard.propTypes = {
    method: paymentMethodShape.isRequired,
    selected: paymentMethodShape.isRequired,
    actions: shape({change: func}).isRequired,
};

export default CreditCard;
