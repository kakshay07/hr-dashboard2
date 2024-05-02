import { useEffect, useState } from "preact/hooks"
import Login from "./Login/Login";

const PrivateComponent = ({children} : {children : any}) => {
  
    const [isLoggedIn, setisLoggedIn] = useState('false');

    useEffect(() => {
        localStorage.isloggedin = 'false' //remove this
        let isLoginedin = localStorage.getItem('isloggedin');
        if(isLoginedin === 'true'){
            setisLoggedIn('true');
        } else {
            setisLoggedIn('false');
        }
    }, [])

    if(isLoggedIn === 'false'){
        return <Login setisLoggedIn={setisLoggedIn} />
    }
    
    return (
        <>
            {children}
        </>
    )
}

export default PrivateComponent