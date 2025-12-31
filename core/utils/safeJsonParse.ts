export async function safeJsonParse(response: Response) {
  try {
    return await response.json();
  } catch {
    return {};
  }
}
