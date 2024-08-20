import { useState } from "react";

export default function Product({ id, title, description, price, src, onClickBuy }) {
    const [buttonBuy, setButtonBuy] = useState(false);

    const onClick = async e => {
        setButtonBuy(true);
        await onClickBuy(e);
        setButtonBuy(false);
    }

    return (
        <div className="relative w-full overflow-hidden group rounded-lg shadow-lg my-5">
            <img
                src={src}
                alt={title}
                className="w-full h-64 md:h-80 lg:h-96 object-cover transform scale-110 transition-transform duration-400 ease-out group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-black bg-opacity-70 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out p-4 md:p-6 flex flex-col justify-between">
                <div>
                    <h2 className="text-gray-300 text-lg md:text-xl lg:text-2xl font-bold mb-1 md:mb-2">{title}</h2>
                    <p className="text-gray-400 text-sm md:text-base mb-2 md:mb-4">{description}</p>
                    <p className="text-gray-300 text-md md:text-lg font-semibold">Цена: {price.toLocaleString()} руб</p>
                </div>
                <button 
                    onClick={onClick} 
                    disabled={buttonBuy} 
                    data-id={id} 
                    className="disabled:opacity-75 bg-blue-600 text-white font-bold rounded-lg enabled:hover:bg-blue-700 transition duration-300 py-2 mt-4 md:mt-0"
                >
                    Купить
                </button>
            </div>
        </div>
    );
};
