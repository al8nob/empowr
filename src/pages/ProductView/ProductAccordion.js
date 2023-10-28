import { useContext } from "react";

import { CaretDown, CaretUp } from "phosphor-react";
import React from "react";

import "./ProductAccordion.css";

import { AccordionContext, Accordion, Button } from "react-bootstrap";
import { useAccordionButton } from "react-bootstrap/AccordionButton";

// this function allows us to use a custom style of accordion button

// {children} stands to the content inside the button which will be an icon

// {eventKey} It is a key that is used to correspond to the collapse component when the click is triggered on this component.
function CustomToggle({ eventKey, callBack }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callBack && callBack(eventKey)
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <Button onClick={decoratedOnClick} variant="link">
      {isCurrentEventKey ? (
        <CaretUp size={20} color="#ffc400" weight="bold" />
      ) : (
        <CaretDown size={20} color="#ffffff" weight="bold" />
      )}
    </Button>
  );
}

const ProductAccordion = ({ iconAcc, labelAcc, bodyAcc, eventKey }) => {
  return (
    <Accordion className="accParent">
      <div className="accContent">
        <div className="iconAccordion">{iconAcc}</div>

        <div className="labelAccordion">
          <h6 className="m-0">{labelAcc}</h6>
        </div>

        <div className="arrowAccordion">
          <CustomToggle eventKey={eventKey} />
        </div>
      </div>
      <Accordion.Collapse className="accBody text-center" eventKey={eventKey}>
        <p>{bodyAcc}</p>
      </Accordion.Collapse>
    </Accordion>
  );
};

export default ProductAccordion;
