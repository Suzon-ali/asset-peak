import React, { useState, useEffect } from 'react';

const CalendarEvents = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [today, setToday] = useState(new Date());

  useEffect(() => {
    setCurrentDate(new Date());
    setToday(new Date());
  }, []);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const renderDays = () => {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<td className="border p-1 h-20 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10" key={`empty-${i}`} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        today.getDate() === day &&
        today.getMonth() === currentDate.getMonth() &&
        today.getFullYear() === currentDate.getFullYear();
      
      days.push(
        <td
          className={`border p-1 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300 ${isToday ? 'bg-indigo-200' : ''}`}
          key={day}
        >
          <div className="flex flex-col  mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
            <div className="top h-5 w-full">
              <span className="text-gray-500">{day}</span>
            </div>
            <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
          </div>
        </td>
      );
    }

    return days;
  };

  const renderWeeks = () => {
    const days = renderDays();
    const weeks = [];
    let daysInWeek = [];

    days.forEach((day, index) => {
      daysInWeek.push(day);

      if ((index + 1) % 7 === 0 || index === days.length - 1) {
        weeks.push(<tr className="text-center h-20" key={`week-${index / 7}`}>{daysInWeek}</tr>);
        daysInWeek = [];
      }
    });

    return weeks;
  };

  return (
    <div className="container mx-auto my-10">
      <div className="wrapper bg-white rounded shadow w-full ">
        <div className="header flex justify-between border-b p-2">
          <span className="text-lg font-bold">
            {currentDate.toLocaleString('default', { year: 'numeric', month: 'long' })}
          </span>
          <div className="buttons">
            <button className="p-1" onClick={handlePrevMonth}>
              <svg width="1em" fill="gray" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-left-circle"  xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path fillRule="evenodd" d="M8.354 11.354a.5.5 0 0 0 0-.708L5.707 8l2.647-2.646a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708 0z" />
                <path fillRule="evenodd" d="M11.5 8a.5.5 0 0 0-.5-.5H6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5z" />
              </svg>
            </button>
            <button className="p-1" onClick={handleNextMonth}>
              <svg width="1em" fill="gray" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-right-circle"  xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path fillRule="evenodd" d="M7.646 11.354a.5.5 0 0 1 0-.708L10.293 8 7.646 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0z" />
                <path fillRule="evenodd" d="M4.5 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z" />
              </svg>
            </button>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
                <th key={index} className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                  <span className="xl:block lg:block md:block sm:block hidden">{day}</span>
                  <span className="xl:hidden lg:hidden md:hidden sm:hidden block">{day.slice(0, 3)}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {renderWeeks()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CalendarEvents;
