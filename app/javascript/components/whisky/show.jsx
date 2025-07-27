import React, {useEffect, useState} from "react"
import {
  Badge,
  Button,
  Divider,
  Form,
  Heading,
  Input,
  StackView,
  Text,
} from '@planningcenter/tapestry-react'
import _ from 'lodash'
import EditWhisky from "../apis/whiskies/edit"
import { keysToSnakeCase } from "../../utils/keysToSnakeCase"

export default function Show({whisky, location, setShowWhisky}) {
  const [saving, setSaving] = useState(false)
  const [name, setName] = useState('')
  const [editing, setEditing] = useState(false)
  const [tastingNotes, setTastingNotes] = useState('')
  const [rating, setRating] = useState(0)

  useEffect (() => {
    setTastingNotes(whisky?.tastingNotes)
    setRating(whisky?.rating)
    setName(whisky?.name)
  },[])

  useEffect (() => {
    setSaving(true)
    setTimeout(() => setSaving(false), 2000)
  }, [name])

  const editWhisky = async () => {
    await EditWhisky({name, tastingNotes, rating, id: whisky.id})
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
            <StackView axis="horizontal" distribution="end" paddingBottom={2} variant='naked' height={5}>
              <Button
                size="xs"
                theme="primary"
                variant="outline"
                title={'edit'}
                onClick={() => {editing ? saveNewWhisky() : setEditing(!editing)}}
              >{editing ? 'Save' : 'Edit'}</Button>
              <Button order={1} marginLeft={1} width={5} onClick={() => {setShowWhisky(false)}}>Close</Button>
            </StackView>
            <StackView inline axis="horizontal" distribution="space-evenly" spacing={1}>
              <Heading level={1}>
                <Input.Inline
                  disabled={!editing}
                  size="xl"
                  value={whisky.name}
                  onChange={e => setWhiskyName(e.target.value)}
                />
              </Heading>
              <Badge width={7} size="lg" title={
                <StackView position="center" distribution="space-evenly" paddingLeft={3}>
                  <Input.InputField
                    disabled={!editing}
                    defaultValue={whisky.rating}
                    onChange={e => setRating(e.target.value)}
                  />
                </StackView>
              } color="primary"/>
            </StackView>
            <StackView>
              <Input.InputLabel>Tasting Notes</Input.InputLabel>
              <Input.InputField
                disabled={!editing}
                defaultValue={whisky.tastingNotes}
                onChange={e => setTastingNotes(e.target.value)}
              />
            </StackView>
            <Divider margin={2}/>
            <StackView inline axis="horizontal" distribution="space-evenly">
              <Text>{`Tasted at ${whisky.createdAt}`}</Text>
              <Text>{`Location: ${location.name}`}</Text>
            </StackView>
          </>
        )}
      </Form>
    </StackView>
  )
}