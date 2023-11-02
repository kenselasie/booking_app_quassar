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
import { ICalenderData } from './models';
import {
  addAppointment,
  updateAppointment,
  deleteAppointment,
} from '../services/appointmentAPI';
import { Notify } from 'quasar';
import { onMounted } from 'vue';

const scheduler = (window as any).scheduler;

const createEvent = async (data: ICalenderData) => {
  try {
    const result = await addAppointment(data);
    Notify.create({
      message: 'Event successfully created',
      position: 'top-right',
      color: 'green',
    });
    console.log(result);
  } catch (err: any) {
    console.error(err);
    Notify.create({
      message: err?.data?.error || 'Error creating event',
      position: 'top-right',
      color: 'red',
    });
  }
};

const updateEvent = async (data: ICalenderData, id: ICalenderData['id']) => {
  try {
    await updateAppointment(id, data);
    Notify.create({
      message: 'Event successfully updated',
      position: 'top-right',
      color: 'green',
    });
  } catch (err: any) {
    Notify.create({
      message: err?.data?.error || 'Error updating event',
      position: 'top-right',
      color: 'red',
    });
  }
};

const deleteEvent = async (id: ICalenderData['id']) => {
  try {
    await deleteAppointment(id);
    Notify.create({
      message: 'Event successfully deleted',
      position: 'top-right',
      color: 'green',
    });
  } catch (err: any) {
    console.error(err);
    Notify.create({
      message: err?.data?.error || 'Error deleting event',
      position: 'top-right',
      color: 'red',
    });
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
  scheduler.load(`${import.meta.env.VITE_API_URL}/appointment`);
  if (!scheduler.$_initOnce) {
    scheduler.$_initOnce = true;
    scheduler.createDataProcessor({
      event: {
        create: (data: ICalenderData) => {
          return createEvent(data);
        },
        update: (data: ICalenderData, id: ICalenderData['id']) => {
          updateEvent(data, id);
        },
        delete: (id: ICalenderData['id']) => {
          deleteEvent(id);
        },
      },
    });
  }
};
onMounted(() => {
  initScheduler();
});
</script>
