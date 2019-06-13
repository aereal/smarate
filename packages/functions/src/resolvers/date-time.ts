import { GraphQLScalarType, GraphQLScalarTypeConfig } from "graphql"

const parseDateTime = (raw: string): Date | null => {
  const maybeEpoch = Date.parse(raw)
  if (isNaN(maybeEpoch)) {
    return null
  }
  return new Date(maybeEpoch)
}

const config: GraphQLScalarTypeConfig<Date, string> = {
  description: "ISO8601-formatted DateTime",
  name: "DateTime",
  parseLiteral: node =>
    node.kind === "StringValue" ? parseDateTime(node.value) : null,
  parseValue: (value: string) => parseDateTime(value),
  serialize: (value: Date) => value.toISOString(),
}

export const DateTime = new GraphQLScalarType(config)
