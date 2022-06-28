import { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const QuiscoContext = createContext()

const QuioscoProvider = ({children}) => {

    const [categorias, setCategorias] = useState([])
    const [categoriaClick, setCategoriaClick] = useState({})
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [pedido, setPedido] = useState([])
    const [nombre, setNombre] = useState('')
    const [total, setTotal] = useState(0)

    const router = useRouter()

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

    useEffect(() => {
        const nvoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)
        setTotal(nvoTotal)
    }, [pedido])

    const handleCategoriaClick = id => {
        const categoria = categorias.filter(cat => cat.id === id)
        setCategoriaClick(categoria[0])
        router.push('/')
    }

    const handleProducto = producto => {
        setProducto(producto)
    }

    const handleModal = () => {
        setModal(!modal)
    }

    const handlePedido = ({categoriaId, ...producto}) => {  // si escribo las variables del lado izquierdo de los ... se eliminan esas variables del objeto 
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

    const handleEditarCantidad = id => {
        const productoActualizado = pedido.filter(producto => producto.id === id)

        setProducto(productoActualizado[0])
        setModal(!modal)
    }

    const handleEliminarProducto = id => {
        const pedidoActualizado = pedido.filter(producto => producto.id !== id)

        setPedido(pedidoActualizado)
    }

    const colocarOrden = async (e) => {
        e.preventDefault()
        
        const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 3000));
        
        try {
           const {data} = await axios.post('/api/ordenes',
                {pedido, nombre, total, fecha: Date.now().toString()}
            )
           /* console.log(data) */
            toast.promise(
                resolveAfter3Sec,
                {
                    pending: 'Enviando Pedido',
                    success: 'Pedido Enviado 👌'
                }
            )

            //Resetear app
            setCategoriaClick(categorias[0])
            setPedido([])
            setNombre('')
            setTotal(0)

            setTimeout(() => {
                router.push('/')
            }, 6000);

        } catch (error) {
            toast.promise(
                resolveAfter3Sec,
                {
                    pending: 'Enviando Pedido',
                    error: 'Hubo un Problema 🤯'
                }
            )   
        }    
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
                handlePedido,
                handleEditarCantidad,
                handleEliminarProducto,
                nombre,
                setNombre,
                colocarOrden,
                total
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