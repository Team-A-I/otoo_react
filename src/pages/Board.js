import React, { useState, useEffect } from 'react';
import axiosIns from '../components/axios';
import { Box, Container, Grid, Typography, Card, CardContent, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Pagination } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme1 from '../theme';
import ReactGA from 'react-ga4';

// 날짜 한국 날짜로 변경
const convertTime = (date) => {
  date = new Date(date);
  let offset = date.getTimezoneOffset() * 60000; //ms 단위라 60000 곱해줌
  let dateOffset = new Date(date.getTime() - offset);
  return dateOffset.toISOString().split('T')[0];
};

const STRINGS = {
  addPostButton: '게시글 추가',
  dialogTitle: '게시글 추가',
  dialogCancel: '취소',
  dialogAdd: '추가',
  postAuthor: '작성자',
  postDate: '날짜',
  postDescription: '후기',
  deleteButton: '삭제'
};

const FLOWER_NAMES = ["Rose", "Tulip", "Lily", "Sunflower", "Daisy", "Orchid", "Violet", "Marigold", "Lavender", "Iris"];

const getRandomAuthor = () => {
  const randomFlower = FLOWER_NAMES[Math.floor(Math.random() * FLOWER_NAMES.length)];
  const randomNumber = Math.floor(Math.random() * 1000) + 1;
  return `${randomFlower}${randomNumber}`;
};

const INITIAL_NEW_POST = {
  postAuthor: getRandomAuthor(),
  postDate: convertTime(new Date()),
  postDescription: ''
};

const API_URL = 'https://ra.otoo.kr/api/posts';
const HEADERS = {
  'Content-Type': 'application/json',
  'ngrok-skip-browser-warning': '69420',
};

const Board = () => {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [newPost, setNewPost] = useState(INITIAL_NEW_POST);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axiosIns.get(API_URL, { headers: HEADERS });
      const sortedPosts = response.data.sort((a, b) => new Date(b.postDate) - new Date(a.postDate));
      setPosts(sortedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleClickOpen = () => {
    ReactGA.event('add_post_click', {
      event_category: 'User Actions',
      event_label: 'Add Post Click',
    });
    setOpen(true);
    setNewPost((prevPost) => ({
      ...prevPost,
      postAuthor: getRandomAuthor()
    }));
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
    ReactGA.event('confirm_add_post', {
      event_category: 'User Actions',
      event_label: 'Confirm Add Post',
    });

    if (!newPost.postAuthor || !newPost.postDescription) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    const postToAdd = {
      ...newPost,
      postDate: convertTime(new Date())
    };

    try {
      const response = await axiosIns.post(API_URL, postToAdd);
      setPosts((prevPosts) => [response.data, ...prevPosts]);
      setNewPost(INITIAL_NEW_POST);
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <ThemeProvider theme={theme1}>
      <div style={{ fontFamily: theme1.typography.fontFamily }}>
        <Box p={5} sx={{ backgroundColor: 'white' }}>
          <Container maxWidth="lg">
            <Box sx={{ display: "flex", alignItems: "center", justifyContent:"right" }}>
              <Button variant="contained" onClick={handleClickOpen}
                sx={{
                  ml: 2,
                  mb: 2,
                }}>
                {STRINGS.addPostButton}
              </Button>
            </Box>
            <Grid container spacing={4}>
              {currentPosts.map((post) => (
                <Grid item key={post.postId} xs={12} sm={6} md={4}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h3_bold" component="h2">
                        {post.postTitle}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {`${STRINGS.postAuthor}: ${post.postAuthor}`}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {`${STRINGS.postDate}: ${post.postDate}`}
                      </Typography>
                      <Typography variant='body1' mt={2}>
                        {post.postDescription}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box mt={4} display="flex" justifyContent="center">
              <Pagination
                count={Math.ceil(posts.length / postsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: theme1.palette.darkgreen,
                  },
                  '& .Mui-selected': {
                    backgroundColor: theme1.palette.darkgreen,
                    color: 'white',
                  },
                  '& .MuiPaginationItem-ellipsis': {
                    color: theme1.palette.lightgreen,
                  },
                }}
              />
            </Box>
          </Container>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{STRINGS.dialogTitle}</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                name="postAuthor"
                label={STRINGS.postAuthor}
                type="text"
                fullWidth
                value={newPost.postAuthor}
                disabled
              />
              <TextField
                margin="dense"
                name="postDate"
                label={STRINGS.postDate}
                type="date"
                fullWidth
                value={newPost.postDate}
                disabled
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                margin="dense"
                name="postDescription"
                label={STRINGS.postDescription}
                type="text"
                fullWidth
                multiline
                rows={4}
                value={newPost.postDescription}
                onChange={handleChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                {STRINGS.dialogCancel}
              </Button>
              <Button onClick={handleAddPost} color="primary">
                {STRINGS.dialogAdd}
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default Board;
