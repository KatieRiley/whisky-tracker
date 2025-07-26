import React, {cloneElement, useEffect, useState} from "react"
import {
  Button,
  Card,
  Collapse,
  Field,
  Heading,
  Input,
  List,
  Select,
  StackView,
} from '@planningcenter/tapestry-react'
import _ from 'lodash'

export default function HelloComponent({}) {

  const API_URL = 'http://localhost:3000/'
  const [whiskies, setWhiskies] = useState([])
  const [locations, setLocations] = useState([])
  const [open, setOpen] = useState(false)
  const [whiskyName, setWhiskyName] = useState('')
  const [tastingNotes, setTastingNotes] = useState('')
  const [rating, setRating] = useState(0)
  const [locationId, setLocationId] = useState(0)

  const getData = async (what) => {
    const data = await fetch(`${API_URL}/${what}`, {
      headers: {
        Accept: "application/json",
      },
    })
    const json =  data.json()
    return json
  }

  const getCSRFToken = () => {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
  }

  const addWhisky = async () => {
    const response = await fetch(`${API_URL}/whiskies`, {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'X-CSRF-Token': getCSRFToken(),
      },
      body: JSON.stringify({
        whisky: {
          name: whiskyName,
          location_id: locationId,
          tasting_notes: tastingNotes,
          rating: rating
        }
      }),
      credentials: 'same-origin'
    })
    const newWhisky =  await response.json()

    setWhiskies((prev) => [...prev, newWhisky])
    setOpen(false)
  }

  const removeWhisky = async (whisky) => {
    const response = await fetch(`${API_URL}/whiskies/${whisky.id}`, {
      method: 'DELETE',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'X-CSRF-Token': getCSRFToken(),
      },
      credentials: 'same-origin'
    })

    if(response.ok) {
      setWhiskies((prev) => prev.filter((w) => w.id !== whisky.id))
    } else {
      console.error("failed to delete whisky")
    }
  }

  useEffect(() => {
    getData('whiskies').then((response) => {
      setWhiskies(response)
    })

    getData('locations').then((response) => {
      setLocations(response)
    })
  }, [])

  const whiskeyLocation = (locationId) => {
    return _.find(locations, {id: locationId}).name
  }

  const cardText = (whisky) => {
    return `${whisky.name}, you tasting notes were: ${whisky.tasting_notes}, location: ${whiskeyLocation(whisky.location_id)}`
  }

  return (
    <StackView padding={6} backgroundColor={'secondary'}>
      <StackView >
        <StackView axis='horizontal' distribution="space-between" minHeight={10} alignment="center">
          <Heading>Hello, lets take a look at all of your whiskies you have tried:</Heading>
          <Button
            padding={1}
            variant='naked'
            title={open ? 'Done' : 'Add'}
            theme={'primary'}
            onClick={() => setOpen(!open)}
          />
        </StackView>
        <Collapse open={open} lazy>
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
              <Button
                padding={1}
                size='sm'
                variant='naked'
                theme={'primary'}
                title="add whisky"
                onClick={() => addWhisky()}
              />
            </StackView>
        </Collapse>
        {whiskies.map((whisky) => (
          <Card
            as={List}
            marginTop={1}
            onItemRemoveRequest={() => removeWhisky(whisky)}
          >
              <List.Item>{cardText(whisky)}</List.Item>
          </Card>
        ))}
      </StackView>
    </StackView>
  )
}