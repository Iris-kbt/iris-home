import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { useCartContext } from "../context/cart_context";
import { FaPlus, FaMinus } from "react-icons/fa";

const AddToCart = ({ product }) => {
  const { addToCart } = useCartContext();
  const { colors, stock, id } = product;
  const [chosenColor, setChosenColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  console.log(product);

  const increase = () => {
    setAmount((old) => (old >= stock ? old : old + 1));
  };

  const decrease = () => {
    setAmount((old) => (old === 1 ? 1 : old - 1));
  };

  return (
    <Wrapper>
      <div className="colors">
        <span>colors : </span>
        <div>
          {colors.map((color, index) => {
            return (
              <button
                key={index}
                style={{ background: color }}
                onClick={() => setChosenColor(color)}
                className={`${
                  chosenColor === color ? "color-btn active" : "color-btn"
                }`}
              >
                {chosenColor === color && <FaCheck />}
              </button>
            );
          })}
        </div>
      </div>
      <div className="btn-container">
        <Wrapper2 className="amount-btns">
          <button className="amount-btn" onClick={decrease}>
            <FaMinus />
          </button>
          <h2 className="amount">{amount}</h2>
          <button className="amount-btn" onClick={increase}>
            <FaPlus />
          </button>
        </Wrapper2>
        <Link
          to="/cart"
          className="btn"
          onClick={() => addToCart(id, chosenColor, amount, product)}
        >
          add to cart
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
    text-align: center;
  }
`;

const Wrapper2 = styled.div`
  display: grid;
  width: 140px;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  h2 {
    margin-bottom: 0;
  }
  button {
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    padding: 1rem 0;
    width: 2rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h2 {
    margin-bottom: 0;
  }
`;

export default AddToCart;
