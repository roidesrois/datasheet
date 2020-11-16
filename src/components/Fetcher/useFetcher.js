import { useState, useEffect } from 'react';

export default function useFetcher(action, timeout = 0, update = null, query = null) {
    const [loading, setLoading] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    async function loadData() {
        try {
            setLoading(true);
            setShowLoading(false);
            setError(null);
            const data = await action();
            setData(data);
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData();
        const timer = setTimeout(() => {
            setShowLoading(true);
        }, timeout);
        return () => {
            clearTimeout(timer);
        };
    }, [update, query]);

    return [data, error, loading && showLoading, loadData];
}
