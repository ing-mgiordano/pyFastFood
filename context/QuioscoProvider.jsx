import { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const QuiscoContext = createContext()

const QuioscoProvider = ({children}) => {

    const [categorias, setCategorias] = useState([])
    const [categoriaClick, setCategoriaClick] = useState({})
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [pedido, setPedido] = useState([])

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

    const handlePedido = ({categoriaId, imagen, ...producto}) => {  // si escribo las variables del lado izquierdo de los ... se eliminan esas variables del objeto 
        if(pedido.some(productoAdd => productoAdd.id === producto.id)) {
            //Actualizar cantidad
            const pedidoActualizado = pedido.map(productoAdd => productoAdd.id === producto.id ? producto : productoAdd)
            
            setPedido(pedidoActualizado)
            toast.success('Guardado Correctamente')
        } else {
            setPedido([...pedido, producto])
            toast.success('Agregado al Pedido')
        }

        setModal(false)
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
                handleModal,
                pedido,
                handlePedido
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