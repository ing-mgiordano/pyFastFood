import Image from "next/image"
import { formatearDinerto } from "../helpers"

const Producto = ({producto}) => {

    const {nombre, precio, imagen} = producto

    return (
        <div className="border p-3">
            <Image
                src={`/img/${imagen}.jpg`} 
                alt={`imagen producto ${nombre}`}
                width={400} 
                height={500}
            />
            <div className="p-5">
                <h3 className="text 2xl font-bold">
                    {nombre}
                </h3>
                <p className="mt-5 font-black text-4xl text-amber-500">
                    {formatearDinerto(precio)}
                </p>
            </div>
        </div>
    )
}

export default Producto
