import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { useQuery } from "@tanstack/react-query";

import { getEvents } from "../../../api/event";
import { trpc } from "../../../ultis/trpc";

import { Menu } from "../../../components/Menu/Menu";
import { EditionTab } from "../../../components/EditionTab/EditionTab";
import { Calendar } from "../../../components/Calendar/Calendar";

export default function EditionDetails() {
  const router = useRouter();

  const { data: getEventsResponse } = useQuery(["events"], getEvents);

  const edition = trpc.edition.getById.useQuery(String(router.query.slug));

  const [calendarDate, setCalendarDate] = useState();

  function handleOnEditionTabChange(tab) {
    setCalendarDate(new Date(tab));
  }

  useEffect(() => {
    if (edition.data) {
      setCalendarDate(edition.data.startDate);
    }
  }, [edition.data]);

  if (!edition.data) {
    return "loading...";
  }

  const events = getEventsResponse?.data.map((event) => ({
    id: event._id,
    title: event.title,
    start: new Date(event.startDate),
    end: new Date(event.endDate),
    color: event.color,
  }));

  return (
    <div>
      <Menu label={edition.data.name} />

      <EditionTab
        start={edition.data.startDate.toISOString()}
        end={edition.data.endDate.toISOString()}
        onChange={handleOnEditionTabChange}
      />

      {events && <Calendar day={calendarDate} events={events} />}
    </div>
  );
}
