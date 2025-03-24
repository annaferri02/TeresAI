# TeresAI
Smart Recording, Smarter Care – a platform for elderly care staff to manage patients and automatically generate care reports using [VerticAI’s](https://www.verticai.nl/) AI-powered transcription and summarization capabilities.


## 🚀 Tech Stack

- **Next.js**
- **React**
- **TypeScript**
- **MySQL**

## 🔧 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/annaferri02/TeresAI
cd TeresAI
```
### 2. Install dependencies
By running: 
```bash
npm install
```

### 3. Set up environment variables
Create a `.env.local` file in the root folder (same folder as `package.json` and `package-lock.json`), or ask for the file download, it should look something like this:

```
# Database credentials
DB_HOST=host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name

# Auth config
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=key
```

### 4. Run the devleopment server
By running:
```bash
npm run dev
```
Then open http://localhost:3000 in your browser.

## 🔐 Authentication

To use the platform, you must be logged in. Account registration is not currently supported through the UI.

However, you can use the following test credentials to log in and explore the platform:

- **Email:** `nurse@example.com`  
- **Password:** `nurse123`

Access to protected pages like `/platform` and `/profile` requires authentication. Once logged in, you'll be able to view assigned patients, manage visits, and more.

Other accounts that do not currently have any functionality are:
- **Email: `doctor@example.com` Password: `doctor123`**
- **Email: `psychologist@example.com` Password: `psych123`**
- **Email: `admin@example.com` Password: `admin123`**

## 👥 Contributors
- **[Anna Ferri](https://github.com/annaferri02)**
- **Jacob Wohsmann**
- **Nina Fang**
- **[Robert Verbeeten](https://github.com/RobVer)**

## 📄 License
**MIT** — *feel free to use, fork, and build upon this project.*