import { Request, RequestHandler } from "express";
import Appointment from "../../models/Appointment";

interface AddReqBody {
  start_date: string;
  end_date: string;
  text: string;
  type: number;
}

const add: RequestHandler = async (req: Request<{}, {}, AddReqBody>, res) => {
  const { start_date, end_date, text, type } = req.body;

  const appointment = new Appointment({ start_date, end_date, text, type });
  appointment.id = appointment._id;
  await appointment.save();

  return res.json(appointment);
};

const getAll: RequestHandler = async (req, res) => {
  const appointments = await Appointment.find();
  res.json({ data: appointments });
};

const remove: RequestHandler = async (req: Request, res) => {
  const { id } = req.params;

  const appointment = await Appointment.findById(id);
  if (!appointment) {
    return res.status(404).json({
      error: "Appointment not found",
    });
  }

  await Appointment.deleteOne({ _id: id });
  return res.status(204).json();
};

const getOne: RequestHandler = async (req: Request, res) => {
  const { id } = req.params;
  const appointment = await Appointment.findById(id);
  if (!appointment) {
    return res.status(404).json({
      error: "Appointment not found",
    });
  }

  return res.status(200).json({ data: appointment });
};

const update: RequestHandler = async (req: Request, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({
        error: "Appointment not found",
      });
    }
  } catch (err) {
    return res.status(404).json({
      error: "Appointment not found",
    });
  }
  const result = await Appointment.findOneAndUpdate({ _id: id }, body, {
    returnDocument: "after",
  });
  return res.status(200).json({ data: result });
};

export default { add, getAll, getOne, remove, update };
