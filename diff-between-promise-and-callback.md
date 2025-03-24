### **MySQL2 में Promise और Callback का अंतर और उपयोग**  

`mysql2` लाइब्रेरी में आपको दो तरीके मिलते हैं डेटा को हैंडल करने के लिए:  
1. **Callback-based API**  
2. **Promise-based API**  

---

## **1️⃣ Callback-based API**  
यह पारंपरिक तरीका है जिसमें जब SQL क्वेरी execute होती है, तब एक callback function दिया जाता है जो error या result को हैंडल करता है।  

### **Example (Callback-based API)**
```js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'test_db'
});

connection.query('SELECT * FROM users', (err, results) => {
  if (err) {
    console.error('Error executing query:', err);
    return;
  }
  console.log('Users:', results);
});

connection.end();
```
### **Callback API के फायदे**  
✅ **Simple और पुरानी Codebase के साथ Compatible**  
✅ **Memory-efficient (No extra Promise overhead)**  

### **Callback API की दिक्कतें**  
❌ **Callback Hell** (अगर Nested Queries हों तो कोड messy हो जाता है)  
❌ **Error Handling मुश्किल हो सकती है**  

---

## **2️⃣ Promise-based API (Async/Await Support के लिए)**  
`mysql2/promise` module `query()` को Promise return करने के लिए enable करता है, जिससे `async/await` का उपयोग किया जा सकता है।

### **Example (Promise-based API with async/await)**
```js
const mysql = require('mysql2/promise');

async function fetchUsers() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'test_db'
  });

  try {
    const [rows] = await connection.execute('SELECT * FROM users');
    console.log('Users:', rows);
  } catch (err) {
    console.error('Error executing query:', err);
  } finally {
    await connection.end();
  }
}

fetchUsers();
```
### **Promise API के फायदे**  
✅ **Readable और Maintainable Code**  
✅ **Error Handling आसान (`try-catch` block)**  
✅ **Better Flow Control (`async/await`)**  

### **Promise API की दिक्कतें**  
❌ **थोड़ा ज्यादा Memory Overhead होता है (Promises के कारण)**  
❌ **Older Codebases में Compatibility Issue हो सकता है**  

---

## **🎯 कब कौनसा उपयोग करें?**
| स्थिति | Callback API | Promise API |
|--------|------------|------------|
| **Simple Queries** | ✅ | ✅ |
| **Complex Queries (Nested Calls)** | ❌ | ✅ |
| **Older Codebases (Traditional JS)** | ✅ | ❌ |
| **Modern JavaScript (ES6+ with async/await)** | ❌ | ✅ |
| **Better Error Handling** | ❌ | ✅ |
| **Performance Critical (Lower Memory Overhead)** | ✅ | ❌ |

---

## **📌 Final Verdict**
- अगर आपको **Modern JavaScript (ES6+)** के साथ काम करना है, तो **Promise-based API (async/await)** बेहतर है।  
- अगर आप **Older या Lightweight Codebase** पर काम कर रहे हैं, तो **Callback-based API** ठीक है।  
- बड़े और जटिल SQL Transactions के लिए **Promise API** ज्यादा Maintainable होती है।

**👉 Best Practice:** अगर नया प्रोजेक्ट है तो हमेशा `mysql2/promise` का उपयोग करें! 🚀