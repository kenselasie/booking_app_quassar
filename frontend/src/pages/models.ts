export interface ICalenderData {
  end_date: string;
  id: string;
  start_date: string;
  text: string;
}

export interface ICrudError {
  data: {
    error: string;
  };
}
