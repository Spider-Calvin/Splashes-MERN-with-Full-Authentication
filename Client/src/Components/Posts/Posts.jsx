import React , {useState} from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import "./style.scss"

import Loader from "../Loader/Loader";



function Posts({setCurrentId}) {

  const posts = useSelector((state) => state.posts);
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  
return (
  <>
    <motion.div
      animate={animateCard}
      transition={{ duration: 0.5, delayChildren: 0.5 }}
      className="app__work-portfoli"
    >
      {posts.length ? (
        <>
          {posts.map((post) => (
            <Post
              post={post}
              key={post._id}
              setCurrentId={setCurrentId}
              
            />
          ))}
        </>
      ) : (
        <Loader />
      )}
    </motion.div>
  </>
);
}

export default Posts;
