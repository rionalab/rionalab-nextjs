import Link from "next/link"
import { IPost } from "types"
import Style from './Style.module.scss';

interface IProps {
   post: IPost
}

const Post = ({ post }: IProps) => {
   const slug = post?.title.split(' ').join('-')
   const _ = (s: string | number) => encodeURIComponent(s)
   const url = `/post/${_(post.id)}/${_(slug)}`

   return (
      <div className={Style.postItem}>
         <Link href={url} >
            <a>{post.title}</a>
         </Link>
      </div>
   )
}


export default Post