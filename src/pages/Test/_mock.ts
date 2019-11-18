import mockjs from 'mockjs';

export default {
  'GET /api/test': mockjs.mock({
    success: true,
    'data|5-15': [
      {
        id: '@guid()',
        name: '@string()',
        date: '@datetime("yyyy-MM-dd HH:mm:ss")',
      }
    ],
  }),
  'POST /api/test': (req: Request, res: Response) => {
    res.send({
      success: true,
      data: {
        ...req.body,
        id: Math.random(),
      } 
    });
  },
  'DELETE /api/test/:id': (req: Request, res: Response) => {
    res.send({
      success: true,
      data: req.params.id,
    });
  },
};
