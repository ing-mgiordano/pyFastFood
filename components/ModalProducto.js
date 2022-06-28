import { useState, useEffect } from "react"
import Image from "next/image"
import { formatearDinerto } from "../helpers"
import useQuiosco from "../hooks/useQuiosco"


const ModalProducto = () => {
    
    const {producto, handleModal, pedido, handlePedido} = useQuiosco()
    const [cantidad, setCantidad] = useState(1)
    const [edicion, setEdicion] = useState(false)

    //Comprobar si el Modal actual esta en el pedido
    useEffect(() => {
        if(pedido.some(pedidoAdd => pedidoAdd.id === producto.id)) {
            
            const productoEdicion = pedido.find(pedidoAdd => pedidoAdd.id === producto.id)
            
            setEdicion(true)
            setCantidad(productoEdicion.cantidad)
        }
    }, [producto, pedido])
    

    return (
        <div className="md:flex gap-10 bg-amber-100">
            <div className="md:w-1/3">
                <Image 
                    width={300}
                    height={400}
                    src={`/img/${producto.imagen}.jpg`}
                    alt={`Imagen producto ${producto.nombre}`}
                />
            </div>

            <div className="md:w-2/3">
                <div className="flex justify-end" >
                    <button
                        onClick={handleModal}
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 hover:text-amber-500" 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                        >
                            <path 
                                fillRule="evenodd" 
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                                clipRule="evenodd" 
                            />
                        </svg>
                    </button>
                </div>
                <h1 className="text-3xl font-bold mt-5">
                    {producto.nombre}
                </h1>
                <p className="mt-5 font-bold text-5xl text-amber-500">
                    {formatearDinerto(producto.precio)}
                </p>
                
                <div className="flex gap-4 mt-5">
                    <button
                        type="button"
                        onClick={() => {
                            if(cantidad <= 1) return
                            setCantidad(cantidad - 1)
                        }}
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-7 w-7  hover:text-amber-500"
                            fill="none"
                            viewBox="0 0 24 24" 
                            stroke="currentColor" 
                            strokeWidth={2}
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </button>

                    <p className="text-3xl ">
                        {cantidad}
                    </p>

                    <button
                        type="button"
                        onClick={() => {
                            if(cantidad >= 5) return
                            setCantidad(cantidad + 1)
                        }}
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-7 w-7  hover:text-amber-500" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor" 
                            strokeWidth={2}
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" 
                            />
                        </svg>
                    </button>
                </div>

                <button
                    type="button"
                    className="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold uppercase rounded-xl"
                    onClick={() => handlePedido({...producto, cantidad})}
                >
                    {edicion ? 'Guardar Cambios' : 'Añadir al Pedido'}
                </button>
            </div>
        </div>
    )
}

export default ModalProducto
