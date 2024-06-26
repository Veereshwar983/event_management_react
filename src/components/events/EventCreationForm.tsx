import React, { useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import axios from "axios";
import { APIDirectory } from "../../rest";

interface FormData {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  recurring: boolean;
  frequency: string;
  categories: string[];
}

const useStyles = makeStyles({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "32px",
    marginLeft: "10px",
  },
});

const EventCreationForm: React.FC = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    organizer: "",
    recurring: false,
    frequency: "weekly",
    categories: [],
  });
  const classes = useStyles();
  const userData = useSelector((state) => state?.user?.userData);

  const handleChange = (
    e: React.ChangeEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
      | { name?: string; value: unknown; checked?: boolean }
    >
  ) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name!]: val });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formData.organizer = userData?._id;
    const url = APIDirectory.saveEvents();
    await axios
      .post(url, formData)
      .then((res) => {
        console.log("reessss", res);
        onSubmitSuccess();
      })
      .catch((err) => console.log("eerrr", err));
  };

  return (
    <form onSubmit={handleSubmit} className={classes.formContainer}>
      <TextField
        label="Event Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        multiline
      />
      <TextField
        // label="Date"
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
        inputProps={{ min: new Date().toISOString().split("T")[0] }}
      />
      <TextField
        label="Time"
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
      />
      <TextField
        label="Location"
        name="location"
        value={formData.location}
        onChange={handleChange}
      />
      <FormControl>
        <div>
          <Checkbox
            name="recurring"
            checked={formData.recurring}
            onChange={handleChange}
          />
          <FormLabel>Recurring Event:</FormLabel>
        </div>

        {formData.recurring && (
          <Select
            label="Recurring Frequency"
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
          </Select>
        )}
      </FormControl>

      <Button type="submit" variant="contained">
        Submit
      </Button>
    </form>
  );
};

export default EventCreationForm;
