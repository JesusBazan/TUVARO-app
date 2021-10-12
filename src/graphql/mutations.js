/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
export const updateMovimiento = /* GraphQL */ `
  mutation UpdateMovimiento(
    $input: UpdateMovimientoInput!
    $condition: ModelMovimientoConditionInput
  ) {
    updateMovimiento(input: $input, condition: $condition) {
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
export const deleteMovimiento = /* GraphQL */ `
  mutation DeleteMovimiento(
    $input: DeleteMovimientoInput!
    $condition: ModelMovimientoConditionInput
  ) {
    deleteMovimiento(input: $input, condition: $condition) {
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
