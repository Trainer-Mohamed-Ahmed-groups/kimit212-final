import React, { useContext } from 'react'
import { Flex, Button } from 'antd';
import { ThemeContext } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function Nav() {
    const [value, setValue] = React.useState('horizontal');

    const themeContext = useContext(ThemeContext);
    const { i18n } = useTranslation();


    return (
        <div className='bg-amber-600'>
            <div className="container bg-amber-400 m-auto">
                <Flex className='justify-between'>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                </Flex>

            </div>
            <Button type="primary" onClick={themeContext.handleTheme}>Primary Button</Button>
            <Button type="success" onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en')}>Primary Button</Button>
        </div>
    )
}
