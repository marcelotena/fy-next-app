import React from "react"
import { useRouter } from "next/dist/client/router"
import { locales, languageNames } from "../translations/config"
import { LocaleContext } from "../context/LocaleContext"
import Select from 'react-select'
import useTranslation from "../hooks/useTranslation";


function localeProcess(optionsSelect, locales) {

    locales.map(locale => (
        optionsSelect.push({ value: locale, label: languageNames[locale]})
    ));

    return optionsSelect;
}

function defaultValueSelect(locale) {
    return {value: locale, label: languageNames[locale]}
}


const LocaleSwitcher = () => {
    const router = useRouter();
    const { locale, t } = useTranslation();

    const handleLocaleChange = React.useCallback(
        e => {
            const regex = new RegExp(`^/(${locales.join("|")})`)
            router.push(
                router.pathname,
                router.asPath.replace(regex, `/${e.value}`)
            )
        },
        [router]
    )

    let optionsSelect = [];


    const customStyles = {
        control: styles => ({
            ...styles,
            backgroundColor: 'white',
        }),
        option: (styles) => ({
            ...styles,
        }),
        input: styles => ({ ...styles }),
        placeholder: styles => ({ ...styles }),
        singleValue: (styles) => ({
            ...styles,
        }),
    };


    return (
        <div>
            <div className="Form__control">
                <Select
                    id="lang-select"
                    defaultValue={defaultValueSelect(locale)}
                    styles={customStyles}
                    onChange={handleLocaleChange}
                    options={localeProcess(optionsSelect, locales)}
                    getOptionLabel={option => `${option.label}`}
                    placeholder={t('language_switcher')}
                />
            </div>





            { /* language=CSS */ }
            <style jsx>{`
                .Form__control {
                    max-width: 120px;
                    margin-left: auto;
                    margin-right: auto;
                }
            `}</style>

        </div>

    )
}

export default LocaleSwitcher