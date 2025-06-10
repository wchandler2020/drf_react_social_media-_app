import {useContext, createContext, useState, use} from 'react'

const ContextApi = createContext()

export const ContextProvivider = ({children}) => {
    const getTOken = localStorage.getItem('JWT_TOKEN')
    ? JSON.parse(localStorage.getItem('JWT_TOKEN'))
    : null

    const [token, setToken] = useState(getTOken)

    const sendData = {
        token ,
        setToken
    }

    return <ContextApi.Provider value={sendData}>{children}</ContextApi.Provider>
}

export const useStoreContext = () => {
    const context = useContext(ContextApi)
    return context
}
