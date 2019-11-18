import request from '@/utils/request';

export async function query() {
  const res = await request('/api/test');

  return res;
}

export async function create(data: any) {
  const res = await request('/api/test', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return res;
}

export async function update(id: string, data: any) {
  const res = await request('/api/test', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return res;
}

export async function remove(ids: any) {
  ids = Array.isArray(ids) ? ids : [ids];

  const task = ids.map((id: string) => request(`/api/test/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }));

  const res = await Promise.all(task);

  return {
    success: true,
    data: res.filter((d: any) => d.success).map((d: any) => `${d.data}`),
  };
}