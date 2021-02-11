import {Slide, useScrollTrigger} from "@material-ui/core";
import PropTypes from "prop-types";
import * as React from "react";

const HideOnScroll = (props) => {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func.isRequired,
};

export default HideOnScroll;
