import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { MobileStepper, Paper, Typography, Button } from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles({
  button: {
    zIndex: 1,
    bottom: 50,
    right: 30,
    position: "fixed",
  },
  root: {
    width: "100%",
    flexGrow: 1,
    alignItems: "center",
    justify: "center",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: 270,
    overflow: "hidden",
    width: "100%",
  },
  textBox: {
    marginLeft: 70,
    height: 50,
  },
});

const tutorialSteps = [
  {
    text: "login 教學",
    imgPath: "/asset/img/login.gif",
  },
  {
    text: "comment 教學",
    imgPath: "/asset/img/comment.gif",
  },
];

export default (props) => {
  const { setLogin } = props;
  const classes = useStyles();

  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

  const handleClick = (e) => {
    console.log(e.clientX, window.innerWidth);
    if (e.clientX > window.innerWidth / 2) {
      if (activeStep < maxSteps - 1)
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      if (activeStep > 0) setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };
  useEffect(() => {
    setLogin(false);
  }, []);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handlego = () => {
    setLogin(true);
    history.pushState("", "", "/#/Login");
    history.go(0);
  };
  return (
    <div className={classes.root} onClick={handleClick}>
      <Button
        onClick={handlego}
        className={classes.button}
        variant="contained"
        color="primary"
      >
        skip&login
      </Button>
      <AutoPlaySwipeableViews
        interval={10000}
        axis="x"
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {tutorialSteps.map((step, index) => (
          <div key={index}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img className={classes.img} src={step.imgPath} />
            ) : null}
            <div className={classes.textBox}>
              <Typography>{step.text}</Typography>
            </div>
          </div>
        ))}
      </AutoPlaySwipeableViews>
    </div>
  );
};
