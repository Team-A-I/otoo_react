import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme1 from '../../theme';

const API_URL = 'https://ra.otoo.kr/api/posts';
const HEADERS = {
  'Content-Type': 'application/json',
  'ngrok-skip-browser-warning': '69420',
};

const AdminBoard = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(9);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(API_URL, { headers: HEADERS });
      const sortedPosts = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setPosts(sortedPosts);
    } catch (error) {
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`${API_URL}/${postId}`, { headers: HEADERS });
      setPosts(posts.filter(post => post.postId !== postId));
    } catch (error) {
    }
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPostsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const indexOfLastPost = currentPage * postsPerPage + postsPerPage;
  const indexOfFirstPost = currentPage * postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <ThemeProvider theme={theme1}>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>방명록 관리</Typography>
        <br></br>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {['ID', '작성자', '날짜', '설명', '삭제'].map(header => (
                  <TableCell key={header} sx={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold' }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {currentPosts.map((post) => (
                <TableRow key={post.postId}>
                  <TableCell>{post.postId}</TableCell>
                  <TableCell>{post.postAuthor}</TableCell>
                  <TableCell>{post.postDate}</TableCell>
                  <TableCell>{post.postDescription}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="error" onClick={() => handleDeletePost(post.postId)}>
                      삭제
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[9, 25, 100]}
          component="div"
          count={posts.length}
          rowsPerPage={postsPerPage}
          page={currentPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </ThemeProvider>
  );
};

export default AdminBoard;
