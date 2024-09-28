import { FingerprintIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";

const passkeyDB: Record<string, Passkey> = {};

// Utility to base64 encode the ArrayBuffer
const bufferToBase64 = (buffer: ArrayBuffer): string => {
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(buffer)]));
};

interface RegisterPasskeyProps {
  userID: string;
  done: React.Dispatch<React.SetStateAction<boolean>>;
  
}

const RegisterPasskey: React.FC<RegisterPasskeyProps> = ({ userID, done }) => {
  // Function to register user with WebAuthn
  const registerUser = async () => {
    try {
      // Create a public key credential creation options object
      const publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions =
        {
          challenge: Uint8Array.from("randomChallengeString", (c) =>
            c.charCodeAt(0),
          ), // Simulated server-generated challenge
          rp: {
            name: "Example Corp",
          },
          user: {
            id: Uint8Array.from(userID, (c) => c.charCodeAt(0)),
            name: userID,
            displayName: userID,
          },
          pubKeyCredParams: [{ alg: -7, type: "public-key" }], // ES256 algorithm
          timeout: 60000,
          attestation: "direct",
        };

      const credential = (await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions,
      })) as PublicKeyCredential;

      if (credential) {
        // Store the passkey in the simulated "DB"
        const rawId = bufferToBase64(credential.rawId);
        passkeyDB[userID] = { id: credential.id, rawId };

        alert(`Passkey successfully registered!`);
        done(false);
        let td = new TextDecoder("utf-8");

        console.log(td.decode(credential.rawId));
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed.");
    }
  };

  return (
    <div onClick={registerUser}>
      <Button className="absolute bottom-20 ml-[6%] p-8" >
        <FingerprintIcon size={50}></FingerprintIcon>{" "}
      </Button>
    </div>
  );
};

// Simulated DB for storing passkeys
interface Passkey {
  id: string;
  rawId: string;
}

// Utility to decode Base64 to ArrayBuffer
const base64ToBuffer = (base64: string): ArrayBuffer => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};

interface CheckFingerprintProps {
  userID: string;
}

const CheckFingerprint: React.FC<CheckFingerprintProps> = ({ userID }) => {
  const [username, setUsername] = useState<string>("");
  const [authStatus, setAuthStatus] = useState<string>("");

  // Function to check fingerprint and validate passkey
  const checkFingerprint = async () => {
    try {
      const storedPasskey = passkeyDB[userID];

      if (!storedPasskey) {
        setAuthStatus("User not registered");
        return;
      }

      const publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions =
        {
          challenge: Uint8Array.from("randomChallengeString", (c) =>
            c.charCodeAt(0),
          ), // Simulated server-generated challenge
          allowCredentials: [
            {
              id: base64ToBuffer(storedPasskey.rawId),
              type: "public-key",
            },
          ],
          userVerification: "preferred",
          timeout: 60000,
        };

      const credential = (await navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions,
      })) as PublicKeyCredential;

      if (credential) {
        setAuthStatus("Authentication successful");
      } else {
        setAuthStatus("Authentication failed");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      setAuthStatus("Authentication failed.");
    }
  };

  return (
    <div>
      <h2>Check Fingerprint</h2>

      <input
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={checkFingerprint}>Check Fingerprint</button>

      {authStatus && <p>{authStatus}</p>}
    </div>
  );
};

export { CheckFingerprint, RegisterPasskey };
