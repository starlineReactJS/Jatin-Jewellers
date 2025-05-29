import React, { useEffect, useRef, useState } from 'react';

export const Skeleton = (props) => {
    let isLoadingObj = {};
    Object.keys(props?.dependency).forEach(key => {
        isLoadingObj[key] = null;
    });
    const [isLoading, setIsLoading] = useState({ ...isLoadingObj });
    let skeletonTimeoutRef = useRef({ ...isLoadingObj });

    useEffect(() => {
        let tempIsLoading = { ...isLoading };
        Object.keys(props?.dependency)?.forEach(key => {
            skeletonTimeoutRef.current[key] = setTimeout(() => {
                if (!!props?.dependency[key] && props?.dependency[key]?.length > 0 && !(!!isLoading[key])) {
                    tempIsLoading[key] = "dataLoaded";
                    setIsLoading(tempIsLoading);
                }
            }, 700);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props?.dependency]);

    useEffect(() => {
        Object.keys(isLoading)?.forEach(key => {
            if (!!isLoading[key]) {
                clearTimeout(skeletonTimeoutRef.current[key]);
            }
        });
        props.isLoading(isLoading);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    return (
        <div className='skeleton' style={{ height: props?.height }}>
        </div>
    );
};
