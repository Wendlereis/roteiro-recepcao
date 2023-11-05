import * as repository from "../repository/EventRepository";
import * as service from "../service/EventService";

export async function edit(req, res) {
  const { endDate, minutes } = req.body;

  try {
    const events = await repository.findByStartDate(endDate);

    const updatedEvents = service.updateEventsDuration(events, minutes);

    for (let index = 0; index < updatedEvents.length; index++) {
      const event = updatedEvents[index];

      await repository.edit(event);
    }

    res.send();
  } catch (e) {
    console.error(e);
  }
}
