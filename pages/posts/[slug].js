
import Head from 'next/head'
import PostContent from '../../components/posts/post-detail/post-content'
import { getPostData, getPostsfile } from '../../lib/posts-utils'

function PostDetailPage(props){
    const {post} = props
    if(!post){
        return <p>Loading...</p>
    }
    return (
        <>
            <Head>
                <title>{post.title}</title>
                <meta name='description' content={post.excerpt} />
            </Head>
            <PostContent post={post} />
        </>
        
    )
}

export function getStaticProps(context){
    const {params} = context
    const {slug} = params
    const postData = getPostData(slug)

    return {
        props:{
            post: postData
        },
        revalidate: 600
    }
}

export function getStaticPaths(){
    const postFilenames = getPostsfile()
    const slugs = postFilenames.map((fileName) => fileName.replace(/\.md$/, ''))
    return {
        paths: slugs.map(slug => ({
            params: {
                slug: slug
            }
        })),
        fallback: true
    }
}

export default PostDetailPage