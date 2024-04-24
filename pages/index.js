import Head from 'next/head'
import Hero from '../components/home-page/hero'
import FeaturedPosts from '../components/home-page/featured-posts'
import { getFeaturedPosts } from '../lib/posts-utils'

function HomePage(props){
    const {posts} = props
    return <>
        <Head>
            <title>Max's Blog</title>
            <meta name="description" content="I post about programming and web development." />
        </Head>
        <Hero />
        <FeaturedPosts posts={posts} />
    </>
}

export function getStaticProps(){
    const featuredPosts = getFeaturedPosts()
    return {
        props: {
            posts: featuredPosts
        },
        revalidate: 1800
    }
}

export default HomePage