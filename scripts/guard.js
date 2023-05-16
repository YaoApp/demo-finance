function Chat(path, params, query, payload, headers) {
  query = query || {};
  token = query.token || "";
  token = token[0] || "";
  token = token.replace("Bearer ", "");
  if (token == "" || token.length == 0) {
    throw new Exception("No token provided", 403);
  }

  let data = Process("utils.jwt.Verify", token);
  return { __sid: data.sid, __global: data.data };
}
