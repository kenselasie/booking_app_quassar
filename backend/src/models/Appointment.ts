import {
  Model, Schema, model
} from 'mongoose';

export interface IAppointment {
  id: string;
  start_date: string;
  end_date: string;
  text: string;
  type: number;
}

interface IAppointmentModel extends Model<IAppointment> { }

const schema = new Schema<IAppointment>({
  id: {type: String, required: true, unique: true},
  start_date: { type: String, index: true, required: true },
  end_date: { type: String, index: true, required: true },
  text: { type: String, index: true, required: true },
  type: { type: Number, index: true },
});


const Appointment: IAppointmentModel = model<IAppointment, IAppointmentModel>('Appointment', schema);

export default Appointment;
