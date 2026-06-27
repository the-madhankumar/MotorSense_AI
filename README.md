# ⚙️ MotorMind AI

> **Real-Time Industrial Motor Fault Diagnosis System using ONNX Runtime + RAG-Augmented Intelligence**

A production-grade AI system for **real-time detection, diagnosis, and explanation of industrial motor faults** using a hybrid pipeline combining:

* ⚡ ONNX Runtime Inference (low-latency edge ML)
* 🧠 Retrieval-Augmented Generation (RAG) for explainable diagnostics
* 📡 Streaming sensor simulation / IoT-ready pipeline
* 🧩 Scalable modular architecture (frontend + inference + knowledge layer)

---

## 📌 Problem Statement

Industrial motors generate high-dimensional sensor signals (voltage, current, THD, vibration, power factor). Traditional monitoring systems:

* Fail to provide **real-time intelligence**
* Lack **explainability**
* Depend on **manual inspection or threshold alerts**

MotorMind AI solves this by combining:

> **Fast ML inference + contextual AI reasoning**

---

## 🚀 Key Features

### ⚡ 1. Real-Time Fault Prediction (ONNX Runtime)

* Optimized ONNX model for edge-level inference
* Sub-millisecond prediction pipeline
* Supports multi-class fault classification:

  * Normal
  * Bearing Fault
  * Rotor Imbalance
  * Electrical Noise
  * Overload Conditions

---

### 🧠 2. RAG-Based Diagnostic Engine

* Vector database-backed retrieval system
* Retrieves domain knowledge:

  * Motor fault manuals
  * Maintenance logs
  * Failure case studies
* LLM generates **human-readable diagnosis**

> Instead of just saying "Fault detected", it explains *why it happened and how to fix it*

---

### 📡 3. Sensor Data Pipeline

* Real-time structured input:

```json
{
  "voltage": 220,
  "current": 6,
  "powerFactor": 0.95,
  "thd": 15,
  "vibration": 2
}
```

* Streaming-ready architecture for IoT integration (MQTT / WebSockets compatible)

---

### 🧩 4. Hybrid AI Architecture

System combines:

* ONNX → fast deterministic inference
* RAG → contextual reasoning layer
* Rule-based safety layer → fallback validation

---

## 🏗️ System Architecture

```
Sensor Layer
   ↓
Preprocessing Layer (Normalization / Scaling)
   ↓
ONNX Runtime Model (Fault Prediction)
   ↓
Prediction Output
   ↓
RAG Retrieval System (Vector DB)
   ↓
LLM Explanation Engine
   ↓
Dashboard UI (React / Next.js)
```

---

## 🧠 Machine Learning Pipeline

### Model Workflow

1. Data normalization (MinMax / StandardScaler)
2. Feature vectorization:

   ```
   [Voltage, Current, PowerFactor, THD, Vibration]
   ```
3. ONNX inference execution
4. Post-processing:

   * Softmax / threshold mapping
   * Label decoding

---

### Model Export

Trained model converted to ONNX:

```bash
python export.py --format onnx
```

Optimized for:

* CPU inference
* Edge deployment
* WASM compatibility (browser runtime)

---

## 🔎 RAG (Retrieval-Augmented Generation)

### Knowledge Base Includes:

* IEEE motor fault standards
* Industrial maintenance logs
* Failure mode case studies
* Engineering manuals

### Pipeline:

```
User Input + Prediction
        ↓
Vector Embedding Search
        ↓
Top-K Relevant Documents
        ↓
LLM Contextual Reasoning
        ↓
Final Diagnosis Report
```

### Output Example:

> “The system detected abnormal vibration combined with elevated THD. This pattern is consistent with early-stage rotor imbalance often caused by uneven mass distribution or shaft misalignment.”

---

## 🖥️ Tech Stack

### Frontend

* Next.js (React 18)
* TypeScript
* TailwindCSS
* WebSockets (real-time streaming UI)

### ML Runtime

* ONNX Runtime Web / Node
* TensorFlow (training stage only)

### AI Layer

* RAG pipeline (vector DB: FAISS / Pinecone / Chroma)
* LLM (Groq / OpenAI-compatible API)

### Backend

* Node.js / Python microservices
* REST + streaming APIs

---

## 📊 Input / Output Format

### Input

```ts
type MotorInput = {
  voltage: number;
  current: number;
  powerFactor: number;
  thd: number;
  vibration: number;
};
```

### Output

```json
{
  "fault": "Rotor Imbalance",
  "confidence": 0.92,
  "severity": "Medium",
  "recommendation": "Inspect shaft alignment and balance rotor assembly."
}
```

---

## ⚙️ Performance Characteristics

* ⏱ Inference latency: < 50ms (ONNX optimized)
* 📦 Model size: lightweight edge-optimized graph
* 🔄 Supports continuous streaming input
* 🧠 RAG retrieval: < 200ms average query time

---

## 🧪 Example Use Case

1. Motor starts vibrating abnormally
2. Sensor stream detects:

   * THD spike
   * Current fluctuation
3. ONNX model predicts:

   * Rotor imbalance (0.92 confidence)
4. RAG system retrieves:

   * Similar historical failures
5. System outputs:

   * Diagnosis + explanation + maintenance steps

---

## 🧱 Project Structure

```
MotorMind-AI/
│
├── frontend/              # Next.js dashboard
├── inference/            # ONNX runtime engine
├── rag/                  # Vector DB + retrieval system
├── ml/                  # training + export scripts
├── models/              # ONNX model files
└── docs/                # research + thesis materials
```

---

## 🔐 Design Philosophy

* **Edge-first inference** (ONNX instead of heavy cloud ML)
* **Explainability over black-box predictions**
* **Hybrid intelligence (ML + RAG + rules)**
* **Modular microservice architecture**

---

## 📈 Future Enhancements

* Predictive maintenance scheduling
* Multi-motor fleet monitoring dashboard
* Digital twin simulation layer
* Federated learning across factories
* Hardware deployment on Raspberry Pi / PLC systems

---

## 👨‍💻 Author

**Madhan Kumar M**
Focus: AI Systems, Industrial ML, Distributed Intelligence

---

## 📜 License

For academic and research use only.

