import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function VitaminReminderApp() {
  const [pillName, setPillName] = useState("");
  const [frequency, setFrequency] = useState(1);
  const [days, setDays] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [takenLog, setTakenLog] = useState({});

  useEffect(() => {
    if (pillName && frequency && days && startDate) {
      const newSchedule = [];
      const start = new Date(startDate);
      for (let d = 0; d < days; d++) {
        const date = new Date(start);
        date.setDate(start.getDate() + d);
        for (let f = 1; f <= frequency; f++) {
          newSchedule.push({
            id: `${date.toDateString()}-${f}`,
            date: date.toDateString(),
            dose: f,
            taken: false,
            pill: pillName
          });
        }
      }
      setSchedule(newSchedule);
      setTakenLog({});
    }
  }, [pillName, frequency, days, startDate]);

  const handleTaken = (id, pill, date, dose) => {
    setTakenLog((prev) => ({
      ...prev,
      [id]: {
        taken: true,
        pill,
        date,
        dose,
        timestamp: new Date().toLocaleString()
      }
    }));
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl mb-4 font-bold text-center">Vitamin Reminder</h1>
      <Card className="mb-4">
        <CardContent className="p-4 space-y-2">
          <input
            className="w-full border p-2 rounded"
            placeholder="Pill Name"
            value={pillName}
            onChange={(e) => setPillName(e.target.value)}
          />
          <input
            type="number"
            className="w-full border p-2 rounded"
            placeholder="Times per Day"
            value={frequency}
            min="1"
            onChange={(e) => setFrequency(e.target.value)}
          />
          <input
            type="number"
            className="w-full border p-2 rounded"
            placeholder="Number of Days"
            value={days}
            min="1"
            onChange={(e) => setDays(e.target.value)}
          />
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </CardContent>
      </Card>

      {schedule.length > 0 && (
        <div className="space-y-4">
          {schedule.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p>
                    {item.pill} - {item.date} (Dose {item.dose})
                  </p>
                  <p>
                    Status: {takenLog[item.id]?.taken ? "✅ Taken" : "❌ Pending"}
                  </p>
                  {takenLog[item.id] && (
                    <p className="text-xs text-gray-500">
                      Taken at: {takenLog[item.id].timestamp}
                    </p>
                  )}
                </div>
                <Button
                  className="rounded-full h-16 w-16 text-lg"
                  disabled={takenLog[item.id]?.taken}
                  onClick={() => handleTaken(item.id, item.pill, item.date, item.dose)}
                >
                  {takenLog[item.id]?.taken ? "Done" : "Taken"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 
