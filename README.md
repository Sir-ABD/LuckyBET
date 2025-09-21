# ⚽ LuckyBet – Decentralized Football Betting on BlockDAG  

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

```

│  └─ workflows/
├─ .gitignore
├─ README.md
└─ LICENSE
