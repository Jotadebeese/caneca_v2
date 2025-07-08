# Caneca V2 - Backend

This is the backend for Caneca V2, a rubbish classification system. It's built with Payload CMS to provide an API and admin panel for managing image data.

The API will be used by the V1 frontend to allow users to upload images, which will be used to train a new machine learning model.

- **V1 Frontend Demo:** [https://caneca-self.vercel.app/](https://caneca-self.vercel.app/)
- **V1 Frontend Repo:** [https://github.com/Jotadebeese/caneca](https://github.com/Jotadebeese/caneca)

---

## Project Status

- **Phase 1 (Done):** Backend foundation is built and deployed. It uses PostgreSQL on Neon and file storage on Cloudflare R2.
- **Phase 2 (In Progress):** Integrating the API with the V1 frontend for data collection.
- **Phase 3 (Future):** Develop a new V2 frontend and train an improved model with the collected data. A mobile app is also a possibility.

---

## Tech Stack

- **Framework:** Next.js
- **CMS:** Payload CMS 3.0
- **Database:** PostgreSQL (hosted on Neon)
- **File Storage:** Cloudflare R2

---

## Local Development

### Prerequisites

- Node.js (v20.18.1 or higher)
- A local PostgreSQL database

### Installation

1.  **Clone the repo:**
    ```sh
    git clone [https://github.com/Jotadebeese/caneca_v2.git](https://github.com/Jotadebeese/caneca_v2.git)
    cd caneca_v2
    ```
2.  **Install dependencies:**
    ```sh
    npm install
    ```
3.  **Set up environment variables:**
    - Copy `.env.example` to a new file named `.env`.
    - Fill in the required values, especially `LOCAL_DATABASE_URI` and `PAYLOAD_SECRET`.
    ```sh
    cp .env.example .env
    ```
4.  **Run the dev server:**
    ```sh
    npm run dev
    ```

The admin panel will be at [http://localhost:3000/admin](http://localhost:3000/admin).

---

## Contributing

Contributions are welcome. Open an issue or submit a pull request.
