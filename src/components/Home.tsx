import { Button, Drawer, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import EventCreationForm from "./EventCreationForm";
import EventCard from "./EventCard";
import axios from "axios";
import { useSelector } from "react-redux";


const Home = () => {
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);

  const userData = useSelector((state) => state?.user?.userData);
  const handleOpenDrawer = () => {
    setOpen(true);
  };
  const handleCloseDrawer = () => {
    setOpen(false);
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`http://localhost:3004/events`);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [userData._id]);

  const handleOnSubmitSuccess = () => {
    handleCloseDrawer();
    fetchEvents();
  }

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
          { userData?.role === "organizer" &&
          <Button variant="contained" onClick={handleOpenDrawer}>
            Add Event
          </Button>}
        </Grid>
        <Drawer anchor="right" open={open} onClose={handleCloseDrawer}>
          {/* Drawer content */}
          <div style={{ width: 500 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "5px",
                marginLeft: "10px",
              }}
            >
              <Typography variant="h5" style={{ marginBottom: 20 }}>
                Add Event
              </Typography>
              <Button onClick={handleCloseDrawer}>Close</Button>
            </div>

            <EventCreationForm onSubmitSuccess = {handleOnSubmitSuccess} />
          </div>
        </Drawer>
        <Grid item>
          <EventCard events={events} onSubmitSuccess = {handleOnSubmitSuccess}/>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
