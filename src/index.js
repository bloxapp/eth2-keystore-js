"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = __importDefault(require("crypto"));
var scrypt_js_1 = require("scrypt-js");
var ethereumjs_wallet_1 = __importDefault(require("ethereumjs-wallet"));
var ethereumjs_util_1 = require("ethereumjs-util");
var translations_1 = __importDefault(require("./translations"));
/**
 * Decrypt private key from key store data
 * Supports key store versions: v1, v3, v4
 *
 * Example of usage (Node env):
 *
 *  const keyStoreFilePath = path.join(process.cwd(), 'validator_keys', 'keystore.json');
 *  const keyStoreString: string = fs.readFileSync(keyStoreFilePath).toString();
 *  const keyStoreData = JSON.parse(keyStoreString);
 *  const keyStore = new EthereumKeyStore(keyStoreData);
 *  const password = 'testtest';
 *  console.log('Private Key:', await keyStore.getPrivateKey(password));
 */
var EthereumKeyStore = /** @class */ (function () {
  /**
   * Receive key store data from string or parsed JSON
   * @param keyStoreData
   */
  function EthereumKeyStore(keyStoreData) {
    this.privateKey = "";
    if (!keyStoreData) {
      throw new Error("Key store data should be JSON or string");
    }
    if (typeof keyStoreData !== "string") {
      this.keyStoreData = keyStoreData;
    } else {
      this.keyStoreData = JSON.parse(String(keyStoreData));
    }
    if (!this.keyStoreData.version) {
      throw new Error(
        translations_1.default.VALIDATOR.IMPORT.FILE_ERRORS.INVALID_FILE
      );
    }
  }
  EthereumKeyStore.prototype.getPublicKey = function () {
    var _a;
    if (this.keyStoreData) {
      switch (
        (_a = this.keyStoreData.version) !== null && _a !== void 0
          ? _a
          : this.keyStoreData.Version
      ) {
        case 1:
          return this.keyStoreData.Address;
        case 3:
          return this.keyStoreData.id;
        case 4:
          return this.keyStoreData.pubkey;
      }
    }
    return "";
  };
  EthereumKeyStore.prototype.getWithdrawalKey = function () {
    var _a;
    if (this.keyStoreData) {
      switch (
        (_a = this.keyStoreData.version) !== null && _a !== void 0
          ? _a
          : this.keyStoreData.Version
      ) {
        case 1:
          return this.keyStoreData.Address;
        case 3:
          return this.keyStoreData.id;
        case 4:
          return this.keyStoreData.withdrawal;
      }
    }
    return "";
  };
  /**
   * Decrypt private key using user password
   * @param password
   */
  EthereumKeyStore.prototype.getPrivateKey = function (password) {
    if (password === void 0) {
      password = "";
    }
    return __awaiter(this, void 0, void 0, function () {
      var _a, _b, _c, _d;
      return __generator(this, function (_e) {
        switch (_e.label) {
          case 0:
            // In case private key exist we return it
            if (this.privateKey) return [2 /*return*/, this.privateKey];
            _a = this.keyStoreData.version;
            switch (_a) {
              case 1:
                return [3 /*break*/, 1];
              case 3:
                return [3 /*break*/, 3];
              case 4:
                return [3 /*break*/, 5];
            }
            return [3 /*break*/, 7];
          case 1:
            _b = this;
            return [
              4 /*yield*/,
              ethereumjs_wallet_1.default.fromV1(this.keyStoreData, password),
            ];
          case 2:
            _b.wallet = _e.sent();
            return [3 /*break*/, 7];
          case 3:
            _c = this;
            return [
              4 /*yield*/,
              ethereumjs_wallet_1.default.fromV3(
                this.keyStoreData,
                password,
                true
              ),
            ];
          case 4:
            _c.wallet = _e.sent();
            return [3 /*break*/, 7];
          case 5:
            _d = this;
            return [4 /*yield*/, this.fromV4(this.keyStoreData, password)];
          case 6:
            _d.wallet = _e.sent();
            return [3 /*break*/, 7];
          case 7:
            if (this.wallet) {
              this.privateKey = this.wallet.getPrivateKey().toString("hex");
              if (!this.privateKey) {
                throw new Error(
                  translations_1.default.VALIDATOR.IMPORT.FILE_ERRORS.INVALID_PASSWORD
                );
              }
            }
            return [2 /*return*/, this.privateKey];
        }
      });
    });
  };
  /**
   * Import a wallet (Version 4 of the Ethereum wallet format).
   *
   * @param input A JSON serialized string, or an object representing V3 Keystore.
   * @param password The keystore password.
   */
  EthereumKeyStore.prototype.fromV4 = function (input, password) {
    return __awaiter(this, void 0, void 0, function () {
      var json,
        derivedKey,
        kdfParams,
        ciphertext,
        checksumBuffer,
        hashFunctions,
        hashFunction,
        mac,
        decipher,
        seed;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            json = typeof input === "object" ? input : JSON.parse(input);
            if (json.version !== 4) {
              throw new Error("Not a V4 wallet");
            }
            if (!(json.crypto.kdf.function === "scrypt"))
              return [3 /*break*/, 2];
            kdfParams = json.crypto.kdf.params;
            return [
              4 /*yield*/,
              scrypt_js_1.scrypt(
                Buffer.from(password),
                Buffer.from(kdfParams.salt, "hex"),
                kdfParams.n,
                kdfParams.r,
                kdfParams.p,
                kdfParams.dklen
              ),
            ];
          case 1:
            derivedKey = _a.sent();
            return [3 /*break*/, 3];
          case 2:
            if (json.crypto.kdf.function === "pbkdf2") {
              kdfParams = json.crypto.kdf.params;
              if (kdfParams.prf !== "hmac-sha256") {
                throw new Error("Unsupported parameters to PBKDF2");
              }
              derivedKey = crypto_1.default.pbkdf2Sync(
                Buffer.from(password),
                Buffer.from(kdfParams.salt, "hex"),
                kdfParams.c,
                kdfParams.dklen,
                "sha256"
              );
            } else {
              throw new Error("Unsupported key derivation scheme");
            }
            _a.label = 3;
          case 3:
            ciphertext = Buffer.from(json.crypto.cipher.message, "hex");
            checksumBuffer = Buffer.concat([
              Buffer.from(derivedKey.slice(16, 32)),
              ciphertext,
            ]);
            hashFunctions = {
              keccak256: ethereumjs_util_1.keccak256,
              sha256: ethereumjs_util_1.sha256,
            };
            hashFunction = hashFunctions[json.crypto.checksum.function];
            mac = hashFunction(checksumBuffer);
            if (mac.toString("hex") !== json.crypto.checksum.message) {
              throw new Error(
                translations_1.default.VALIDATOR.IMPORT.FILE_ERRORS.INVALID_PASSWORD
              );
            }
            decipher = crypto_1.default.createDecipheriv(
              json.crypto.cipher.function,
              derivedKey.slice(0, 16),
              Buffer.from(json.crypto.cipher.params.iv, "hex")
            );
            seed = this.runCipherBuffer(decipher, ciphertext);
            return [2 /*return*/, new ethereumjs_wallet_1.default(seed)];
        }
      });
    });
  };
  /**
   * @param cipher
   * @param data
   */
  EthereumKeyStore.prototype.runCipherBuffer = function (cipher, data) {
    return Buffer.concat([cipher.update(data), cipher.final()]);
  };
  /**
   * Convert byte array to string
   * @param byteArray
   */
  EthereumKeyStore.toHexString = function (byteArray) {
    return Array.from(byteArray, function (byte) {
      // eslint-disable-next-line no-bitwise
      return ("0" + (byte & 0xff).toString(16)).slice(-2);
    }).join("");
  };
  return EthereumKeyStore;
})();
exports.default = EthereumKeyStore;
