import { Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function Alogin() {
        return (
                <div className="bg2">
                        <Container sx={{ maxWidth: { xl: 'md', lg: 'md', md: 'sm', sm: 'sm' ,xs:'sm' },width:{lg:'530px',md:'500px',sm:'480px',xs:'300px'} }}>
                                <Paper className="login">
                                        <form className="form1">
                                                <Typography variant="h4">Login For Admin</Typography><br />
                                                <TextField label="enter username" sx={{ width: { lg: '60%', md: '80%', sm: '80%', xs: '100%' } }} size="small" /><br />
                                                <TextField label="enter password" sx={{ width: { lg: '60%', md: '80%', sm: '80%', xs: '100%' } }} size="small" /><br />
                                                <Button className="btn" color="success" variant="outlined" sx={{ width: { lg: '60%', md: '80%', sm: '80%', xs: '100%' } }}>Login</Button>
                                        </form>
                                </Paper>
                        </Container>
                </div>
        )
}
