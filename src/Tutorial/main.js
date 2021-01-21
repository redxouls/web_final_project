import React, { useEffect, useState } from "react";
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
    overflow: "hidden",
    height: window.innerHeight - 116,
  },
  textBox: {
    marginTop: 10,
    marginBottom: 10,
    height: 30,
  },
});

const tutorialSteps = [
  {
    text: "",
    imgPath: "/asset/img/firstpage.jpg",
  },
  {
    text: "登入畫面",
    imgPath: "/asset/img/login.gif",
  },
  {
    text: "累計所有課程/最可能的課程/列表",
    imgPath: "/asset/img/switch.gif",
  },
  {
    text: "右邊列表輸入流水號可新增",
    imgPath: "/asset/img/list.gif",
  },
  {
    text: "在全部課程預覽可按星期展開",
    imgPath: "/asset/img/expand.gif",
  },
  {
    text: "長按刪除",
    imgPath: "/asset/img/longpress.gif",
  },
  {
    text: "點擊前往課程頁面",
    imgPath: "/asset/img/coursego.gif",
  },
  {
    text: "上方可投票加簽規則，操作頻繁會被禁止",
    imgPath: "/asset/img/vote.gif",
  },
  {
    text: "下方可留言，過多則隱藏",
    imgPath: "/asset/img/comment.gif",
  },
];

export default (props) => {
  const classes = useStyles();

  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

  const handleClick = (e) => {
    if (e.clientX > window.innerWidth / 2) {
      if (activeStep < maxSteps - 1)
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      if (activeStep > 0) setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  const [check, setCheck] = useState(false);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("credentials", "include");
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "manual",
    };
    fetch("./api/user/list", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.message != "Not authorized request")
          window.location.href = document.referrer + "#/User";
        else setCheck(true);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const handlego = () => {
    window.location.href = document.referrer + "#/Login";
  };
  return check == true ? (
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
            <div className={classes.textBox}>
              <Typography align="center">{step.text}</Typography>
            </div>
            <img className={classes.img} src={step.imgPath} />
          </div>
        ))}
      </AutoPlaySwipeableViews>
    </div>
  ) : (
    []
  );
};
