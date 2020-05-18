import React from 'react';
import Head from "next/head";
import useTranslation from "../hooks/useTranslation";

const PageHeader = () => {
  const { locale, t } = useTranslation();

  return (
      <Head>
        <title>{`Fast and Yours`}</title>
        <meta name="description" content={`${t('homepage')}`} />
        <meta name="viewport" content="width=device-width, maximum-scale=5, minimum-scale=1" />

        <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
        <link rel="icon" type="image/png" href="/favicon/speeddial-160px.png" />
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/favicon/apple-touch-icon-114x114.png" />
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/favicon/apple-touch-icon-72x72.png" />
        <link rel="apple-touch-icon-precomposed" href="/favicon/apple-touch-icon-57x57.png" />

        <link rel="preload" as="style" href="/css/swiper.min.css" />
        <link rel="preload" as="style" href="/css/bootstrap.min.css" />

        <link rel="stylesheet" href="/css/swiper.min.css" />
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/fastandyours.css" />
        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,700&display=swap" rel="stylesheet" />
      </Head>
  );
};

export default PageHeader;
