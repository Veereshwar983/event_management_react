import { Button, Drawer, Grid, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import EventCreationForm from "./events/EventCreationForm";
import EventCard from "./events/EventCard";
import axios from "axios";
import { useSelector } from "react-redux";
import Tab from "@mui/material/Tab";
import { APIDirectory } from "../rest";
import useDebounce from "./util/useDebounce";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [value, setValue] = useState(0);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [unRegisteredEvents, setUnRegisteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 300);

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
    const fetchSearchedEvents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3005/events/search?query=${debouncedQuery}`
        );
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    if (debouncedQuery) {
      fetchSearchedEvents();
    } else {
      fetchEvents(); // Clear events if query is empty
    }
  }, [debouncedQuery]);

  useEffect(() => {
    fetchEvents();
  }, [userData._id]);

  const handleOnSubmitSuccess = () => {
    handleCloseDrawer();
    fetchEvents();
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Grid container spacing={3} direction="column" overflow="hidden">
        <Grid item container justifyContent="space-between" alignItems="center">
          {userData?.role !== "organizer" && (
            <Grid
              item
              position="fixed"
              style={{ marginTop: "30px", backgroundColor: "white" }}
            >
              <Tabs value={value} onChange={handleChange}>
                <Tab label="Upcoming Events" />
                <Tab label="Registered Events" />
              </Tabs>
            </Grid>
          )}
          {userData?.role === "organizer" && (
            <input
              type="text"
              placeholder="Search by event title"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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
          <Grid item style={{ marginTop: "20px" }}>
            <EventCard
              events={events}
              onSubmitSuccess={handleOnSubmitSuccess}
            />
          </Grid>
        )}
        {userData?.role !== "organizer" && value === 0 && (
          <Grid item style={{ marginTop: "20px" }}>
            <EventCard
              events={unRegisteredEvents}
              onSubmitSuccess={handleOnSubmitSuccess}
            />
          </Grid>
        )}
        {value === 1 && (
          <Grid item style={{ marginTop: "20px" }}>
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
