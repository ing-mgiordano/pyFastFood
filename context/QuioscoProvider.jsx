import { useState, useEffect, createContext } from 'react'
import axios from 'axios'

const QuiscoContext = createContext()

const QuioscoProvider = ({children}) => {

    const [categorias, setCategorias] = useState([])
    const [categoriaClick, setCategoriaClick] = useState({})
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)

    const obtenerCategorias = async () => {
        const {data} = await axios('/api/categorias')
        setCategorias(data)
    }

    useEffect(() => {
        obtenerCategorias()
    }, [])

    useEffect(() => {
        setCategoriaClick(categorias[0])
    }, [categorias])

    const handleCategoriaClick = id => {
        const categoria = categorias.filter(cat => cat.id === id)
        setCategoriaClick(categoria[0])
    }

    const handleProducto = producto => {
        setProducto(producto)
    }

    const handleModal = () => {
        setModal(!modal)
    }

    return (
        <QuiscoContext.Provider
            value={{
                categorias,
                categoriaClick,
                handleCategoriaClick,
                producto,
                handleProducto,
                modal,
                handleModal
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