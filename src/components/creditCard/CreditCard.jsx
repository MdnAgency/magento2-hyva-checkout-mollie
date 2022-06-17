import React, {useEffect} from 'react';
import {shape, func} from 'prop-types';

import Card from '@hyva/react-checkout/components/common/Card/Card';
import RadioInput from '@hyva/react-checkout/components/common/Form/RadioInput';

import {paymentMethodShape} from '@hyva/react-checkout/utils/payment';
import useCheckoutFormContext from '@hyva/react-checkout/hook/useCheckoutFormContext';

import MollieComponent from "../mollieComponent";
import useMolliePayment from "../../hook/useMolliePayment";


function CreditCard({method, selected, actions}) {
    const methodCode = method.code;
    const isSelected = methodCode === selected.code;

    const { registerPaymentAction } = useCheckoutFormContext();
    const { placeCardOrder } = useMolliePayment({methodCode});

    useEffect(() => {
        registerPaymentAction(methodCode, placeCardOrder);
    }, [registerPaymentAction, methodCode, placeCardOrder]);

    if (!isSelected) {
        return (
            <RadioInput
                value={method.code}
                label={method.title}
                name="paymentMethod"
                checked={isSelected}
                onChange={actions.change}
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
                    onChange={actions.change}
                />
                {isSelected && (
                    <div className="mx-4 mb-8 mt-2">
                        <Card bg="darker">
                            <div className="-mt-4">
                                <MollieComponent type="cardNumber" name="Card number" />
                                <MollieComponent type="cardHolder" name="Card holder" />
                                <div className="flex gap-4">
                                    <MollieComponent type="expiryDate" name="Expiry Date" />
                                    <MollieComponent type="verificationCode" name="Verification Code" />
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
