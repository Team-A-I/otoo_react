import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Container, Grid, Typography, Card, CardContent, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme1 from '../theme';

const strings = {
  boardTitle: '게시판',
  addPostButton: '게시글 추가',
  dialogTitle: '게시글 추가',
  dialogCancel: '취소',
  dialogAdd: '추가',
  postTitle: '제목',
  postAuthor: '작성자',
  postDate: '날짜',
  postDescription: '후기',
  viewDetails: '자세히 보기'
};

const Board = () => {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    author: '',
    date: '',
    description: ''
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevPost) => ({
      ...prevPost,
      [name]: value
    }));
  };

  const handleAddPost = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/posts', newPost);
      setPosts((prevPosts) => [...prevPosts, response.data]);
      setNewPost({
        title: '',
        author: '',
        date: '',
        description: ''
      });
      handleClose();
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <ThemeProvider theme={theme1}>
      <div style={{ fontFamily: theme1.typography.fontFamily }}>
        <Box p={5} sx={{ backgroundColor: 'white' }}>
          <Container maxWidth="lg">
            <Typography variant="h2_bold" gutterBottom>
              {strings.boardTitle}
            </Typography>
            <Button variant="contained" onClick={handleClickOpen} sx={{ ml: 2, mb: 2, backgroundColor:theme1.palette.darkgreen }}>
              {strings.addPostButton}
            </Button>
            <Grid container spacing={4}>
              {posts.map((post) => (
                <Grid item key={post.id} xs={12} sm={6} md={4}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h3_bold" component="h2">
                        {post.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {`${strings.postAuthor}: ${post.author}`}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {`${strings.postDate}: ${post.date}`}
                      </Typography>
                      <Typography variant='body1' mt={2}>
                        {post.description}
                      </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                      <Button size="small" color="primary">
                        {strings.viewDetails}
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{strings.dialogTitle}</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                name="title"
                label={strings.postTitle}
                type="text"
                fullWidth
                value={newPost.title}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="author"
                label={strings.postAuthor}
                type="text"
                fullWidth
                value={newPost.author}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="date"
                label={strings.postDate}
                type="date"
                fullWidth
                value={newPost.date}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                margin="dense"
                name="description"
                label={strings.postDescription}
                type="text"
                fullWidth
                multiline
                rows={4}
                value={newPost.description}
                onChange={handleChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                {strings.dialogCancel}
              </Button>
              <Button onClick={handleAddPost} color="primary">
                {strings.dialogAdd}
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default Board;
