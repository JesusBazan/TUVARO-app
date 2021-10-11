export const listMovimientosByID = /* GraphQL */ `
  query ListMovimientos($id: ID!) {
    listMovimientos(filter: {userID: {eq: $id}}) {
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