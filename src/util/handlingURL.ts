export function validate(url: string): { handle?: string, postId?: string } | null {
  const regexGen =
    /(?:https:\/\/)?bsky\.app\/profile\/(?<handle>(?:[a-z]|[A-Z]|\d|-|\.)+)\/post\/(?<postId>(?:\d|[a-z])+)/;
  const found = url?.match(regexGen);
  if (found != null && found.groups !== undefined) {
    const groups: { handle?: string, postId?: string } = found.groups;
    return groups;
  }
  return null;
}