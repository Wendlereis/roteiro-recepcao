import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { trpc } from "../../../ultis/trpc";

import { Menu } from "../../../components/Menu/Menu";
import { EditionTab } from "../../../components/EditionTab/EditionTab";
import { Calendar } from "../../../components/Calendar/Calendar";

export default function EditionDetails() {
  const router = useRouter();

  const { data } = trpc.event.getByEditionId.useQuery(String(router.query.slug));

  const [calendarDate, setCalendarDate] = useState();

  function handleOnEditionTabChange(tab) {
    setCalendarDate(new Date(tab));
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

      {calendarDate && <Calendar day={calendarDate} events={data.events} />}
    </div>
  );
}
