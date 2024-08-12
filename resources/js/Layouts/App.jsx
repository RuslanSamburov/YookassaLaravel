import { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import { Link } from '@inertiajs/react';
import formatNumber from '@/methods/formatNumber';
import Modal from '@/Components/Modal';
import axios from 'axios';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function App({ user, children }) {
    const [replenishmentModal, setReplenishmentModal] = useState(false);
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [replenishmentButton, setReplenishmentButton] = useState(false);
    const [replenishmentIpunt, setReplenishmentInput] = useState('');

    const onSubmitReplenishmentForm = async (data) => {
        data.preventDefault();
        setReplenishmentButton(true);
        
        let form = data.target;
        let formData = new FormData(form);
        
        try {
            let link = (await axios.post('/api/pay/createPayment', formData)).data.confirmation.confirmation_url;

            location.href = link;
        } catch {
            setReplenishmentButton(false);
        }
    }

    const onChangeReplenishmentInput = (data) => {
        let value = data.target.value;
        if ((Number(value) && value >= 1) || value == '') {
            setReplenishmentInput(value);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="hidden shrink-0 sm:flex items-center mr-5">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

                            <div className="flex items-center">
                                {user && (
                                    <>
                                        <div className="space-x-3 my-px flex">
                                            <h2 className='text-gray-600 font-bold text-lg'>{formatNumber(user.balance)} руб</h2>
                                            
                                            <button onClick={() => setReplenishmentModal(true)} className='ml-2 px-2 py-1 bg-blue-500 text-sm text-white font-bold rounded hover:bg-blue-600 transition duration-300'>Пополнить</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>


                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            {user ? (
                                <div className="ms-3 relative">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                >
                                                    {user.name}

                                                    <svg
                                                        className="ms-2 -me-0.5 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link href={route('profile.edit')}>Профиль</Dropdown.Link>
                                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                                Выйти
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            ) : (
                                <Link
                                        href={route('login')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Авторизоваться
                                </Link>
                            )}
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('home')} active={route().current('home')}>
                            Главная
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            {user && (
                                <>
                                    <div className="font-medium text-base text-gray-800">{user.name}</div>
                                    <div className="font-medium text-sm text-gray-500">{user.email}</div>
                                </>
                            )}
                        </div>

                        <div className="mt-3 space-y-1">
                            {user ? (
                                <>
                                    <ResponsiveNavLink href={route('profile.edit')}>Профиль</ResponsiveNavLink>
                                    <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                        Выйти
                                    </ResponsiveNavLink>
                                </>
                            ) : (
                                <ResponsiveNavLink href={route('login')}>Авторизоваться</ResponsiveNavLink>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <main>{children}</main>

            <Modal show={replenishmentModal} onClose={() => setReplenishmentModal(false)}>
                <h2 className='text-center font-bold text-2xl'>Пополнение</h2>
                <form onSubmit={onSubmitReplenishmentForm} className='mt-3'>
                    <input name='amount' value={replenishmentIpunt} onChange={onChangeReplenishmentInput} placeholder='Сумма' type='number' required className='
                        mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                        invalid:border-pink-500 invalid:text-pink-600
                        focus:invalid:border-pink-500 focus:invalid:ring-pink-500'/>
                    <button disabled={replenishmentButton} type='submit' className='disabled:opacity-75 mt-3 px-2 py-1 bg-blue-500 text-lg text-white font-bold rounded enabled:hover:bg-blue-600 transition duration-300 w-full text'>Оплатить</button>
                </form>
            </Modal>
        </div>
    );
}
