import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Web3Provider, Web3Context } from ".";
import { EncryptedJsonWallet } from "../../types";

describe("test", () => {
  it("wallet is correctly imported", async () => {
    const exampleWallet = {
      address: "1fc5c8f02c375edfe17ec005a047b9e945a6e446",
      id: "e235cd57-0e74-4e5c-8bff-00f2de552584",
      version: 3,
      Crypto: {
        cipher: "aes-128-ctr",
        cipherparams: { iv: "947d7e91a2cbc6207f826f020fe4438a" },
        ciphertext: "22152c01515bcee86b8750ab487928c2906d9ba045240165248adaf77bc073b4",
        kdf: "scrypt",
        kdfparams: {
          salt: "b530d2233eca28ba4fa593b027efec563f0f182e60e53caf3cabf53a2871a4a3",
          n: 131072,
          dklen: 32,
          p: 1,
          r: 8
        },
        mac: "6387dd75b6a113908644d01557855389af20f614c581c52bbcdd7c83be3f430b"
      }
    };
    const tree = (
      <Web3Provider>
        <Web3Context.Consumer>
          {({
            setWallet,
            wallet
          }: {
            setWallet: (w: EncryptedJsonWallet, pwd: string) => void;
            wallet: EncryptedJsonWallet;
          }) => (
            <>
              <button
                onClick={() => {
                  setWallet(exampleWallet, "password");
                }}
              >
                Load Wallet
              </button>
              <span>Received: {JSON.stringify(wallet)}</span>
            </>
          )}
        </Web3Context.Consumer>
      </Web3Provider>
    );

    const { getByText } = render(tree);
    const buttonThatLoadsWallet = getByText(/Load Wallet/);
    fireEvent.click(buttonThatLoadsWallet);
    await waitForElement(() => {
      const walletText = getByText(/Received:/).textContent?.length ?? 0;
      return walletText > "Received: ".length;
    });
    expect(getByText(/Received:/).textContent).toBe(
      'Received: {"signingKey":{"privateKey":"0x79946d40213a3265070bfa0af36e164bde2118b43589c9ccb1ad076e3cdd7724","keyPair":{"privateKey":"0x79946d40213a3265070bfa0af36e164bde2118b43589c9ccb1ad076e3cdd7724","publicKey":"0x04f0e6830d1f42f5ea5fe4c2bcc1ff3e2e864e1469f0fd28c21ba0802e46306d300b9745c2f419bc7483538a2ce8c166f753dadd566958b845c13f7792cc91ed5c","compressedPublicKey":"0x02f0e6830d1f42f5ea5fe4c2bcc1ff3e2e864e1469f0fd28c21ba0802e46306d30","publicKeyBytes":[2,240,230,131,13,31,66,245,234,95,228,194,188,193,255,62,46,134,78,20,105,240,253,40,194,27,160,128,46,70,48,109,48]},"publicKey":"0x04f0e6830d1f42f5ea5fe4c2bcc1ff3e2e864e1469f0fd28c21ba0802e46306d300b9745c2f419bc7483538a2ce8c166f753dadd566958b845c13f7792cc91ed5c","address":"0x1Fc5C8f02C375eDFe17EC005A047b9e945A6e446"}}'
    );
  });
});
