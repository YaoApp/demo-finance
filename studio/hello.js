/**
 * Cloud Function
 *
 * POST /api/__yao/app/service/foo
 * {"method":"World", "args":["hello", "world"]}
 *
 * @param  {...any} args
 * @returns
 */
function World(...args) {
  return {
    message: $L("Another yao application") + " (Studio Function: hello.World)",
    args: args,
  };
}
