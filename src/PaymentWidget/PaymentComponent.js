import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { Card } from "react-bootstrap";
import CreditCardForm from "./CreditCardForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PaymentComponent.css";
import "./elements.css";
import { loadStripe } from "@stripe/stripe-js";

//config of fonts for the stripe prebuilt elements
const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: "https://fonts.googleapis.com/css?family=Roboto",
    },
  ],
};

//declare class
export default function PaymentComponent(props) {
  return (
    //bootstrap card container
    <Card border="primary" id="paymentWidgetContainerCard">
      <Card.Body>
        <Elements
          stripe={loadStripe(props.keys.stripe)}
          options={ELEMENTS_OPTIONS}
        >
          <CreditCardForm />
        </Elements>
      </Card.Body>
    </Card>
  );
}
