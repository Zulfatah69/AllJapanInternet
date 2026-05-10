import api from "./api";

export async function getPage(
  slug: string
) {
  const response = await api.get(
    `/page/${slug}`
  );

  return response.data;
}