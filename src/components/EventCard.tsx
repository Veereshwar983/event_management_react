import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  Drawer,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import axios from "axios";
import { APIDirectory } from "../rest";

interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  description: string;
}

interface Props {
  events: Event[];
  onSubmitSuccess: () => void;
}

const EventCard: React.FC<Props> = ({ events, onSubmitSuccess }) => {
  const userData = useSelector((state) => state?.user?.userData);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const handleCardClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formData.userId = userData?._id;
    formData.eventId = selectedEvent?._id;
    const url = APIDirectory.saveEventRegistration();
    await axios
      .post(url, formData)
      .then((res) => {
        handleCloseDrawer();
        onSubmitSuccess();
      })
      .catch((err) => console.log("eerrr", err));
  };

  console.log("userData--", userData);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  console.log("selectedEventselectedEvent", selectedEvent);

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        {" "}
        {events.length > 0 &&
          events?.map((event) => (
            <Card
              style={{
                marginBottom: 20,
                borderRadius: 10,
                borderColor: "#e0e0e0",
                borderWidth: 2,
                zIndex: 1,
                borderStyle: "solid",
              }}
              onClick={() => handleCardClick(event)}
            >
              <CardContent>
                <div
                  style={{
                    justifyContent: "space-between",
                    display: "flex",
                  }}
                >
                  <Typography variant="h5" component="div">
                    {event.title}
                  </Typography>
                </div>

                <Typography color="textSecondary" gutterBottom>
                  Date: {event.date}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Time: {event.time}
                </Typography>
                <Typography variant="body2" component="p">
                  Description: {event.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
      </Grid>
      {selectedEvent && (
        <Grid item xs={6}>
          <Card
            style={{
              marginBottom: 20,
              borderRadius: 10,
              borderColor: "#e0e0e0",
              borderWidth: 2,
              zIndex: 1,
              borderStyle: "solid",
            }}
          >
            <CardContent>
              <div style={{ justifyContent: "space-between", display: "flex" }}>
                <Typography variant="h5" component="div">
                  {selectedEvent?.title}
                </Typography>
                <IconButton aria-label="edit">
                  <EditIcon />
                </IconButton>
              </div>

              <Typography color="textSecondary" gutterBottom>
                Date: {selectedEvent?.date}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Time: {selectedEvent?.time}
              </Typography>
              <Typography variant="body2" component="p">
                Description: {selectedEvent?.description}
              </Typography>
            </CardContent>
            {userData?.role !== "organizer" && (
              <Button
                variant="contained"
                style={{ marginLeft: "20px", marginBottom: "20px" }}
                onClick={handleOpenDrawer}
                disabled={selectedEvent?.attendees?.includes(userData?._id)}
              >
                Register
              </Button>
            )}
          </Card>
        </Grid>
      )}

      <Drawer anchor="right" open={openDrawer} onClose={handleCloseDrawer}>
        {/* Content of the drawer */}
        <div style={{ width: 400 }}>
          <Typography variant="h6" style={{ margin: "20px 10px" }}>
            Event Registration
          </Typography>
          {/* Add your event registration form here */}
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "32px",
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            <TextField
              label="First Name"
              name="firstName"
              value={formData?.firstName}
              onChange={handleChange}
              required
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formData?.lastName}
              onChange={handleChange}
              required
            />
            <TextField
              label="Phone number"
              name="phoneNumber"
              value={formData?.phoneNumber}
              onChange={handleChange}
              required
            />
            <Button
              type="submit"
              variant="contained"
              style={{ marginTop: "20px", marginLeft: "10px" }}
            >
              Submit
            </Button>
          </form>
        </div>
      </Drawer>
    </Grid>
  );
};

export default EventCard;
