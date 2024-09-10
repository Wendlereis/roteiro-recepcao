import { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { Fab } from "@mui/material";
import { AddRounded } from "@mui/icons-material";

import { trpc } from "../ultis/trpc";

import { Menu } from "../components/Menu/Menu";
import { EditionTab } from "../components/EditionTab/EditionTab";
import { Calendar } from "../components/Calendar/Calendar";

import { usePermission } from "../hook/usePermission";

export default function Schedule() {
  const { push } = useRouter();
  const { isAdmin } = usePermission();

  const { data } = trpc.event.get.useQuery();

  const [calendarDate, setCalendarDate] = useState();

  function handleOnEditionTabChange(tab) {
    setCalendarDate(new Date(tab));
  }

  function handleOnSelectEvent(event) {
    if (!isAdmin) {
      return;
    }

    push(`/${event.id}/edit`);
  }

  useEffect(() => {
    if (!calendarDate && data) {
      setCalendarDate(data.edition.startDate);
    }
  }, [calendarDate, data]);

  if (!data) {
    return "loading...";
  }

  return (
    <div>
      <Menu label={data.edition.name} />

      <EditionTab
        start={data.edition.startDate.toISOString()}
        end={data.edition.endDate.toISOString()}
        onChange={handleOnEditionTabChange}
      />

      {calendarDate && (
        <Calendar
          day={calendarDate}
          events={data.events}
          onSelectEvent={handleOnSelectEvent}
        />
      )}

      {isAdmin && (
        <Link href="/create">
          <Fab
            component="a"
            sx={{ position: "fixed", bottom: 16, right: 16 }}
            color="secondary"
          >
            <AddRounded />
          </Fab>
        </Link>
      )}
    </div>
  );
}
