import { CurrentTimeIndicator, EditingState, ViewState } from '@devexpress/dx-react-scheduler';

import {
  Scheduler,
  DayView,
  Appointments,

} from '@devexpress/dx-react-scheduler-material-ui';

const currentDate = '2022-09-25';

const schedulerData = [
  { startDate: '2022-09-25T09:45', endDate: '2022-09-25T11:00', title: 'Meeting' },
  { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
];

export default function Home() {
  
  return (
  <div> 
    <h1>nome do encontro</h1>
    <p>data</p>
    <button type="button">novo</button>
   
    <Scheduler data={schedulerData}>
      

      <DayView startDayHour={9} endDayHour={20} />
      
      <Appointments />
      <EditingState
              onCommitChanges={()=>{}}
            />
      <CurrentTimeIndicator updateInterval={10000} shadePreviousAppointments shadePreviousCells />
    </Scheduler>
  </div>  
  )
}
