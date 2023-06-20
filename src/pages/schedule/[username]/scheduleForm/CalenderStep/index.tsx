import { Calendar } from '@/src/components/calendar'
import {
  Container,
  TimePicker,
  TimePickerItem,
  TimePickerList,
  TimepickerHeader,
} from './styles'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { api } from '@/src/lib/axios'
import { useQuery } from '@tanstack/react-query'

interface Availability {
  possibleTimes: number[]
  availableTimes: number[]
}

interface CalendarStepProps {
  onSelectDateTime: (date: Date) => void
}

export function CalendarStep({ onSelectDateTime }: CalendarStepProps) {
  const [selecteDate, setSelectedDate] = useState<Date | null>(null)

  const router = useRouter()

  const isDateSelected = !!selecteDate
  const username = String(router.query.username)

  const weekDay = selecteDate ? dayjs(selecteDate).format('dddd') : null
  const monthAndDay = selecteDate
    ? dayjs(selecteDate).format('DD[ de ]MMMM')
    : null

  const selectedDateWithoutTime = selecteDate
    ? dayjs(selecteDate).format('YYYY-MM-DD')
    : null

  const { data: availability } = useQuery<Availability>(
    ['availability', selectedDateWithoutTime],
    async () => {
      const response = await api.get(`/users/${username}/availability`, {
        params: {
          date: selectedDateWithoutTime,
        },
      })

      return response.data
    },
    {
      enabled: !!selecteDate,
    },
  )

  function handleSelectTime(hour: number) {
    const dateWithTime = dayjs(selecteDate)
      .set('hour', hour)
      .startOf('hour')
      .toDate()

    onSelectDateTime(dateWithTime)
  }

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar selecteDate={selecteDate} onDateSelected={setSelectedDate} />

      {isDateSelected && (
        <TimePicker>
          <TimepickerHeader>
            {weekDay}, <span>{monthAndDay}</span>
          </TimepickerHeader>

          <TimePickerList>
            {availability?.possibleTimes.map((hour) => {
              return (
                <TimePickerItem
                  key={hour}
                  onClick={() => handleSelectTime(hour)}
                  disabled={!availability.availableTimes.includes(hour)}
                >
                  {String(hour).padStart(2, '0')}:00h
                </TimePickerItem>
              )
            })}
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  )
}
