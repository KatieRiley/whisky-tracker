import React, {cloneElement, useEffect, useState} from "react"
import {
  Badge,
  Button,
  Divider,
  EditActions,
  Heading,
  Input,
  StackView,
  Summary,
  Text,
} from '@planningcenter/tapestry-react'
import _ from 'lodash'

export default function Show({whisky, location, setShowWhisky}) {
  const [saving, setSaving] = useState(false)
  const [name, setName] = useState('')

  useEffect (() => {
    setName(whisky?.name)
  },[])

  useEffect (() => {
    setSaving(true)
    setTimeout(() => setSaving(false), 2000)
  }, [name])

  return (
    <StackView>
      <StackView axis="horizontal" distribution="end" paddingBottom={2} variant='naked' height={5}>
        <Button width={5} onClick={() => {setShowWhisky(false)}}>Close</Button>
      </StackView>
      <StackView inline axis="horizontal" distribution="space-evenly" spacing={1}>
        <Heading level={1}>{whisky.name}</Heading>
        <Badge width={7} size="lg" title={whisky.rating} color="primary"></Badge>
      </StackView>
      <StackView>
        <Summary title='Tasting Notes'>
          {whisky.tastingNotes}
        </Summary>
      </StackView>
      <Divider margin={2}/>
      <StackView inline axis="horizontal" distribution="space-evenly">
        <Text>{`Tasted at ${whisky.createdAt}`}</Text>
        <Text>{`Location: ${location.name}`}</Text>
      </StackView>
    </StackView>
  )
}