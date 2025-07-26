import React, {useEffect, useState} from "react"
import {
  Button,
  Card,
  Collapse,
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
    console.log({whiskyName, tastingNotes, rating, locationId})
    const data = await fetch(`${API_URL}/whiskies`, {
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
    const json =  data.json()

    return json
  }

  const removeWhisky = async (whisky) => {
    const data = await fetch(`${API_URL}/whiskies/${whisky.id}`, {
      method: 'DELETE',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'X-CSRF-Token': getCSRFToken(),
      },
      credentials: 'same-origin'
    })
    const json =  data.json()

    return json
  }

  useEffect(() => {
    getData('whiskies').then((data) => {
      setWhiskies(data)
    })

    getData('locations').then((data) => {
      setLocations(data)
    })
  }, [])

  const whiskeyLocation = (locationId) => {
    return _.find(locations, {id: locationId}).name
  }

  const cardText = (whisky) => {
    return `${whisky.name}, you tasting notes were: ${whisky.tasting_notes}, location: ${whiskeyLocation(whisky.location_id)}`
  }

  return (
    <StackView padding={2}>
      <StackView >
        <StackView axis='horizontal' distribution="space-between" padding={3}>
          <Heading>Hello, lets take a look at all of your whiskies you have tried:</Heading>
          <Button
            title={open ? 'Done' : 'Add'}
            onClick={() => setOpen(!open)}
          />
        </StackView>
        <Collapse open={open} lazy>
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
            title="add whisky"
            onClick={() => addWhisky()}
          />
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