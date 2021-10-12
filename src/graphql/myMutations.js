export const createMovimiento = /* GraphQL */ `
  mutation CreateMovimiento(
    $input: CreateMovimientoInput!
    $condition: ModelMovimientoConditionInput
  ) {
    createMovimiento(input: $input, condition: $condition) {
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