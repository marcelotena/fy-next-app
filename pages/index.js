import React from 'react'
import Head from 'next/head'
import { getInitialLocale } from "../translations/getInitialLocale";
import { useRouter } from "next/router";
import * as ReactGA from "react-ga";

export const initGA = () => {
    const trackingId = "UA-51551048-1";

    ReactGA.initialize(trackingId); // put your tracking id here
}

export const GApageView = (page) => {
    ReactGA.pageview(page);
}


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
