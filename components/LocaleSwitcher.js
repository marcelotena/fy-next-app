import React from "react"
import { useRouter } from "next/dist/client/router"
import { locales, languageNames } from "../translations/config"
import { LocaleContext } from "../context/LocaleContext"
import FormControl from "@material-ui/core/FormControl"
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'


const LocaleSwitcher = () => {
    const router = useRouter()
    const { locale } = React.useContext(LocaleContext)
    const handleLocaleChange = React.useCallback(
        e => {
            const regex = new RegExp(`^/(${locales.join("|")})`)
            router.push(
                router.pathname,
                router.asPath.replace(regex, `/${e.target.value}`)
            )
        },
        [router]
    )


    return (
        <div>
            <FormControl variant="filled">

                    <Select
                        value={locale}
                        onChange={handleLocaleChange}
                    >
                        {locales.map(locale => (
                            <MenuItem key={locale} value={locale}>
                                {languageNames[locale]}
                            </MenuItem>
                        ))}
                    </Select>



                { /* language=CSS */ }
                <style jsx>{`
                    :global(.MuiOutlinedInput-input) {
                        background-color: white;
                        padding: 12px 14px;
                    }

                    :global(.MuiSelect-select:focus) {
                        background-color: #f8f8f8;
                        border-radius: 5px;
                    }

                    :global(.Mui-focused .MuiOutlinedInput-input) {
                        border-color: transparent;
                    }
                `}</style>
            </FormControl>
        </div>

    )
}

export default LocaleSwitcher