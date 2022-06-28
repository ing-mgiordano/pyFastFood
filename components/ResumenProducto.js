import Image from "next/image"
import { formatearDinerto } from "../helpers"

const ResumenProducto = ({producto}) => {

    return (
        <div className="shadow p-5 mb-3 flex gap-10 items-center">
            <div className="md:w-1/6">
                <Image 
                    width={300}
                    height={400}
                    src={`/img/${producto.imagen}.jpg`}
                    alt={`Imagen producto ${producto.nombre}`}
                />
            </div>

            <div className="md:w-5/6">
                <p className="text-3xl font-bold">
                    {producto.nombre}
                </p>
                <p className="text-xl font-bold mt-2">
                    Cantidad: {producto.cantidad}
                </p>
                <p className="text-xl font-bold mt-2">
                    Precio: <span className="text-amber-500" >{formatearDinerto(producto.precio)}</span>
                </p>
                <p className="text-sm mt-2">
                    Subtotal: <span className="text-gray-400">{formatearDinerto(producto.precio * producto.cantidad)}</span>
                </p>
            </div>
        </div>
    )
}

export default ResumenProducto
