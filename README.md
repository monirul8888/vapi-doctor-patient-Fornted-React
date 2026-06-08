# Dubai Hospital — React + Tailwind AI Appointments

A white-based, colorful Vite + React + Tailwind CSS frontend for the Dubai Hospital appointment workflow.

It preserves the original Streamlit app workflow:

- Schedule appointment
- Cancel appointment
- List appointments by date
- Search appointments by ID, patient name, or date
- Configure backend/database/Vapi values
- Test backend `/health`
- Embed the Vapi voice widget for Adam, the AI receptionist

## Requirements

- Node.js 18+
- npm 9+
- Your existing FastAPI backend running locally or remotely

## Install

```bash
npm install
```

## Configure environment

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Then edit `.env`:

```env
VITE_BACKEND_URL=http://127.0.0.1:4444
VITE_DATABASE_URL=postgresql://user:pass@host/db
VITE_VAPI_PUBLIC_KEY=your_public_key
VITE_VAPI_PRIVATE_KEY=your_private_key
VITE_VAPI_ASSISTANT_ID=your_assistant_id
```

You can also edit these values from the left sidebar. Sidebar values are saved to browser localStorage.

## Run development server

```bash
npm run dev
```

Open the URL Vite prints in your terminal, usually:

```txt
http://localhost:5173
```

## Build for production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Expected backend endpoints

The app expects the same endpoints as the Streamlit app:

```txt
GET  /health
POST /schedule_appointment/
POST /cancel_appointment/
POST /list_appointments/
POST /search_appointments/
GET  /appointments/{id}
```

Example appointment object:

```json
{
  "id": 1,
  "patient_name": "Ahmed Al-Rashid",
  "reason": "Cardiology · Checkup",
  "start_time": "2026-06-08T09:00:00",
  "canceled": false
}
```

## Notes

If your backend runs on another domain or port, enable CORS on the FastAPI backend for your Vite frontend origin.
