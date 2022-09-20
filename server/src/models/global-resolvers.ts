import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'

export const globalResolvers = {
  name: Type.String(),
  intents: Type.Record(
    Type.String(),
    Type.Object({
      utterance_samples: Type.Array(Type.String()),
      value: Type.Unknown()
    })
  )
}

export const globalResolversSchemaObject = Type.Strict(
  Type.Object(globalResolvers, { additionalProperties: false })
)

export type GlobalResolvers = Static<typeof globalResolversSchemaObject>
