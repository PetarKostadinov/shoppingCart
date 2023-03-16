import { useEffect, useState } from "react";
const url = 'http://localhost:300'
export default function useFetch(url) {
    const [data, setData] = useState();
    const [errorStatus, setErrorStatus] = useState();
    useEffect(() => {
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw response.status;
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
            })
            .catch((err) => {
                setErrorStatus(err);
            });

        
    }, []);

    return [data, errorStatus];

}