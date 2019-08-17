const customMiddleWare = (store) => (next) => (action) => {
  console.log('Action:', action);
  next(action);
};

export default customMiddleWare;
