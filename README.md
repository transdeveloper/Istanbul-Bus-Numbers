# Bus Lines Dataset

This repository contains parsed and cleaned bus line data from the Istanbul Municipality's web services, exported in multiple formats for convenience and compatibility.

---

## Files

### 1. `Array.json`
- **Format**: JSON  
- **Contents**: Simple array of line codes  
  Example:
  ```json
  ["10A", "10B", "11Ü"]
  ```
- **Use Case**: Lightweight use when only line IDs are needed.

---

### 2. `Array.xml`
- **Format**: XML  
- **Contents**: XML version of the array above.  
  Example:
  ```xml
  <lines>
    <line>10A</line>
    <line>10B</line>
    <line>11Ü</line>
  </lines>
  ```
- **Use Case**: Interoperability with XML-based tools.

---

### 3. `Data.csv`
- **Format**: CSV  
- **Contents**: Line codes and human-readable names.  
  Example:
  ```csv
  code,name
  "10A","ESATPAŞA - YEDİTEPE ÜNİVERSİTESİ / FERHATPAŞA"
  "10B","BOSTANCI - KADIKÖY"
  ```
- **Use Case**: Easy import into Excel, spreadsheets, or data analysis tools.

---

### 4. `Data.json`
- **Format**: JSON  
- **Contents**: Array of objects with `code` and `name` keys.  
  Example:
  ```json
  [
    { "code": "10A", "name": "ESATPAŞA - YEDİTEPE ÜNİVERSİTESİ / FERHATPAŞA" },
    { "code": "10B", "name": "BOSTANCI - KADIKÖY" }
  ]
  ```
- **Use Case**: When both ID and name are needed in a structured format.

---

### 5. `Data.xml`
- **Format**: XML  
- **Contents**: XML with `code` and `name` fields.  
  Example:
  ```xml
  <lines>
    <line>
      <code>10A</code>
      <name>ESATPAŞA - YEDİTEPE ÜNİVERSİTESİ / FERHATPAŞA</name>
    </line>
    <line>
      <code>10B</code>
      <name>BOSTANCI - KADIKÖY</name>
    </line>
  </lines>
  ```
- **Use Case**: XML-based systems needing both the code and description.

---

## Notes

- All files are UTF-8 encoded.  
- Turkish special characters are preserved using proper decoding.
---
