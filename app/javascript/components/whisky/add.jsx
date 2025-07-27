import React, {useEffect, useState} from "react"
import {
  Button,
  Input,
  Select,
  StackView,
  StepperField,
} from '@planningcenter/tapestry-react'
import _ from 'lodash'
import AddWhisky from '../apis/whiskies/add'

export default function Add({locations, setWhiskies, setOpen}) {
  const [whiskyName, setWhiskyName] = useState('')
  const [tastingNotes, setTastingNotes] = useState('')
  const [rating, setRating] = useState(0)
  const [locationId, setLocationId] = useState(0)

  const addWhisky = async () => {
    const newWhisky = await AddWhisky({name: whiskyName, tastingNotes, rating, locationId})
    setWhiskies((prev) => [...prev, newWhisky])
    setOpen(false)
  }

  return (
    <StackView spacing={1}>
      <Input
        placeholder={'name'}
        onChange={e => setWhiskyName(e.target.value)}
        autoFocus
      />
      <Input
        placeholder={'tasting notes'}
        onChange={e => setTastingNotes(e.target.value)}
      />
      <StackView axis="horizontal">
        <StackView paddingRight={'15%'}>
          <Input.InputLabel>Location</Input.InputLabel>
            <Select
              id="my-select-menu"
              onChange={({ value }) => setLocationId(value)
              }
            >
              {locations.map((location) => (
                <Select.Option
                  value={location.id}
                  onChange={(value)=> setLocationId(value)}
                >
                  {`${location.name}`}
                </Select.Option>
              ))}
            </Select>
        </StackView>
        <StackView>
          <Input.InputLabel>Rating</Input.InputLabel>
          <StepperField
            size='md'
            min={0}
            max={10}
            value={rating}
            onChange={e => setRating(e)}
          />
        </StackView>
      </StackView>
      <StackView width={15} paddingVertical={2}>
          <Button
            order={1}
            padding={1}
            size='md'
            title="add whisky"
            onClick={() => addWhisky()}
          />
      </StackView>
    </StackView>
  )
}