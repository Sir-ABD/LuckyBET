# ⚽ LuckyBet – Decentralized Football Betting on BlockDAG

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-purple)](https://vitejs.dev/)
[![Solidity](https://img.shields.io/badge/Solidity-^0.8.24-blue)](https://soliditylang.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-cyan)](https://tailwindcss.com/)

**Fair, transparent, and deflationary betting powered by BlockDAG**  

LuckyBet is a decentralized football betting platform where odds are set by the community, payouts are handled by smart contracts, and **10% of platform profits are automatically used to buy back and burn BDAG tokens**, strengthening the ecosystem.  

---

## ✨ Features  

- 🔒 **Trustless Payouts** – Smart contracts handle bets, escrow, and winnings automatically.  
- 🌐 **Community-Driven Odds** – No centralized house setting odds.  
- 🔥 **Deflationary Model** – 10% of platform commission auto-buys BDAG and burns it.  
- ⚡ **Fast & Transparent** – All transactions are on BlockDAG, publicly verifiable.  
- 🎮 **Global Appeal** – Built for football’s 4B+ fans worldwide.  

---

## 🏗️ Project Structure


```
LuckyBet/
├─ frontend/                  # React app (UI)
│  ├─ public/
│  └─ src/
│     ├─ components/          # Reusable UI components (BetForm, OddsCard, Header)
│     ├─ pages/               # Pages (Home, Match, Dashboard, Admin)
│     ├─ hooks/               # Wallet and data hooks (useWallet, useOdds)
│     ├─ utils/               # Helpers (formatters, api clients)
│     ├─ App.jsx
│     └─ index.jsx
│  ├─ package.json
│  └─ .env.example
│
├─ contracts/                 # Smart contracts + Hardhat (or Truffle) config
│  ├─ contracts/
│  │  └─ LuckyBet.sol
│  ├─ scripts/                # Deployment scripts (deploy.js)
│  ├─ test/                   # Contract tests (Mocha/Chai)
│  ├─ hardhat.config.js
│  └─ package.json
│
├─ backend/                   # Optional backend (oracles, admin APIs, webhooks)
│  ├─ src/
│  │  ├─ api.js
│  │  └─ oracle-fulfill.js
│  ├─ package.json
│  └─ .env.example
│
├─ oracle/                    # Oracle adapter / scripts (if separate)
│  └─ README.md
│
├─ scripts/                   # Utility scripts (burn simulation, analytics jobs)
│  └─ burn.js
│
├─ docs/                      # Architecture docs, tokenomics, pitch assets
│  └─ architecture.md
│
├─ .github/                   # CI / workflow files (optional)
│  └─ workflows/
├─ .gitignore
└─ README.md
```

---

## 📊 Tokenomics  

### Commission Model  
- **90%** → Distributed to winning bettors.  
- **10%** → Platform commission.  

### Deflationary Mechanism  
- From the **10% commission**, LuckyBet automatically:  
  - Buys back BDAG tokens from the open market.  
  - Sends them to a burn address (permanently removing them).  

### Why It Matters  
- 🔥 Every bet reduces BDAG circulating supply.  
- 📈 Creates long-term upward pressure on BDAG value.  
- 🤝 Aligns interests of bettors, platform, and BDAG ecosystem.  

---

## 🏗️ How It Works  

1. Bettor connects a crypto wallet.  
2. Places a bet on a football match (e.g., Nigeria vs Brazil).  
3. An **oracle** feeds the final score into the smart contract.  
4. Winners receive instant payouts in BDAG.  
5. 10% of profits are auto-burned in BDAG.  

---

## 📸 Demo Flow  

- **Step 1:** Connect Wallet  
- **Step 2:** Place Bet  
- **Step 3:** Oracle Updates Score  
- **Step 4:** Automatic Payout + Burn 🔥  


---

## 🚀 Roadmap  

- ✅ Football betting MVP  
- 🔜 Multi-sports expansion (basketball, eSports, etc.)  
- 🔜 DAO governance for community-driven features  
- 🔜 NFT collectibles for bettors  

---

## 🛠️ Tech Stack  

- **Frontend:** Typescript / React.js
- **Smart Contracts:** Solidity (EVM-compatible)  
- **Blockchain:** BlockDAG  
- **Backend:** Node.js / php
- **Wallet Integration:** MetaMask / WalletConnect  
- **Oracle:** Match result data feeds  

---

## 📦 Installation  

### Clone and Setup  

```bash
# Clone repository
git clone https://github.com/<your-username>/LuckyBet.git

# Navigate into folder
cd LuckyBet
cd frontend
npm install
npm run dev     # or npm start
cd contracts
npm install
npx hardhat compile
npx hardhat test
npx hardhat run scripts/deploy.js --network <blockdag-network>
cd backend
npm install
npm run start
```


## ❤️ Acknowledgements

- **BlockDAG ecosystem**

- **Hackathon organizers & mentors**

- **Open-source community**

**GitHub**: `https://github.com/Sir-ABD/LuckyBET`
