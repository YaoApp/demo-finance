/**
 * Execute a process
 * @param {*} id
 * @param {*} process
 * @param {*} payload
 * @returns
 */
function Exec(id, process, args) {
  const res = Process(process, ...args);
  return { id: id, result: res };
}
