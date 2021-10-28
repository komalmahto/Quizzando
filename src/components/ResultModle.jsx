import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

function ResultModle({ result }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button className='submmit' variant='outlined' onClick={handleClickOpen}>
        Show Result
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {'Your result of tthe quiz is  '}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <p>Correct Answered : {result.payload.countCorrect}</p>
            <p>Total Question : {result.payload.maxQuestions}</p>
            <p>Your Score : {result.payload.score}</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ResultModle;
