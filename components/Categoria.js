import Image from "next/image"

const Categoria = ({categoria}) => {

    const {nombre, icono, id} = categoria

    return (
        <div className="flex items-center gap-4 w-full border rounded-lg p-5 hover:bg-amber-400 hover:text-white">
            <Image 
                width={70}
                height={70}
                src={`/img/icono_${icono}.svg`}
                alt="imagen icono"
            />
            <button
                type="button"
                className="text-2xl font-bold hover:cursor-pointer hover:font-extrabold"
            >
               {nombre} 
            </button>
        </div>
    )
}

export default Categoria
