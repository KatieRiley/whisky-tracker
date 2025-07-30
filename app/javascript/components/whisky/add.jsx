import React, {useEffect, useState} from "react"
import {
  Button,
  Divider,
  Icon,
  Input,
  Menu,
  Modal,
  Select,
  StackView,
  StepperField,
  Text,
  Tooltip,
} from '@planningcenter/tapestry-react'
import _ from 'lodash'
import AddWhisky from '../apis/whiskies/add'

export default function Add({locations, setWhiskies, setOpen}) {
  const [whiskyName, setWhiskyName] = useState('')
  const [tastingNotes, setTastingNotes] = useState('')
  const [rating, setRating] = useState(0)
  const [locationId, setLocationId] = useState(0)
  const [addLocationModal, setAddLocationModal] = useState(false)

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
              onChange={(value) => {
                if (value === -1) {
                  setAddLocationModal(true); // open modal
                } else {
                  setLocationId(value); // regular selection
                }
              }}
            >
              {locations.map((location) => (
                <Select.Option
                  value={location.id}
                >
                  {`${location.name}`}
                </Select.Option>
              ))}
              <Divider margin={0.5} />
              <Menu.Item distribution="fill" spacing={1}>
                <Button
                  size="sm"
                  title='Add location'
                  onClick={() => setAddLocationModal(true)}
                />
              </Menu.Item>
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
        <Tooltip
          title={
            !locationId ? (
              <StackView width={24} spacing={1} cursor="default">
                <StackView axis="horizontal" alignment="center" spacing={1}>
                  <Icon name="general.exclamationCircle" size="md" color="error" />
                  <Text fontSize={3} weight={500} color="error">
                    Error
                  </Text>
                </StackView>
                <Text fontSize={3} lineHeight={3}>
                  You must set a location.
                </Text>
              </StackView>
            ) : (
              ''
            )}
          openDelay={0}
          closeDelay={300}
          popoverProps={{
            textAlign: 'left',
            paddingHorizontal: 2,
            paddingVertical: 2,
            backgroundColor: 'surface',
            color: 'foreground',
            stroke: 'separator',
            strokeWeight: 1,
            elevation: 2,
          }}
        >
          <Button
            disabled={!locationId}
            order={1}
            padding={1}
            size='md'
            title="add whisky"
            onClick={() => addWhisky()}
          />
          </Tooltip>
      </StackView>
      <Modal
        open={addLocationModal}
        onRequestClose={() => setAddLocationModal(false)}
      >
        <StackView>
          <Input
            placeholder={'name'}
            autoFocus
          />
          <StackView axis="horizontal" distribution="end" paddingTop={2} spacing={1}>
            <Button
              order={1}
              padding={1}
              size='sm'
              title="cancel"
              onClick={() => setAddLocationModal(false)}
            />
            <Button
              order={2}
              padding={1}
              size='sm'
              title="add location"
              onClick={() => setAddLocationModal(false)}
            />
          </StackView>
        </StackView>
      </Modal>
    </StackView>
  )
}