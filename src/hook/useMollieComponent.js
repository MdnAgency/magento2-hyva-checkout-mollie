import {useCallback, useEffect, useState} from "react";
import useMollie from "./useMollie";

const loadedComponents = {}

/**
 * Global store for instanced mollie component
 * When a component is created we cannot instantiate another one
 * so we store instances here
 * @param effect
 * @param deps
 * @param type
 */
const useMollieComponent = (effect, deps,type) => {
    const [mollie, setMollie] = useState();
    const componentsCb = useCallback(effect, [effect,...deps]);

    useMollie(setMollie, []);

    useEffect(() => {
        if (mollie) {
            if(!loadedComponents[type]){
                // if the requested component is not created yet
                loadedComponents[type] = mollie.createComponent(type)
            }
            componentsCb(loadedComponents[type]);
        }
    }, [type, mollie, componentsCb]);
};

export default useMollieComponent;
