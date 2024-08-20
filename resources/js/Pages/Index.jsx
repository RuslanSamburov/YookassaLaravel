import Notifications from '@/Components/Notifications';
import Product from '@/Components/Product';
import useNotification from '@/hooks/useNotification';
import App from '@/Layouts/App';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Index({ auth }) {
    const [notifications, addNotification, removeNotification] = useNotification();
    const [products, setProducts] = useState([]);

    useEffect(function () {
        (async () => {
            try {
                let data = (await axios.get(route('products'))).data;
                setProducts(data);
            } catch { }
        })();
    }, []);

    const onClickBuy = async e => {
        try {
            let data = await axios.get(route('products.buy', e.target.dataset.id));
            addNotification('Успешно', data.data.message);
        } catch (err) {
            addNotification('Ошибка', err.response.data.message);
        }
    }

    return (
        <App user={auth.user}>
            <Head title="Главная" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="px-5 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="text-gray-900">
                            {products.map((product, index) => (
                                <Product key={index} id={product.id} title={product.title} description={product.description} price={product.price} src={product.image} onClickBuy={onClickBuy} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Notifications notifications={notifications} setNotifications={removeNotification} />
        </App>
    )
}
