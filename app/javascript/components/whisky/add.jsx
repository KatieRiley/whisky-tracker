import React, {useEffect, useState} from "react"
import {
  Button,
  Input,
  Select,
  StackView,
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
        placeholder={'rating'}
        onChange={e => setRating(e.target.value)}
      />
      <Input
        placeholder={'tasting notes'}
        onChange={e => setTastingNotes(e.target.value)}
      />
      <StackView>
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
      <StackView width={15}>
          <Button
            padding={1}
            size='sm'
            variant='naked'
            theme={'primary'}
            title="add whisky"
            onClick={() => addWhisky()}
          />
      </StackView>
    </StackView>
  )
}