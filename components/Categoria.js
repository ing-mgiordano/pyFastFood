import Image from "next/image"
import useQuiosco from "../hooks/useQuiosco"

const Categoria = ({categoria}) => {

    const {categoriaClick, handleCategoriaClick} = useQuiosco()

    const {nombre, icono, id} = categoria

    return (
        <div className={`${categoriaClick?.id === id ? 'bg-amber-400' : ''} flex items-center gap-4 w-full border rounded-lg p-5 hover:bg-amber-400 hover:text-white`}>
            <Image 
                width={70}
                height={70}
                src={`/img/icono_${icono}.svg`}
                alt="imagen icono"
            />
            <button
                type="button"
                className="text-2xl font-bold hover:cursor-pointer"
                onClick={() => handleCategoriaClick(id)}
            >
               {nombre} 
            </button>
        </div>
    )
}

export default Categoria
