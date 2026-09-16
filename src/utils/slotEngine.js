// Dynamic 15-Minute Slot Generation Engine

/**
 * Converts "HH:MM" (24h) string to minutes from midnight
 */
export function timeToMinutes(timeStr) {
  if (!timeStr) return 0;
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
}

/**
 * Converts minutes from midnight to "hh:mm AM/PM"
 */
export function minutesToDisplayTime(totalMinutes) {
  const hours24 = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  const period = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  const formattedMins = mins < 10 ? `0${mins}` : mins;
  return `${hours12}:${formattedMins} ${period}`;
}

/**
 * Generates slots between start and end time for a given interval
 */
function generateWindowSlots(startTimeStr, endTimeStr, intervalMinutes = 15) {
  if (!startTimeStr || !endTimeStr) return [];
  const startMin = timeToMinutes(startTimeStr);
  const endMin = timeToMinutes(endTimeStr);

  const slots = [];
  for (let m = startMin; m < endMin; m += intervalMinutes) {
    // Only add if slot fits within the window
    if (m + intervalMinutes <= endMin) {
      slots.push({
        timeDisplay: minutesToDisplayTime(m),
        minutes: m
      });
    }
  }
  return slots;
}

/**
 * Generates all slots for a doctor based on admin-set morning and optional evening shifts
 */
export function generateDoctorSlots(doctor, bookingsForDoctorOnDate, selectedDateStr) {
  if (!doctor || !doctor.todayAvailable) {
    return [];
  }

  const interval = doctor.slotDurationMinutes || 15;
  let rawSlots = [];

  // Morning / Primary window
  if (doctor.todayStartTime && doctor.todayEndTime) {
    rawSlots = rawSlots.concat(generateWindowSlots(doctor.todayStartTime, doctor.todayEndTime, interval));
  }

  // Evening window if configured
  if (doctor.todayEveningStartTime && doctor.todayEveningEndTime) {
    rawSlots = rawSlots.concat(generateWindowSlots(doctor.todayEveningStartTime, doctor.todayEveningEndTime, interval));
  }

  // Sort slots chronologically
  rawSlots.sort((a, b) => a.minutes - b.minutes);

  // Check if date is today and calculate whether time has passed
  const now = new Date();
  const todayStr = now.toISOString().split("T")[0];
  const isToday = selectedDateStr === todayStr;
  const currentMinutesNow = now.getHours() * 60 + now.getMinutes();

  // Map to slot objects with availability
  return rawSlots.map(slot => {
    // Check if booked
    const existingBooking = bookingsForDoctorOnDate.find(
      b => b.time === slot.timeDisplay && b.status !== "Cancelled"
    );

    const isPast = isToday && (slot.minutes < currentMinutesNow + 5);

    return {
      time: slot.timeDisplay,
      minutes: slot.minutes,
      isAvailable: !existingBooking && !isPast,
      isBooked: !!existingBooking,
      isPast: isPast,
      bookingDetails: existingBooking || null
    };
  });
}

/**
 * Generates diagnostic test slots based on admin-set test window
 */
export function generateTestSlots(test, bookingsForTestOnDate, selectedDateStr, intervalMinutes = 15) {
  if (!test || !test.todayAvailable) {
    return [];
  }

  const rawSlots = generateWindowSlots(test.startTime, test.endTime, intervalMinutes);

  const now = new Date();
  const todayStr = now.toISOString().split("T")[0];
  const isToday = selectedDateStr === todayStr;
  const currentMinutesNow = now.getHours() * 60 + now.getMinutes();

  return rawSlots.map(slot => {
    const existingBooking = bookingsForTestOnDate.find(
      b => b.time === slot.timeDisplay && b.status !== "Cancelled"
    );

    const isPast = isToday && (slot.minutes < currentMinutesNow + 5);

    return {
      time: slot.timeDisplay,
      minutes: slot.minutes,
      isAvailable: !existingBooking && !isPast,
      isBooked: !!existingBooking,
      isPast: isPast,
      bookingDetails: existingBooking || null
    };
  });
}
