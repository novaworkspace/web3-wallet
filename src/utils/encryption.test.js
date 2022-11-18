import * as Encryption from "./encryption";

const testMock = {
  token: "mytoken",
  secret: "secret123",
  ciphertext: "U2FsdGVkX19lRlRwvT8qkgh56QBKGxRiYHQD32re4uM=",
};

describe("Encryption", () => {
  it("Encrypt correctly", () => {
    // console.log(Encryption.encript);
    // const ciphertext = Encryption.encript({
    //   value: testMock.token,
    //   secret: testMock.secret,
    // });
    // expect(ciphertext).toBe(testMock.ciphertext);
  });
});
