import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import apes from '../apes.json'

function dynamicSort(property: string) {
    let sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a: unknown, b: unknown) {
        // @ts-ignore
        const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>The Average Ape</title>
                <meta name="description" content="The Average Ape"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <h1 className={"text-2xl font-extrabold p-3 text-white bg-black"}>The Average Ape</h1>

            <main className={'container mx-auto'}>
                {
                    apes.sort(dynamicSort("type")).map((k) => (
                        <div key={k.type} className={'my-3'}>
                            <div className={'flex items-center justify-items-center'}>
                                <h2 className={'text-xl font-extrabold text-white bg-black px-3 py-2'}>{k.type}</h2>
                            </div>
                            <div className={'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-0 my-3'}>
                                {
                                    k.features.sort(dynamicSort("count")).reverse().map((v) => (
                                        <div key={v.feature} className={'flex flex-col justify-items-center items-center'}>
                                            <div
                                                className={'w-44 h-44 bg-gray-200 border shadow-inner border-gray-500 hover:border-purple-500 hover:bg-purple-200 rounded-lg'}>
                                                <Image src={`/apes/${v.filename}.png`}
                                                       width={'200px'}
                                                       height={'200px'}/>
                                            </div>
                                            <h3 className={'text-center text-sm text-gray-500 mt-1 mb-3'}>{v.feature} ({v.count})</h3>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </main>

        </div>
    )
}

export default Home
