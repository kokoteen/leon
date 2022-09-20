import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'

export const globalEntities = {
  options: Type.Record(
    Type.String(),
    Type.Object({
      synonyms: Type.Array(Type.String()),
      data: Type.Record(Type.String(), Type.Array(Type.String()))
    })
  )
}

export const globalEntitiesSchemaObject = Type.Strict(
  Type.Object(globalEntities, { additionalProperties: false })
)

export type GlobalEntities = Static<typeof globalEntitiesSchemaObject>
