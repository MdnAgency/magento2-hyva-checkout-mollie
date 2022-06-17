import React, {useEffect} from 'react';
import {shape, func} from 'prop-types';

import RadioInput from '@hyva/react-checkout/components/common/Form/RadioInput';

import {paymentMethodShape} from '@hyva/react-checkout/utils/payment';
import useCheckoutFormContext from '@hyva/react-checkout/hook/useCheckoutFormContext';

import useMolliePayment from "../../hook/useMolliePayment";


function RemoteForm({method, selected, actions}) {
    const methodCode = method.code;
    const isSelected = methodCode === selected.code;

    const { registerPaymentAction } = useCheckoutFormContext();
    const { placeOrder } = useMolliePayment({methodCode});

    useEffect(() => {
        registerPaymentAction(methodCode, placeOrder);
    }, [registerPaymentAction, methodCode, placeOrder]);

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
            </div>
        </div>
    );
}

RemoteForm.propTypes = {
    method: paymentMethodShape.isRequired,
    selected: paymentMethodShape.isRequired,
    actions: shape({change: func}).isRequired,
};

export default RemoteForm;
