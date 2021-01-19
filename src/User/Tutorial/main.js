import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';

export default (props) => {
  const handlego = () => {
    history.pushState("", "", "/#/Login");
    history.go(0);
  };
  return (
    <div>
      <Button onClick={handlego}>tutorial</Button>
    </div>
  );
}
