import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import ReminderList from './components/ReminderList';
import Reminder from './models/reminder';
import reminderService from './services/reminder';
import NewReminder from './components/NewReminder';

// const reminders: Reminder[] = [
//     {id: 1, title: 'Reminder 1'},
//     {id: 2, title: 'Reminder 2'},
//     {id: 3, title: 'Reminder 3'},
// ];

function App() {
  const [reminders, setReminders] = useState<Reminder[]>([
    // {id: 1, title: 'Reminder 1'},
    // {id: 2, title: 'Reminder 2'},
    // {id: 3, title: 'Reminder 3'},
  ]);

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    const reminders = await reminderService.getReminders();
    setReminders(reminders);
  }

  const removeReminder = (id: number) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  }

  const addReminder = async (title: string) => {
    const newReminder = await reminderService.addReminder(title);
    const uniqueReminder = { ...newReminder, id: Date.now() };
    setReminders([uniqueReminder, ...reminders]);
  }

  return (
    <div className="App">
      <NewReminder onAddReminder={addReminder}/>
      <ReminderList items={reminders} onRemoveReminder={removeReminder} />
    </div>
  );
}

export default App;
