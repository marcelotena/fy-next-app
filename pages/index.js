import React from 'react'
import Head from 'next/head'
import { getInitialLocale } from "../translations/getInitialLocale";
import { useRouter } from "next/router";


const Index = () => {

    const router = useRouter()

    React.useEffect(() => {
        router.replace("/[lang]", `/${getInitialLocale()}`)
    })

    return (

        <Head>
            <title>Fast and Yours</title>
            <link rel='icon' href='/favicon.ico' />
        </Head>

    );


}

export default Index
