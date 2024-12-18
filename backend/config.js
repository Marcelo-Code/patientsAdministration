export const FRONTEND_URL = process.env.VITE_FRONTEND_URL || "http://localhost:5173";
export const PORT = process.env.VITE_PORT || 3000
export const BACKEND_URL = process.env.VITE_BACKEND_URL || "http://localhost:3000"

// Supabase
export const DB_HOST = process.env.VITE_DB_HOST || "aws-0-sa-east-1.pooler.supabase.com"
export const DB_PORT = process.env.VITE_DB_PORT || "6543"
export const DB_DATABASE = process.env.VITE_DB_DATABASE || "postgres"
export const DB_USER = process.env.VITE_DB_USER || "postgres.aidomabsbykwegmcqukz"
export const DB_PASSWORD = process.env.VITE_DB_PASSWORD || "lKSTsGMVxtFiPgMY"