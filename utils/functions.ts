export const isColor = (color: string) => {
  const s = new Option().style;
  s.color = color;
  return s.color !== "";
};

export const getRandomTransmissions = () => {
  const transmissions = ["Automatic", "Manual"];
  return transmissions[Math.floor(Math.random() * transmissions.length)];
};

export const getRandomDriveTypes = () => {
  const driveTypes = ["2WD", "4WD"];
  return driveTypes[Math.floor(Math.random() * driveTypes.length)];
};
