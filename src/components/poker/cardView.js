import React from "react";
import PropTypes from "prop-types";
import constants from "../../utils/constants";

const CardView = props => {
  const cards = props.cards.map((value, key) => {
    return (
      <div
        key={key}
        onClick={props.removeCard}
        className={`card_view_border card_blink_${props.animation}
          ${
            props.blinkList.indexOf(value) !== -1
              ? `card_blink_${props.type}`
              : ""
          }`}
      >
        <span data-type={props.type}>{value}</span>
      </div>
    );
  });

  return (
    <div className={`card_view`}>
      <div>
        <h3>{props.type}</h3>
      </div>
      <div className={`card_view_cards_${props.type}`}>{cards}</div>
    </div>
  );
};

CardView.propTypes = {
  cards: PropTypes.array,
  removeCard: PropTypes.func,
  type: PropTypes.string,
  blinkList: PropTypes.array,
  animation: PropTypes.string
};

CardView.defaultProps = {
  blinkList: [],
  animation: ""
};

export default CardView;
