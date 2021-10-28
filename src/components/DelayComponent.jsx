import React from "react";

const DeleayComponent = () => {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 5000);
  }, [show]);

  if (!show) return null;

  return <>OK, Render</>;
};

export default DeleayComponent;
