import { Button, Drawer, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EventCreationForm from "./EventCreationForm";

const Home = () => {
  const userData = useSelector((state) => state?.user?.userData);
  const [open, setOpen] = useState(false);
  console.log("userData--", userData);
  const handleOpenDrawer = () => {
    setOpen(true);
  };
  const handleCloseDrawer = () => {
    setOpen(false);
  };
  return (
    <>
      <Grid container spacing={3} direction="column">
        <Grid
          item
          xs
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <Button variant="contained" onClick={handleOpenDrawer}>
            Add Event
          </Button>
        </Grid>
        <Drawer anchor="right" open={open} onClose={handleCloseDrawer}>
          {/* Drawer content */}
          <div style={{ width: 500 }}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop:'5px',marginLeft:'10px' }}>
              <Typography variant="h5" style={{ marginBottom: 20 }}>
                Add Event
              </Typography>
              <Button onClick={handleCloseDrawer}>Close</Button>
            </div>

            <EventCreationForm />
          </div>
        </Drawer>
        <Grid item>
          pecifically : discourse intended to give a mental image of something
          experienced beautiful beyond description gave an accurate description
          of what he saw b : a statement or account giving the characteristics
          of someone or something : a descriptive statement or account The
          review was little more than a description of the film's plot. 2 : kind
          or character especially as determined by salient (see SALIENT entry 1
          sense 3b) features pecifically : discourse intended to give a mental
          image of something experienced beautiful beyond description gave an
          accurate description of what he saw b : a statement or account giving
          the characteristics of someone or something : a descriptive statement
          or account The review was little more than a description of the film's
          plot. 2 : kind or character especially as determined by salient (see
          SALIENT entry 1 sense 3b) features pecifically : discourse intended to
          give a mental image of something experienced beautiful beyond
          description gave an accurate description of what he saw b : a
          statement or account giving the characteristics of someone or
          something : a descriptive statement or account The review was little
          more than a description of the film's plot. 2 : kind or character
          especially as determined by salient (see SALIENT entry 1 sense 3b)
          features pecifically : discourse intended to give a mental image of
          something experienced beautiful beyond description gave an accurate
          description of what he saw b : a statement or account giving the
          characteristics of someone or something : a descriptive statement or
          account The review was little more than a description of the film's
          plot. 2 : kind or character especially as determined by salient (see
          SALIENT entry 1 sense 3b) features
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
