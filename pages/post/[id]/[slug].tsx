import Router from 'next/router'

interface IProps {
   params: any;
   post: any;
}

const PostDetail = ({ params, post }: IProps) => {
   console.log(params)
   return (
      <>
         <h3>{post.title}</h3>
         <p>{post.body}</p>
         <button onClick={()=> Router.back()}>back</button>
      </>
   )
}

export const getStaticProps = async (ctx: any) => {
   const id = ctx.params.id
   const url = `https://jsonplaceholder.typicode.com/posts/${id}`
   const req = await fetch(url)
   const post = await req.json()

   return {
      props: {
         params: ctx.params,
         post,
      }
   }
}

export const getStaticPaths = async () => {

   const url = `https://jsonplaceholder.typicode.com/posts`
   const req = await fetch(url)
   const posts = await req.json()

   const paths = posts.map((post: any) => {
      return {
         params: {
            id: post.id.toString(),
            slug: post.title.split(' ').join('-')
         }
      }
   }).slice(0,5)

   console.log(paths)

   return {
      paths,
      fallback: false
   }
}


export default PostDetail