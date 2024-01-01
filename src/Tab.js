import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import axios from "axios";

export default function ColorTabs() {
  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const addTable = async () => {
    const table = prompt("Enter Table No");
    try {
      if (table) {
        const result = await axios.post("http://localhost:3002/add-table", {
          table,
        });
        console.log(result);
        window.location.reload();
      } else {
        alert("field required");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTable = async () => {
    let table = prompt("Enter Delete Table No");
    try {
      const data = await axios.delete(
        "http://localhost:3002/single-table-delete",
        { data: { table } }
      );
      console.log(data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="one" label="First floor" />
        <Tab value="two" label="Two floor" />
        <Tab value="three" label="Three floor" />
        <Tab onClick={addTable} value="Add Table" label="Add Table" />
        <Tab onClick={deleteTable} value="Remove Table" label="Remove Table" />
      </Tabs>
    </Box>
  );
}
