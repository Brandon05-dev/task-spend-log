import { useState, useEffect } from 'react';
import axios from 'axios';

const useApi = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                setData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    const postData = async (postData) => {
        setLoading(true);
        try {
            const response = await axios.post(url, postData);
            return response.data;
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const downloadFile = async (fileUrl) => {
        const response = await axios.get(fileUrl, { responseType: 'blob' });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'statement.pdf'); // or 'statement.xlsx' for Excel
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

    return { data, loading, error, postData, downloadFile };
};

export default useApi;