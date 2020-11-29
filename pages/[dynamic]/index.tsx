import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import React from 'react'
import { useRouter } from 'next/router';
import Head from 'next/head';
import createGcp from '../../utils/server/ogpUtils';

const DynamicPage: NextPage = () => {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? '';
  const { dynamic } = router.query; 
  

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" key="ogImage" content={`${baseUrl}/ogp/${dynamic}.png`} />
        <meta name="twitter:card" key="twitterCard" content="summary_large_image" />
        <meta name="twitter:title" content={`これはテストだよ`} />
        <meta name="twitter:description" content={"これはテストだよ"} />
        <meta name="twitter:image" key="twitterImage" content={`${baseUrl}/ogp/${dynamic}.png`} />
      </Head>
      <div>
        <h1>{dynamic}のページだよ</h1>
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [...Array(10)].map((_, index) => ({
    params: {
      dynamic: `${index}`,
    },
  }))
  
  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async (context) => {
  [...Array(10)].forEach((_, index) => {
    void createGcp(index);
  })

  return {
    props: {},
  }
}

export default DynamicPage