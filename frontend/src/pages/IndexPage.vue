<template>
  <div id="scheduler_here" class="dhx_cal_container" style="height: 100vh">
    <div class="dhx_cal_navline">
      <div class="dhx_cal_prev_button"></div>
      <div class="dhx_cal_next_button"></div>
      <div class="dhx_cal_today_button"></div>
      <div class="dhx_cal_date"></div>
      <div class="dhx_cal_tab" data-tab="day"></div>
      <div class="dhx_cal_tab" data-tab="week"></div>
      <div class="dhx_cal_tab" data-tab="month"></div>
    </div>
    <div class="dhx_cal_header"></div>
    <div class="dhx_cal_data"></div>
  </div>
</template>

<script lang="ts" setup>
import { IAPIError, ICalenderData, WindowObject } from '../interfaces/models';
import {
  addAppointment,
  updateAppointment,
  deleteAppointment,
} from '../services/appointmentAPI';
import {errorNotify, successNotify} from '../lib/notify';
import { onMounted } from 'vue';

const scheduler = (window as unknown as WindowObject).scheduler;
const baseURL = import.meta.env.VITE_API_URL

const createEvent = async (data: ICalenderData) => {
  try {
    const results = await addAppointment(data);
    successNotify('Event successfully created');
    return results
  } catch (err) {
    const error = err as IAPIError;
    errorNotify(error?.data?.error || 'Error creating event');
  }
};

const updateEvent = async (data: ICalenderData, id: ICalenderData['id']) => {
  try {
    await updateAppointment(id, data);
    successNotify('Event successfully updated');
  } catch (err) {
    const error = err as IAPIError;
    errorNotify(error?.data?.error || 'Error updating event');
  }
};

const deleteEvent = async (id: ICalenderData['id']) => {
  try {
    await deleteAppointment(id);
    successNotify('Event successfully deleted');
  } catch (err) {
    const error = err as IAPIError;
    errorNotify(error?.data?.error || 'Error deleting event');
  }
};

const initScheduler = () => {
  scheduler.plugins({
    units: true,
  });

  const sections = scheduler.serverList('type');

  scheduler.locale.labels.section_custom = 'Section';
  scheduler.config.details_on_create = true;
  scheduler.config.details_on_dblclick = true;
  scheduler.config.prevent_cache = true;
  scheduler.config.first_hour = 6;

  scheduler.config.lightbox.sections = [
    {
      name: 'description',
      height: 130,
      map_to: 'text',
      type: 'textarea',
      focus: true,
    },
    {
      name: 'custom',
      height: 23,
      type: 'select',
      options: sections,
      map_to: 'type',
    },
    { name: 'time', height: 72, type: 'time', map_to: 'auto' },
  ];

  scheduler.init('scheduler_here', new Date(2023, 2, 1), 'month');
  scheduler.load(`${baseURL}/appointment`);
  if (!scheduler.$_initOnce) {
    scheduler.$_initOnce = true;
    scheduler.createDataProcessor({
      event: {
        create: async (data: ICalenderData) => {
          await createEvent(data);
          scheduler.load(`${baseURL}/appointment`);
          scheduler.deleteEvent(data.id);
        },
        update: async (data: ICalenderData, id: ICalenderData['id']) => {
          await updateEvent(data, id);
          scheduler.load(`${baseURL}/appointment`);
        },
        delete: async (id: ICalenderData['id']) => {
          await deleteEvent(id);
          scheduler.load(`${baseURL}/appointment`);
        },
      },
    });
  }
};
onMounted(() => {
  initScheduler();
});
</script>
