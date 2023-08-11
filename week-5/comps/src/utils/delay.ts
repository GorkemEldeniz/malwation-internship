export default function delay(ms: number) {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((res) => setTimeout(res, ms));
}
