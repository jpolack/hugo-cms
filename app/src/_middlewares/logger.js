const customMiddleWare = () => (next) => (action) => {
  console.log('Action:', action);
  next(action);
};

export default customMiddleWare;
