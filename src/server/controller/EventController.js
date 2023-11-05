import * as repository from "../repository/EventRepository";

export async function index(_, res) {
  try {
    const eventos = await repository.list();

    res.json(eventos);
  } catch (e) {
    console.error(e);
    res.status(500);
  }
}

export async function add(req, res) {
  const event = req.body;

  try {
    await repository.add(event);

    res.send();
  } catch (e) {
    console.error(e);
    res.status(500);
  }
}

export async function edit(req, res) {
  const { id } = req.query;

  const event = req.body;

  try {
    await repository.edit({ ...event, _id: id });

    res.send();
  } catch (e) {
    console.error(e);
    res.status(500);
  }
}

export async function destroy(req, res) {
  const { id } = req.query;

  try {
    await repository.destroy(id);

    res.send();
  } catch (e) {
    console.error(e);
    res.status(500);
  }
}

export async function getById(req, res) {
  const { id } = req.query;

  try {
    const event = await repository.findById(id);

    res.json(event);
  } catch (e) {
    console.error(e);
    res.status(500);
  }
}
