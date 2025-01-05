import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import attendanceService from "../../Services/Faculty/attendanceService";

const MonthCalendar = ({ month, year, attendanceDates }) => {
  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = Array(firstDay).fill(null);
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const isAbsent = (day) => {
    if (!day) return false;
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    return attendanceDates.includes(dateStr);
  };

  const isWeekend = (index, day) => {
    if (day === null) return false;
    const dayOfWeek = (firstDay + index) % 7;
    return dayOfWeek === 0 || dayOfWeek === 6;
  };

  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fs-5 mb-0">
          {monthNames[month]} {year}
        </h3>
      </div>
      <div className="calendar-grid">
        {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
          <div key={day} className="calendar-header fw-bold">
            {day}
          </div>
        ))}
        {days.map((day, index) => (
          <div
            key={index}
            className={`
              calendar-day
              ${day === null ? "bg-light" : ""}
              ${isWeekend(index, day) ? "weekend" : ""}
              ${isAbsent(day) ? "absent" : ""}
              ${
                day === new Date().getDate() &&
                month === new Date().getMonth() &&
                year === new Date().getFullYear()
                  ? "today"
                  : ""
              }
            `}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

const AttendanceReport = () => {
  const { StudentID } = useParams();
  const [attendanceDates, setAttendanceDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [stats, setStats] = useState({
    totalDays: 0,
    absentDays: 0,
    attendancePercentage: 0,
    consecutivePresent: 0,
    monthlyTrend: [],
  });

  const getAcademicYearDates = () => {
    const academicStartDate = new Date(2024, 5, 1);
    const academicEndDate = new Date(2025, 4, 31);
    return { academicStartDate, academicEndDate };
  };

  const calculateWorkingDays = (startDate, endDate) => {
    let count = 0;
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) count++;
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return count;
  };

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true);
        const response = await attendanceService.getAttendanceByStudentId(
          StudentID
        );

        if (response?.data) {
          const absentDates = response.data
            .filter((record) => record.Attendance === 0)
            .map((record) => record.Date);

          setAttendanceDates(absentDates);

          const { academicStartDate, academicEndDate } = getAcademicYearDates();
          const workingDays = calculateWorkingDays(
            academicStartDate,
            academicEndDate
          );
          const attendanceRate =
            ((workingDays - absentDates.length) / workingDays) * 100;

          // Calculate consecutive present days
          const sortedDates = absentDates.sort();
          let consecutiveDays = 0;
          const today = new Date();
          let currentDate = new Date();
          while (
            !sortedDates.includes(currentDate.toISOString().split("T")[0])
          ) {
            if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
              consecutiveDays++;
            }
            currentDate.setDate(currentDate.getDate() - 1);
            if (consecutiveDays > 30) break; // Limit to last 30 days
          }

          setStats({
            totalDays: workingDays,
            absentDays: absentDates.length,
            attendancePercentage: attendanceRate.toFixed(1),
            consecutivePresent: consecutiveDays,
            monthlyTrend: calculateMonthlyTrend(response.data),
          });
        } else {
          throw new Error("No data received");
        }
      } catch (error) {
        setError(
          error.response?.data?.message || "Failed to fetch attendance data"
        );
      } finally {
        setLoading(false);
      }
    };

    if (StudentID) fetchAttendance();
  }, [StudentID]);

  const calculateMonthlyTrend = (data) => {
    // Group absences by month and calculate attendance rate
    const monthlyData = {};
    data.forEach((record) => {
      const month = new Date(record.Date).getMonth();
      if (!monthlyData[month]) monthlyData[month] = { total: 0, absent: 0 };
      monthlyData[month].total++;
      if (record.Attendance === 0) monthlyData[month].absent++;
    });
    return Object.entries(monthlyData).map(([month, data]) => ({
      month: new Date(2024, parseInt(month)).toLocaleString("default", {
        month: "short",
      }),
      rate: (((data.total - data.absent) / data.total) * 100).toFixed(1),
    }));
  };

  const navigateMonth = (direction) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + direction);
      return newDate;
    });
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-3" role="alert">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        {error}
      </div>
    );
  }

  return (
    <div className="container-fluid  min-vh-100 homepage-wrapper mt-3 mb-3">
      {/* Stats Cards */}
      <div className="row mt-1 g-3 mb-4">
        <div className="col-6">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <i className="bi bi-calendar-check fs-4 text-primary me-2"></i>
                <div>
                  <h6 className="card-subtitle mb-1">Present Rate</h6>
                  <h2 className="card-title mb-0">
                    {stats.attendancePercentage}%
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <i className="bi bi-lightning-charge fs-4 text-warning me-2"></i>
                <div>
                  <h6 className="card-subtitle mb-1">Streak</h6>
                  <h2 className="card-title mb-0">
                    {stats.consecutivePresent} days
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <i className="bi bi-x-circle fs-4 text-danger me-2"></i>
                <div>
                  <h6 className="card-subtitle mb-1">Absences</h6>
                  <h2 className="card-title mb-0">{stats.absentDays}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <i className="bi bi-calendar3 fs-4 text-success me-2"></i>
                <div>
                  <h6 className="card-subtitle mb-1">Total Days</h6>
                  <h2 className="card-title mb-0">{stats.totalDays}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => navigateMonth(-1)}
        >
          <i className="bi bi-chevron-left"></i>
        </button>
        <h5 className="mb-0">Attendance Calendar</h5>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => navigateMonth(1)}
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>

      {/* Calendar */}
      <MonthCalendar
        month={currentDate.getMonth()}
        year={currentDate.getFullYear()}
        attendanceDates={attendanceDates}
      />

      {/* Legend */}
      <div className="d-flex justify-content-around mt-3 mb-4">
        <div className="d-flex align-items-center">
          <div className="calendar-legend absent me-2"></div>
          <small>Absent</small>
        </div>
        <div className="d-flex align-items-center">
          <div className="calendar-legend weekend me-2"></div>
          <small>Weekend</small>
        </div>
        <div className="d-flex align-items-center">
          <div className="calendar-legend today me-2"></div>
          <small>Today</small>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="card border-0 shadow-sm mt-4">
        <div className="card-body">
          <h5 className="card-title mb-3">Monthly Trend</h5>
          <div className="attendance-trend">
            {stats.monthlyTrend.map((month, index) => (
              <div key={index} className="trend-item">
                <div className="progress" style={{ height: "60px" }}>
                  <div
                    className="progress-bar bg-primary"
                    style={{ height: "100%", width: `${month.rate}%` }}
                  ></div>
                </div>
                <small className="mt-1">{month.month}</small>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 1px;
          background-color: #dee2e6;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          overflow: hidden;
        }

        .calendar-header {
          background-color: #f8f9fa;
          padding: 8px;
          text-align: center;
          font-size: 0.875rem;
        }

        .calendar-day {
          background-color: white;
          padding: 8px;
          text-align: center;
          min-height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.875rem;
        }

        .weekend {
          background-color: #f8f9fa;
        }
        .absent {
          background-color: #dc354522;
        }
        .today {
          border: 2px solid #0d6efd;
          font-weight: bold;
        }

        .calendar-legend {
          width: 16px;
          height: 16px;
          border: 1px solid #dee2e6;
          border-radius: 4px;
        }

        .attendance-trend {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          height: 100px;
        }

        .trend-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .progress {
          width: 100%;
          transform: rotate(180deg);
        }

        .trend-item small {
          transform: rotate(-45deg);
          transform-origin: left top;
          white-space: nowrap;
          margin-top: 8px;
        }
      `}</style>
    </div>
  );
};

export default AttendanceReport;
