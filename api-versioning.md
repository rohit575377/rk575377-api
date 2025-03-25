API versioning Express.js में तब इस्तेमाल होती है जब आपको अपनी API को अपडेट करना होता है लेकिन पुराने users के लिए compatibility बनाए रखनी होती है। इसे step by step समझते हैं।

---

### 🟢 API Versioning क्या है?
जब आप API बनाते हैं, तो समय के साथ उसमें नए features add करने पड़ते हैं। लेकिन पुराने users की existing API को बिना तोड़े upgrade करना जरूरी होता है।  
API versioning का मतलब है कि आप अपनी API को अलग-अलग versions में manage करें, जैसे:
- `v1` (पहला version)
- `v2` (updated version)
- `v3` (latest version)

---

### 🟢 Express में API Versioning कैसे करें?
Express में API versioning करने के कई तरीके हैं:
1️⃣ **URL versioning** (सबसे आसान तरीका)  
2️⃣ **Header versioning**  
3️⃣ **Query parameter versioning**  

अब इन तीनों को एक-एक करके समझते हैं।

---

## ✅ 1️⃣ URL Versioning (Recommended & Easy)
इसमें हम API के URL में version number डालते हैं, जैसे:
```
GET /api/v1/users
GET /api/v2/users
```

📌 **Example Code:**
```javascript
const express = require("express");
const app = express();

// Version 1 API
app.get("/api/v1/users", (req, res) => {
  res.json({ message: "This is v1 API", users: ["Alice", "Bob"] });
});

// Version 2 API
app.get("/api/v2/users", (req, res) => {
  res.json({ message: "This is v2 API", users: ["Charlie", "David"], newFeature: "More data available" });
});

app.listen(3000, () => console.log("Server is running on port 3000"));
```
🔹 जब कोई `/api/v1/users` को call करेगा, तो पुराना data मिलेगा।  
🔹 जब कोई `/api/v2/users` को call करेगा, तो updated data मिलेगा।

---

## ✅ 2️⃣ Header Versioning
इसमें client request header में version number भेजता है।  

📌 **Example Code:**
```javascript
app.get("/api/users", (req, res) => {
  const version = req.headers["api-version"]; // Header से version पढ़ रहे हैं

  if (version === "1") {
    res.json({ message: "This is v1 API", users: ["Alice", "Bob"] });
  } else if (version === "2") {
    res.json({ message: "This is v2 API", users: ["Charlie", "David"], newFeature: "More data available" });
  } else {
    res.status(400).json({ error: "Invalid API version" });
  }
});
```
🔹 Client को request भेजते समय header में `api-version` पास करना होगा।  

Example Request:
```http
GET /api/users
Headers: { "api-version": "1" }
```

---

## ✅ 3️⃣ Query Parameter Versioning
इसमें हम API call के साथ `?version=1` जैसा query parameter पास करते हैं।

📌 **Example Code:**
```javascript
app.get("/api/users", (req, res) => {
  const version = req.query.version; // Query से version पढ़ रहे हैं

  if (version === "1") {
    res.json({ message: "This is v1 API", users: ["Alice", "Bob"] });
  } else if (version === "2") {
    res.json({ message: "This is v2 API", users: ["Charlie", "David"], newFeature: "More data available" });
  } else {
    res.status(400).json({ error: "Invalid API version" });
  }
});
```
🔹 अब client को request कुछ ऐसे भेजनी होगी:
```
GET /api/users?version=1
GET /api/users?version=2
```

---

## 🔥 कौन सा तरीका सबसे अच्छा है?
- ✅ **URL Versioning**: जब आप public API बना रहे हैं, तब यह सबसे अच्छा तरीका है।  
- ✅ **Header Versioning**: जब आप private APIs बना रहे हैं और flexibility चाहिए।  
- ✅ **Query Parameter Versioning**: जब आपको temporary API switching करनी हो।

---

### 🎯 Bonus: Express Router के साथ Versioning
अगर आपकी API बड़ी है, तो हर बार अलग-अलग API बनाने की जगह **Express Router** का इस्तेमाल करें।

📌 **Example Code:**
```javascript
const express = require("express");
const app = express();

// Routers for different versions
const v1Router = express.Router();
const v2Router = express.Router();

v1Router.get("/users", (req, res) => {
  res.json({ message: "This is v1 API", users: ["Alice", "Bob"] });
});

v2Router.get("/users", (req, res) => {
  res.json({ message: "This is v2 API", users: ["Charlie", "David"], newFeature: "More data available" });
});

// Use versioned routers
app.use("/api/v1", v1Router);
app.use("/api/v2", v2Router);

app.listen(3000, () => console.log("Server running on port 3000"));
```
🔹 इस तरीके से आपका code clean रहेगा और अलग-अलग versions को manage करना आसान होगा।

---

## 🚀 Final Summary
| Method | Pros ✅ | Cons ❌ |
|--------|--------|--------|
| **URL Versioning** | Simple, SEO-friendly, clear separation | URLs change, needs more routes |
| **Header Versioning** | Clean URL, flexible | Requires custom headers |
| **Query Parameter Versioning** | Easy to switch versions | Not a standard practice |

---

अब आप Express में API versioning आसानी से implement कर सकते हैं!  
अगर कोई doubt है तो पूछो 😊🚀