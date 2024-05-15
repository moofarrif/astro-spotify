export async function getPlayListInfoById(playListId) {
  const res = await fetch(`/api/get-info-playlist.json?id=${playListId}`);
  return await res.json();
}
