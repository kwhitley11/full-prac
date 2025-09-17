import React, { useEffect, useState } from "react";
import { getHello } from "../services/api";

function Greeting() {
    const [ message, setMessage ] = useState('');


    useEffect(() => {
        getHello().then(data => setMessage(data.message));
    }, []);

    return <div>{message}</div>;
}

export default Greeting;