import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

export const usePrevious = (value) => {
    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
};

export const usePreviousReference = (value) => {
    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
};

export const backgroundColorClass = (current, previous) => {
    if (current > previous) {
        return "h";
    } else if (current < previous) {
        return "l";
    } else {
        return "e";
    }
};


export const Toast = () => {
    return toast;
};
