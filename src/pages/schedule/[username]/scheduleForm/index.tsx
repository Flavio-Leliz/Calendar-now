import { useState } from 'react'
import { CalendarStep } from './CalenderStep'
import { ConfirmStep } from './ConfirmStep'

export function ScheduleForm() {
  const [selecteDateTime, setSelectedDateTime] = useState<Date | null>()

  function handleClearDateTime() {
    setSelectedDateTime(null)
  }

  if (selecteDateTime) {
    return (
      <ConfirmStep
        schedulingDate={selecteDateTime}
        onCancelConfirmation={handleClearDateTime}
      />
    )
  }

  return <CalendarStep onSelectDateTime={setSelectedDateTime} />
}
