import Image from "next/image"
import { formatearDinerto } from "../helpers"
import useQuiosco from "../hooks/useQuiosco"


const ModalProducto = () => {

    const {producto, handleModal} = useQuiosco()

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
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 hover:text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                <h1 className="text-3xl font-bold mt-5">
                    {producto.nombre}
                </h1>
                <p className="mt-5 font-bold text-5xl text-amber-500">
                    {formatearDinerto(producto.precio)}
                </p>
            </div>
        </div>
    )
}

export default ModalProducto
