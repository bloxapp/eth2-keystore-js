"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var translations = {
  VALIDATOR: {
    HOME: {
      TITLE: "Run Validator with the SSV Network",
      DESCRIPTION:
        "Any validator can run on the SSV network: create a new validator or import your existing one to begin.",
    },
    CREATE: {
      NAVIGATION_TEXT: "Create Validator",
      TITLE: "Create Validator via Ethereum Launchpad",
      DESCRIPTION: "",
      BODY_TEXT: [
        "You must have an active validator before running it on the SSV network.",
        "Follow Ethereum’s launchpad instructions to generate new keys and deposit your validator to the deposit contract.",
        "Please note to backup your newly created validator files, you will need them for our setup.",
      ],
    },
    IMPORT: {
      TITLE: "Enter Validator Key",
      DESCRIPTION:
        "Your validator key is secured - it’s not stored anywhere and never sent to our servers.",
      FILE_ERRORS: {
        INVALID_FILE: "Invalid file type.",
        INVALID_PASSWORD: "Invalid keystore file password.",
      },
    },
    CONFIRMATION: {
      TITLE: "Confirm Transaction",
      DESCRIPTION: "",
    },
    SLASHING_WARNING: {
      TITLE: "Slashing Warning",
      DESCRIPTION: "Your validator is currently active on beacon chain:",
    },
    SELECT_OPERATORS: {
      TITLE: "Select Operators",
      DESCRIPTION: "Pick the team of network operators to run your validator.",
    },
    SUCCESS: {
      TITLE: "Welcome to the SSV Network!",
      DESCRIPTION: "With every new operator, our network grows stronger.",
    },
  },
  HOME: {
    TITLE: "Join the SSV Network",
    DESCRIPTION:
      "Run your validator on the decentralized infrastructure of Ethereum staking or help maintain it as one of its operators.",
    MENUS: {
      NEW_OPERATOR: {
        TITLE: "Create new Operator",
      },
      SHARE_VALIDATOR_KEY: {
        TITLE: "Share Validator Key",
      },
    },
  },
  SUCCESS: {
    TITLE: "Welcome to the SSV Network!",
    OPERATOR_DESCRIPTION: "With every new operator, our network grows stronger",
    VALIDATOR_DESCRIPTION:
      "Your validator is now running on the robust and secure infrastructure of our network",
  },
  OPERATOR: {
    OPERATOR_EXIST: "Operator key has already been registered.",
    REGISTER: {
      TOOL_TIP_KEY: "Generated as part of the SSV node setup - see our ",
      TOOL_TIP_ADDRESS: "The operator’s admin address for management purposes.",
      TITLE: "Register Operator",
      DESCRIPTION:
        "Register to the networks registry to enable others to discover and select you as one of their validator’s operators.",
    },
    CONFIRMATION: {
      TITLE: "Confirmation Transaction",
      DESCRIPTION: "",
    },
    HOME: {
      TITLE: "Join the SSV Network Operators",
      DESCRIPTION:
        "To join the network of operators you must run an SSV node.\nSetup your node, generate operator keys and register to the network.",
      MENUS: {},
    },
  },
  CTA_BUTTON: {
    CONNECT: "Connect to a wallet",
  },
};
exports.default = translations;
