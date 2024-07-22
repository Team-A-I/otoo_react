import React, { useState, useEffect } from 'react';
import axiosIns from '../components/axios';
import { Box, Container, Grid, Typography, Card, CardContent, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Pagination } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme1 from '../theme';

const strings = {
  boardTitle: '게시판',
  addPostButton: '게시글 추가',
  dialogTitle: '게시글 추가',
  dialogCancel: '취소',
  dialogAdd: '추가',
  postAuthor: '작성자',
  postDate: '날짜',
  postDescription: '후기',
};

const flowerNames = ["Rose", "Tulip", "Lily", "Sunflower", "Daisy", "Orchid", "Violet", "Marigold", "Lavender", "Iris"];

const getRandomAuthor = () => {
  const randomFlower = flowerNames[Math.floor(Math.random() * flowerNames.length)];
  const randomNumber = Math.floor(Math.random() * 1000) + 1;
  return `${randomFlower}${randomNumber}`;
};

const Board = () => {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    author: getRandomAuthor(),
    date: new Date().toISOString().split('T')[0],
    description: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axiosIns.get('https://gnat-suited-weekly.ngrok-free.app/api/posts', {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        }
      }
      );
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
    setNewPost((prevPost) => ({
      ...prevPost,
      author: getRandomAuthor()
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
    if (!newPost.author || !newPost.description) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    try {
      const response = await axiosIns.post('https://gnat-suited-weekly.ngrok-free.app/api/posts', newPost);
      setPosts((prevPosts) => [...prevPosts, response.data]);
      setNewPost({
        author: getRandomAuthor(),
        date: new Date().toISOString().split('T')[0],
        description: ''
      });
      handleClose();
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
            <Box sx={{display:"flex", alignItems:"center"}}>
              <Typography variant="h2_bold" gutterBottom>
                {strings.boardTitle}
              </Typography>
              <Button variant="contained" onClick={handleClickOpen}               
              sx={{ 
                ml: 2, 
                mb: 2, 
                backgroundColor: theme1.palette.darkgreen,
                '&:hover': {
                  backgroundColor: theme1.palette.lightgreen,
                }
              }}>
                {strings.addPostButton}
              </Button>
            </Box>
            <Grid container spacing={4}>
              {currentPosts.map((post) => (
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
            <DialogTitle>{strings.dialogTitle}</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                name="author"
                label={strings.postAuthor}
                type="text"
                fullWidth
                value={newPost.author}
                disabled
              />
              <TextField
                margin="dense"
                name="date"
                label={strings.postDate}
                type="date"
                fullWidth
                value={newPost.date}
                disabled
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
