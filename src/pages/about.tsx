import Head from "next/head";

type PropsType = {
    info: string
}

export default function About(props: PropsType) {
    return (
        <>
            <Head>
                <title>About page</title>
                <meta name="description" content="About page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <h1>About page</h1>
                <p>{props.info}</p>
            </main>
        </>
    )
}

// // StaticGeneration：项目构建时，直接产出 HTML 文件
// export async function getStaticProps() {
//     // 可以 await 异步请求

//     console.log('只在 build 构建时执行...') // 线上环境下，每次请求（刷新）不会再执行

//     return {
//         props: {
//             info: '请求来的数据'
//         }
//     }
// }

// Server-side-rendering - 每次请求时动态生产 HTML
export async function getServerSideProps() {
    // 可以 await 异步请求

    console.log('每次请求都会执行...')

    return {
        props: {
            info: '请求来的数据 100'
        }
    }
}