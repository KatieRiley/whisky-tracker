import React, {cloneElement, useEffect, useState} from "react"
import {
  Button,
  Card,
  Collapse,
  Heading,
  Input,
  Modal,
  List,
  Select,
  StackView,
} from '@planningcenter/tapestry-react'
import _ from 'lodash'
import { keysToCamelCase } from "../utils/keysToSnakeCase"
import  AddWhisky  from "./apis/whiskies/add"
import Show from "./whisky/show"
import DeleteWhisky from "./apis/whiskies/remove"
import GetData from "./apis/getData"

export default function HelloComponent({}) {

  const [whiskies, setWhiskies] = useState([])
  const [locations, setLocations] = useState([])
  const [selectedWhisky, setSelectedWhisky] = useState({})
  const [selectedLocation, setSelectedLocation] = useState({})
  const [open, setOpen] = useState(false)
  const [whiskyName, setWhiskyName] = useState('')
  const [tastingNotes, setTastingNotes] = useState('')
  const [rating, setRating] = useState(0)
  const [locationId, setLocationId] = useState(0)
  const [showWhisky, setShowWhisky] = useState(false)

  const addWhisky = async () => {
    const newWhisky = await AddWhisky({name: whiskyName, tastingNotes, rating, locationId})
    setWhiskies((prev) => [...prev, newWhisky])
    setOpen(false)
  }

  const removeWhisky = async (whisky) => {
    await DeleteWhisky(whisky)
    setWhiskies((prev) => prev.filter((w) => w.id !== whisky.id))
  }

  useEffect(() => {
    GetData('whiskies').then((response) => {
      setWhiskies(keysToCamelCase(response))
    })

    GetData('locations').then((response) => {
      setLocations(keysToCamelCase(response))
    })
  }, [])

  const whiskeyLocation = (locationId) => {
    return _.find(locations, {id: locationId})?.name
  }

  const cardText = (whisky) => {
    return `${whisky.name}, you tasting notes were: ${whisky.tastingNotes}, your rating: ${whisky.rating}, location: ${whiskeyLocation(whisky.locationId)}`
  }

  const setUpModal = (whisky) => {
    setSelectedWhisky(whisky)
    setSelectedLocation(_.find(locations, {id: whisky.locationId}))
    setShowWhisky(true)
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
        </Collapse>
        {whiskies.map((whisky) => (
          <>
            <Card
              as={List}
              marginTop={1}
              onItemRemoveRequest={() => removeWhisky(whisky)}
            >
                <List.Item onClick={()=> setUpModal(whisky)}>{cardText(whisky)}</List.Item>
            </Card>
          </>
        ))}
      </StackView>
      {showWhisky && (
        <Show whisky={selectedWhisky} location={selectedLocation} setShowWhisky={setShowWhisky}/>
      )}
    </StackView>
  )
}