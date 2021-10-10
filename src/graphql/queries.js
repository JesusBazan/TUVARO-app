/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMovimiento = /* GraphQL */ `
  query GetMovimiento($id: ID!) {
    getMovimiento(id: $id) {
      id
      userID
      tipo
      categoria
      Monto
      descripcion
      createdAt
      updatedAt
    }
  }
`;
export const listMovimientos = /* GraphQL */ `
  query ListMovimientos(
    $filter: ModelMovimientoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMovimientos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        tipo
        categoria
        Monto
        descripcion
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
