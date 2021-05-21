export default async function login(phoneNumber, password) {
  console.log("begin login", phoneNumber, password);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("done after 2 seconds");
    }, 2000);
  });
}
