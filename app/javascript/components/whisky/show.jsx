import React, {useEffect, useState} from "react"
import {
  Button,
  Divider,
  Form,
  Heading,
  Input,
  StackView,
  StepperField,
  Text,
} from '@planningcenter/tapestry-react'
import _ from 'lodash'
import EditWhisky from "../apis/whiskies/edit"

export default function Show({whisky, location, setShowWhisky, setWhiskies}) {
  const [name, setName] = useState('')
  const [editing, setEditing] = useState(false)
  const [tastingNotes, setTastingNotes] = useState('')
  const [rating, setRating] = useState(0)

  useEffect (() => {
    setTastingNotes(whisky?.tastingNotes)
    setRating(whisky?.rating)
    setName(whisky?.name)
  },[])

  const editWhisky = async () => {
    const updatedWhisky = await EditWhisky({name, tastingNotes, rating, id: whisky.id})
    setWhiskies((prev) => prev.map((w) => w.id === whisky.id ? updatedWhisky : w))
  }

  const saveNewWhisky = () => {
    editWhisky()
    setEditing(false)
  }

  return (
    <StackView>
      <Form
        initialPayload={{whisky}}
      >
        {({}) => (
          <>
            <StackView axis="horizontal" distribution="end" paddingBottom={2} height={5}>
              <Button
                padding={1}
                size="md"
                theme="primary"
                variant='naked'
                title={editing ? 'Save' : 'Edit'}
                onClick={() => {editing ? saveNewWhisky() : setEditing(!editing)}}
              >{editing ? 'Save' : 'Edit'}</Button>
              <Button
                size="md"
                spacing={2}
                order={1}
                marginLeft={1}
                onClick={() => {setShowWhisky(false)}}
              >
                Close
              </Button>
            </StackView>
            <StackView inline axis="horizontal" distribution="space-evenly" spacing={1}>
              <Heading level={1}>
                <Input.Inline
                  disabled={!editing}
                  size="xl"
                  value={name}
                  onChange={e => setWhiskyName(e.target.value)}
                />
              </Heading>
              <StackView 
                axis="horizontal"
                alignment="center"
                distribution="space-between"
                spacing={2}
              >
                {editing ? (
                  <StepperField
                    size='md'
                    min={0}
                    max={10}
                    value={rating}
                    onChange={e => setRating(e)}
                  />
                ) : (
                  <Text>{`${rating}`}</Text>
                )}
              </StackView>
            </StackView>
            <StackView>
              <Input.InputLabel>Tasting Notes</Input.InputLabel>
              <Input.InputField
                disabled={!editing}
                defaultValue={tastingNotes}
                onChange={e => setTastingNotes(e.target.value)}
              />
            </StackView>
            <Divider margin={2}/>
            <StackView inline axis="horizontal" distribution="space-evenly" paddingBottom={5}>
              <Text>{`Tasted at ${whisky.createdAt}`}</Text>
              <Text>{`Location: ${location.name}`}</Text>
            </StackView>
          </>
        )}
      </Form>
    </StackView>
  )
}