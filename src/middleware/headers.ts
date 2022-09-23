module.exports = (req: any, res: any, next: any) => {
  res.header('access-control-allow-origin', '*');
  res.header('access-control-allow-methods', 'GET, POST, PUT, PATCH, DELETE');
  res.header(
    'access-control-allow-headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Content-Disposition', '*');
  next();
};
