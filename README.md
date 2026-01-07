# Solana Counter Program (Rust + JS)

This is a simple **Solana program** written in Rust that implements a **counter**.  
It allows you to increment a counter stored in a Solana account and test it with JavaScript.

---

## 🗂 Project Structure

rust-program/
├─ counter-rust/ # Main Rust program source
├─ src/ # Rust source code
├─ target/ # Rust build artifacts (ignored in Git)
├─ counter-test/ # JS tests for the program
├─ test-ledger/ # Local Solana ledger (ignored in Git)
├─ Cargo.toml # Rust dependencies
├─ Cargo.lock # Rust lock file
└─ .gitignore # Ignore node_modules, ledger, target, etc.

---

## ⚡ Prerequisites

- **Rust** (stable)
- **Solana CLI** (>= 1.14.x)
- **Node.js** (>= 18.x)
- **npm** (comes with Node.js)

---

## 🔧 Setup

1. **Install dependencies**

# Rust dependencies
cargo build-sbf --release

# JS dependencies
cd counter-test
npm install @solana/web3.js

2. **Start local Solana validator**
solana-test-validator

3. **Set your Solana CLI to localnet**
solana config set --url http://127.0.0.1:8899
solana config get

4. **Create and fund a wallet (if not done yet)**
solana-keygen new -o ~/.config/solana/id.json
solana airdrop 2
solana balance

5. **Deploy Program**
solana program deploy target/deploy/counter_program.so

---

## 🧪 Run JS Test

cd counter-test
node test.js

# Output should show the counter value:
Counter value: 1

---

END
