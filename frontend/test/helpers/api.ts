export const mockFetch = (data: any, options: { ok?: boolean; status?: number } = {}) => {
  return jest.fn(() =>
    Promise.resolve({
      ok: options.ok ?? true,
      status: options.status ?? 200,
      json: () => Promise.resolve(data)
    })
  ) as jest.Mock;
}; 