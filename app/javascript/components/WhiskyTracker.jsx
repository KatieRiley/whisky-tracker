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
import DeleteWhisky from "./apis/whiskies/remove"
import GetData from "./apis/getData"
import Show from "./whisky/show"
import Add from "./whisky/add"

export default function HelloComponent({}) {

  const [whiskies, setWhiskies] = useState([])
  const [locations, setLocations] = useState([])
  const [selectedWhisky, setSelectedWhisky] = useState({})
  const [selectedLocation, setSelectedLocation] = useState({})
  const [openAdd, setOpenAdd] = useState(false)
  const [openShow, setOpenShow] = useState(false)
  const [showWhisky, setShowWhisky] = useState(false)

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
            title={openAdd ? 'Done' : 'Add'}
            theme={'primary'}
            onClick={() => setOpenAdd(!openAdd)}
          />
        </StackView>
        <Collapse open={openAdd} lazy>
          <Add locations={locations} setWhiskies={setWhiskies} setOpen={setOpenAdd}/>
        </Collapse>
        <Collapse open={showWhisky} lazy>
          <Show
            whisky={selectedWhisky}
            location={selectedLocation}
            setShowWhisky={setShowWhisky}
            setWhiskies={setWhiskies}
          />
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
    </StackView>
  )
}