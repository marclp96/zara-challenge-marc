//documentacion -> https://jestjs.io/docs/mock-function-api

import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PhoneList from "../pages/PhoneList";
import { CartProvider } from "../context/CartContext";
import * as apiService from "../services/apiService";

jest.mock("../services/apiService");

const mockedPhones = [
  {
    id: 1,
    name: "iPhone 12",
    description: "El iPhone 12 es el nuevo iPhone de Apple",
    image: "https://example.com/iphone12.jpg",
    price: 1000,
  },
  {
    id: 2,
    name: "iPhone 12 Pro",
    description: "El iPhone 12 Pro es el iPhone más caro de Apple",
    image: "https://example.com/iphone12pro.jpg",
    price: 1500,
  },
];

test("muestra la lista de móviles", async () => {
  apiService.fetchPhones.mockResolvedValue(mockedPhones);

  render(
    <CartProvider>
      <BrowserRouter>
        <PhoneList />
      </BrowserRouter>
    </CartProvider>
  );

  expect(screen.getByText(/Cargando/i)).toBeInTheDocument();

  const iphon12Element = await screen.findByText("iPhone 12");
  const iphone12ProElement = await screen.findByText("iPhone 12 Pro");

  expect(iphon12Element).toBeInTheDocument();
  expect(iphone12ProElement).toBeInTheDocument();
});