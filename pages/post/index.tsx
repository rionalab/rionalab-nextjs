import Post from '@/components/posts/Post';
import { GetStaticProps } from 'next';
import { IPost } from 'types';
import Style from './Style.module.scss';

interface IProps {
   source: string;
   number: number;
   posts: IPost[];
}

export const getStaticProps: GetStaticProps = async () => {
   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
   const posts: IPost[] = await res.json();

   return {
      props: {
         posts,
         number: Math.random(),
         source: 'google',
      },
      revalidate: 10
   };
};

const Posts = ({ posts = [], number, source }: IProps) => {
   return (
      <div className={Style.post}>
         <h1>Welcome to My Posts Page {number}</h1>

         {posts.map((post, postIdx) => (
            <Post post={post} key={postIdx} />
         ))}
      </div>
   );
};

export default Posts;
