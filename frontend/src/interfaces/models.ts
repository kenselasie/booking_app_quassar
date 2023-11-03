export interface WindowObject extends Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  scheduler: any;
}
export interface ICalenderData {
  end_date: string;
  id: string;
  start_date: string;
  text: string;
}

export interface ICalenderData {
  end_date: string;
  id: string;
  start_date: string;
  text: string;
}

export interface IAPIError { data?: { error?: string } };
