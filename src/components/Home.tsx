import { Button, Drawer, Grid, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import EventCreationForm from "./EventCreationForm";
import EventCard from "./EventCard";
import axios from "axios";
import { useSelector } from "react-redux";
import Tab from "@mui/material/Tab";
import { APIDirectory } from "../rest";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [value, setValue] = useState(0);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [unRegisteredEvents, setUnRegisteredEvents] = useState([]);

  const userData = useSelector((state) => state?.user?.userData);
  const handleOpenDrawer = () => {
    setOpen(true);
  };
  const handleCloseDrawer = () => {
    setOpen(false);
  };

  const fetchEvents = async () => {
    try {
      const url =
        userData?.role !== "organizer"
          ? APIDirectory.getEvents()
          : APIDirectory.getOrganizerEvents(userData._id);
      const response = await axios.get(url);
      console.log("response--", response.data);
      const today = new Date();
      setEvents(response.data);
      if (userData?.role !== "organizer") {
        const registeredData = response?.data?.filter((item) =>
          item.attendees.includes(userData?._id)
        );

        const unregisterData = response?.data?.filter((item) => {
          const eventDate = new Date(item.date);
          return eventDate >= today && !item.attendees.includes(userData?._id);
        });
        setRegisteredEvents(registeredData);
        setUnRegisteredEvents(unregisterData);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    +fetchEvents();
  }, [userData._id]);

  const handleOnSubmitSuccess = () => {
    handleCloseDrawer();
    fetchEvents();
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  console.log("valuevalue", value);

  return (
    <>
      <Grid container spacing={3} direction="column">
        <Grid item container justifyContent="space-between" alignItems="center">
          {userData?.role !== "organizer" && (
            <Grid item>
              <Tabs value={value} onChange={handleChange}>
                <Tab label="Upcoming Events" />
                <Tab label="Registered Events" />
              </Tabs>
            </Grid>
          )}
          {userData?.role === "organizer" && (
            <Grid item>
              <Button variant="contained" onClick={handleOpenDrawer}>
                Add Event
              </Button>
            </Grid>
          )}
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

            <EventCreationForm onSubmitSuccess={handleOnSubmitSuccess} />
          </div>
        </Drawer>
        {userData?.role === "organizer" && (
          <Grid item>
            <EventCard
              events={events}
              onSubmitSuccess={handleOnSubmitSuccess}
            />
          </Grid>
        )}
        {userData?.role !== "organizer" && value === 0 && (
          <Grid item>
            <EventCard
              events={unRegisteredEvents}
              onSubmitSuccess={handleOnSubmitSuccess}
            />
          </Grid>
        )}
        {value === 1 && (
          <Grid item>
            <EventCard
              events={registeredEvents}
              onSubmitSuccess={handleOnSubmitSuccess}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Home;
