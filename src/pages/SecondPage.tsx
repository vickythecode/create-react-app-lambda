
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import DepartmentList from '../components/DepartmentList';


interface Post {
  id: number;
  title: string;
  body: string;
}

const SecondPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    console.log(localStorage.length)
    if (!user) {
      navigate('/');
    } else {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => setPosts(data));
    }
  }, [navigate]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 150, flex: 1 },
    { field: 'body', headerName: 'Body', width: 150, flex: 1 }
  ];

  return (
    <>
      <Box sx={{ height: 400, width: '100%', mt: 5 }}>
        <Typography variant="h4" mb={3}>Posts</Typography>
        <DataGrid rows={posts} columns={columns} />
      </Box>
      <div style={{margin:"50px"}}></div>
      <DepartmentList/>
    </>
  );
};

export default SecondPage;
