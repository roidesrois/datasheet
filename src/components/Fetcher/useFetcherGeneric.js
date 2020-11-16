import React from 'react';
import useFetcher from './useFetcher';

import { Spinner } from '../Spinner';

export default function useFetcherGeneric(action, timeout = 0, update = null) {
    const [data, error, loading, loadData] = useFetcher(action, timeout, update ? update : action);

    function renderGeneric(renderFn) {
        if (loading) {
            return <Spinner />;
        }

        if (error) {
            if (error.httpError) {
                return error.data.message;
            }
            return error.message;
        }

        if (!data) return null;

        return renderFn(data);
    }

    return [renderGeneric, loadData, data, error, loading];
}
