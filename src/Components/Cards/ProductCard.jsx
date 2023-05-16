import React from "react";
import styled from "styled-components";
import { FaTrash } from "react-icons/fa";

const CardContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(2, auto) 1fr repeat(2, auto);
  gap: 10px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  position: relative;
`;

const CardImage = styled.img`
  width: 100%;
  aspect-ratio: 2/1;
  object-fit: cover;
  border-radius: 8px;
`;

const CardTitle = styled.h3`
  margin-top: auto;
  font-size: 18px;
  font-weight: bold;
  margin: 0;
`;

const CardDescription = styled.p`
  display: grid;
  font-size: 14px;
  margin: 0;
`;

const CardPrice = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin: 0;
`;

const CardButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  
`;

const CardButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  width: 35%;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ReducerButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  width: 35%;
  font-weight: bold;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const TrashIcon = styled(FaTrash)`
  /* New styled component for the trash icon */
  color: black;
  font-size: 20px;
  cursor: pointer;
  position: absolute;
  bottom: 10px;
  right: 10px;
  cursor: pointer;
`;

const ProductCard = ({
  item,
  increaseCartQuantity,
  returnAmount,
  decreaseCartQuantity,
  deleteProduct,
}) => {
  const { thumbnail, title, description, price } = item;

  return (
    <CardContainer>
      <CardImage src={thumbnail} alt={title} />
      <CardTitle>{title}</CardTitle>
      <CardDescription>
        {description} <br />
      </CardDescription>
      {returnAmount(item.id)}

      <CardPrice>dk. {price}</CardPrice>
      <CardButtonContainer>
        <CardButton
          onClick={() => increaseCartQuantity(item.id, item.price, item, 1)}
        >
          Køb
        </CardButton>
        {returnAmount(item.id) > 0 && (
          <>
            <ReducerButton onClick={() => decreaseCartQuantity(item.id)}>
              Reducer
            </ReducerButton>
            {returnAmount(item.id) > 0 && (
              <TrashIcon onClick={() => deleteProduct(item.id)} />
            )}
          </>
        )}
      </CardButtonContainer>
    </CardContainer>
  );
};

export default ProductCard;
