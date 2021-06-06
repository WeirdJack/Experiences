import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId, searchTerm }) => {
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();

  return (
    !posts.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        { !searchTerm && posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={6}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
        {
          
          searchTerm && posts.filter((post) => {

            if(post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.message.toLowerCase().includes(searchTerm.toLowerCase()) || 
            post.creator.toLowerCase().includes(searchTerm.toLowerCase()) || 
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) 
            //|| 
            //post.tags.toLowerCase().includes(searchTerm.toLowerCase())
            ){
              return post;
            }
          })
        .map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={6}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;
