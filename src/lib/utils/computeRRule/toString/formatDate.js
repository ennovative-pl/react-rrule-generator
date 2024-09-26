const formatDate = (momentDate) => {
  try {
    return momentDate.format();
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default formatDate;
