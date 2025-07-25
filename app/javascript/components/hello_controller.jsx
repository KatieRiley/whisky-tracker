import React from "react"
import {
  Card,
  Field,
  Heading,
  List,
  StackView,
} from '@planningcenter/tapestry-react'
import _ from 'lodash'

export default function HelloComponent({  whiskies, locations  }) {
  return (
    <StackView padding={2}>
      <StackView>
        <Heading>Hello, lets take a look at all of your whiskies you have tried:</Heading>
        <Card
          as={List}
          marginTop={1}
          onItemRemoveRequest={(index) => alert('Delete item at index ' + index)}
        >
          {whiskies.map((whisky) => (
            <List.Item>{whisky.name}, you tasting notes were: {whisky.tasting_notes}</List.Item>
          ))}
        </Card>
      </StackView>
    </StackView>
  )
}