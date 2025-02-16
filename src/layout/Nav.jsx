import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuOutlined, CloseOutlined, DownOutlined, SearchOutlined, GlobalOutlined, BulbOutlined } from '@ant-design/icons';
import { Drawer, Button, Input, Dropdown, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import logo from "/icon.png"
import { ThemeContext } from '../context/ThemeContext';

export default function Navbar() {
    const { t, i18n } = useTranslation();
    const [open, setOpen] = useState(false);


    const items = [
        {
            label: '1st menu item',
            key: '1',
        },
        {
            label: '2nd menu item',
            key: '2',
        },
        {
            label: '3rd menu item',
            key: '3',
        },
    ];
    const onClick = ({ key }) => {
        message.info(`Click on item ${key}`);
    };

    const themeContext = useContext(ThemeContext);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <nav className={`shadow-md p-4 w-full ${themeContext.themeColor === 'light' ? 'text-gray-800' : 'text-white bg-gray-800'}`}>
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/">
                    <span className="text-xl font-bold text-blue-600">
                        <img src={logo} width={30} placeholder="Site logo" />
                    </span>
                </Link>

                <div className="hidden md:flex space-x-10 items-center">
                    <Link to="/" className=" hover:text-blue-600 text-nowrap">{t('home')}</Link>
                    <Link to="/products" className=" hover:text-blue-600 text-nowrap">{t('products')}</Link>
                    <Dropdown
                        menu={{
                            items,
                            onClick,
                        }}
                    >
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                Hover
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                    <Link to="/contact" className=" hover:text-blue-600 text-nowrap">{t('contact')}</Link>

                    <Input placeholder={t('search')} prefix={<SearchOutlined />} className="hidden md:block w-64 rounded-lg bg-gray-300 p-4" />

                    <Space>
                        <Button type="text" icon={<GlobalOutlined style={{ filter: themeContext.themeColor === 'dark' ? 'invert(1)' : '' }} />} onClick={() => changeLanguage(i18n.language === 'en' ? 'ar' : 'en')} />
                        <Button type="text" icon={<BulbOutlined style={{ filter: themeContext.themeColor === 'dark' ? 'invert(1)' : '' }} />} onClick={themeContext.handleTheme} />
                    </Space>

                </div>

                <div className="md:hidden flex items-center">
                    <Input placeholder={t('search')} prefix={<SearchOutlined />} className="mr-4" />
                    <Button type="text" icon={<MenuOutlined />} onClick={toggleDrawer} />
                </div>
            </div>

            <Drawer title={t('menu')} placement="right" onClose={toggleDrawer} open={open} closeIcon={<CloseOutlined />}>
                <div className="flex flex-col text-center space-y-4">
                    <Link to="/" onClick={toggleDrawer} className="text-gray-700 hover:text-blue-600 text-nowrap">{t('home')}</Link>
                    <Link to="/products" onClick={toggleDrawer} className="text-gray-700 hover:text-blue-600 text-nowrap">{t('products')}</Link>
                    <Dropdown trigger={['click']} className='flex justify-center'>
                        <span className="cursor-pointer text-gray-700 hover:text-blue-600 text-nowrap flex items-center">
                            {t('shop')} <DownOutlined className="w-2 ml-1" />
                        </span>
                    </Dropdown>
                    <Link to="/contact" onClick={toggleDrawer} className="text-gray-700 hover:text-blue-600 text-nowrap">{t('contact')}</Link>
                </div>
                <div className='flex items-center justify-center mt-4'>
                    <Button type="text" icon={<GlobalOutlined />} onClick={() => changeLanguage(i18n.language === 'en' ? 'ar' : 'en')} />
                    <Button type="text" icon={<BulbOutlined />} onClick={themeContext.handleTheme} />
                </div>
            </Drawer>
        </nav>
    );
}
