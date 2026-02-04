# Task 2 – Revised Architecture & Initial Refactoring

## 📌 Project Information

- **Project:** MMJAuto  
- **Course:** Scalable and Fault-Tolerant Systems  
- **Contributors:** Jamal Mohsen and Mohamad Nour Morad  

---

# 1. Selected Issue to Address

## **Issue: Backend Scalability and Concurrency Handling**

### What is the issue?

The current MMJAuto backend is implemented as a **single Express server instance** that handles all incoming requests. This means that:

- All users rely on one backend process.
- There is no load balancing or horizontal scaling.
- If the backend crashes, the entire system becomes unavailable.

### Why is this a problem in the current system?

This is both a **scalability and fault-tolerance issue** because:

- Under high user load, the single backend can become overloaded.
- Long-running operations (such as database queries or email notifications) can delay other users.
- A single failure in the backend will bring down the whole system.
- The system cannot scale horizontally (by adding more servers).

### When would this become noticeable?

This issue would become visible when:

- Many users access the system simultaneously.
- Admins upload images or update many car parts at once.
- MongoDB experiences delays or temporary outages.
- An unhandled error crashes the Express server.

---

# 2. Proposed Solution and Trade-offs

## 2.1 Revised Architecture (Conceptual)

The proposed solution introduces **horizontal scaling for the backend using multiple instances behind a load balancer.**

---

## 2.2 What changes compared to the current architecture?

### **Current architecture:**
- One single Express backend server.
- Direct communication between React frontend and backend.
- Centralized MongoDB Atlas database.
- No load balancing.
- Single point of failure.

### **New proposed architecture:**
- Multiple backend instances running in parallel.
- A load balancer distributes incoming requests.
- Shared MongoDB Atlas database remains the same.
- Email service is still used for notifications.


  ## 2.3 How these changes improve scalability and fault tolerance

### Scalability improvements:
- More users can be handled simultaneously.
- System can scale by adding more backend instances.
- Reduces response time under high load.

### Fault tolerance improvements:
- No single backend failure will crash the entire system.
- Traffic continues even if one instance stops working.
- Better resilience against unexpected crashes.

---

## 2.4 Trade-offs and limitations

This solution introduces some trade-offs:

### Increased system complexity:
- The system becomes harder to manage and deploy.

### Session consistency issues:
- If user sessions are stored in memory, they must later be moved to a shared store like Redis (not required in this task).

### Infrastructure overhead:
- Future tasks may require Docker, cloud hosting, or Kubernetes.

---

# 3. Refactoring Plan

## What will be modified

We will modify:
- The backend (Express server) to:
  - Add structured request logging.
  - Add basic error logging.
  - Prepare it conceptually for multiple instances.

## What will NOT be changed at this stage

We will NOT modify:
- The React frontend.
- MongoDB database structure.
- Authentication logic.
- Email notification service.

## First concrete refactoring step

We will:
- Add basic logging to the backend:
  - Log every incoming request.
  - Log errors properly.


# 4. Begin refactoring

As an initial refactoring step related to our plan, we focus on improving the backend in a small and controlled way rather than making large architectural changes.

### Selected initial refactoring steps:
- Improving error handling by making logs more structured and informative.
- Preparing the backend code structure conceptually for future horizontal scaling.
- Keeping business logic mostly unchanged at this stage to avoid introducing new bugs.

At this stage, we are **not expected to complete the full refactoring or implement the new architecture in practice.** The goal is only to take a small first step in the right direction.

---

# 5. Add basic logging

As part of the initial refactoring, we add basic console-based logging to the backend service.

### Logging requirements implemented:
- Log when a request is received by the server.
- Log errors or exceptional situations with relevant context.

This is implemented by:
- Adding a middleware in `backend/server.js` to log all incoming requests.
- Improving the error handler in `backend/middlewares/errorMiddleware.js` to log errors more clearly.

Simple console-based logging is considered sufficient for this task.


