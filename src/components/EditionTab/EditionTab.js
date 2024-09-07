import { Tab, Tabs } from "@mui/material";
import { useState } from "react";

export function EditionTab({ start, end, onChange }) {
  const [tab, setTab] = useState(start);

  function handleOnTabsChange(_event, selectedTab) {
    setTab(selectedTab);
    onChange(selectedTab);
  }

  return (
    <Tabs value={tab} onChange={handleOnTabsChange} variant="fullWidth">
      <Tab label="Sábado" value={start} />
      <Tab label="Domingo" value={end} />
    </Tabs>
  );
}
