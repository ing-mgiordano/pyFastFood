import { useState, useEffect, createContext } from 'react'
import axios from 'axios'

const QuiscoContext = createContext()

const QuioscoProvider = ({children}) => {

    const [categorias, setCategorias] = useState([])

    const obtenerCategorias = async () => {
        const {data} = await axios('/api/categorias')
        setCategorias(data)
    }
    useEffect(() => {
        obtenerCategorias()
    }, [])

    return (
        <QuiscoContext.Provider
            value={{
                categorias
            }}
        >
            {children}
        </QuiscoContext.Provider>
    )
}

export {
    QuioscoProvider
}

export default QuiscoContext