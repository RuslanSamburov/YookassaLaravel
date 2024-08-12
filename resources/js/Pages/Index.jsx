import App from '@/Layouts/App'
import { Head } from '@inertiajs/react'
import React from 'react'

export default function Index({ auth }) {
    return (
        <App user={auth.user}>
        <Head title="Главная" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900"></div>
                    </div>
                </div>
            </div>
        </App>
    )
}
