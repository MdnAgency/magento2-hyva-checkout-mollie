import React, {useEffect} from 'react';
import {shape, func} from 'prop-types';
import _get from "lodash.get";

import RadioInput from '@hyva/react-checkout/components/common/Form/RadioInput';

import {paymentMethodShape} from '@hyva/react-checkout/utils/payment';
import useCheckoutFormContext from '@hyva/react-checkout/hook/useCheckoutFormContext';

import usePaymentMethodFormContext from '@hyva/react-checkout/components/paymentMethod/hooks/usePaymentMethodFormContext';
import usePaymentMethodCartContext from '@hyva/react-checkout/components/paymentMethod/hooks/usePaymentMethodCartContext';
import useMolliePayment from "../../hook/useMolliePayment";


function RemoteForm({method, selected, actions}) {
    const { submitHandler} = usePaymentMethodFormContext();
    const methodCode = method.code;
    const isSelected = methodCode === selected.code;

    const { registerPaymentAction } = useCheckoutFormContext();
    const { placeOrder } = useMolliePayment({methodCode});

    useEffect(() => {
        registerPaymentAction(methodCode, placeOrder);
    }, [registerPaymentAction, methodCode, placeOrder]);

    const { methodList } =
        usePaymentMethodCartContext();

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
