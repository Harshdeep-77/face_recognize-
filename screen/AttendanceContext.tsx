import React, { createContext, useState } from 'react';

// 1️⃣ Create a context (shared memory)
export const AttendanceContext = createContext();

// 2️⃣ Create a provider (wrapper to share data)
export const AttendanceProvider = ({ children }) => {
  const [attendanceLogs, setAttendanceLogs] = useState([]);

  // 3️⃣ Function to add new "Present" record
  const markPresent = () => {
    const newLog = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      status: 'Present',
    };
    setAttendanceLogs(prev => [newLog, ...prev]);
  };

  // 4️⃣ Provide data + function to all screens
  return (
    <AttendanceContext.Provider value={{ attendanceLogs, markPresent }}>
      {children}
    </AttendanceContext.Provider>
  );
};
