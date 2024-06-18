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

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getRandomDate = (start: Date, end: Date) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
};
